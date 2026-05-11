import type { Request, Response, NextFunction } from "express"
import jwt, { type JwtPayload } from 'jsonwebtoken'
import { apiError } from "../utils/ApiError"
import { db } from "../drizzle/db"
import { eq } from "drizzle-orm"
import { Participant, Admin } from "../drizzle/schema"
import { tokenUser } from "../validations/tokenUser.type"
import * as z from 'zod'

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY

type JwtExpiry = `${number}d` | `${number}h` | `${number}m` | `${number}s`

if (!ACCESS_TOKEN_SECRET || !ACCESS_TOKEN_EXPIRY || !REFRESH_TOKEN_SECRET || !REFRESH_TOKEN_EXPIRY)
    throw new Error("One of the access token secret/expiry or refresh token secret/expiry is missing")


export const generateAccessToken = (id: number, email: string, role: 'participant' | 'admin' | 'super-admin') => {
    const payload = { id, email, role }
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRY as JwtExpiry,
        algorithm: 'HS256'
    })
}

export const generateRefreshToken = (id: number, role: 'participant' | 'admin' | 'super-admin', sessionId: string) => {
    const payload = { id, role, sessionId }
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRY as JwtExpiry,
        algorithm: 'HS256'
    })
}


export const verifyJWT = (req: any, res: Response, next: NextFunction) => {
    const token = req.cookies?.accessToken || req.headers['authorization']?.split(' ')[1]

    if (!token) {
        return res.status(401).json(new apiError(401, "Unauthorised Access", "You must be logged in to access this route"))
    }

    try {
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as z.infer<typeof tokenUser>
        req.user = decoded
        return next()
    } catch (err: any) {
        if (err.name === "TokenExpiredError") {
            return verifyRefreshToken(req, res, next) // ✅ IMPORTANT RETURN
        }
        return res.status(401).json(new apiError(401, "Unknown Error", err.message))
    }
}

export const verifyRefreshToken = async (req: any, res: Response, next: NextFunction) => {
    const token = req.cookies?.refreshToken

    if (!token) {
        return res.status(401).json(new apiError(401, "Token Not Found", "Refresh Token not found"))
    }

    try {
        const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET) as JwtPayload

        if (!decoded) {
            return res.status(500).json(new apiError(401, "Payload Found", "Payload not found from refresh token"))
        }

        let user: z.infer<typeof tokenUser>;
        if (decoded.role === 'participant') {
            const data = await db.query.Participant.findFirst({
                where: eq(Participant.id, decoded.id),
                columns: {
                    id: true,
                    email: true,
                    refreshTokens: true
                }
            });

            if (!data) return res.status(404).json(new apiError(404, "User not found", "User with this id not found"))

            const validSession = data.refreshTokens?.find(rt => rt.sessionId === decoded.sessionId)

            if (!validSession) res.status(401).json(new apiError(401, "Session Revoked", "Session revoked, please login again"))

            user = { id: data.id, email: data.email, role: 'participant' }
        } else {
            const data = await db.query.Admin.findFirst({
                where: eq(Admin.id, decoded.id),
                columns: {
                    id: true,
                    email: true,
                    role: true,
                    refreshTokens: true
                }
            });

            if (!data) return res.status(404).json(new apiError(404, "User not found", "User with this id not found"))

            const validSession = data.refreshTokens?.find(rt => rt.sessionId === decoded.sessionId)

            if (!validSession) throw new apiError(401, "Session Revoked", "Session revoked, please login again")

            user = { id: data.id, email: data.email, role: 'participant' }
        }

        const accessToken = generateAccessToken(user.id, user.email, user.role)
        req.user = user

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true
        })      // will overwrite the previous expired access token

        return next()
    } catch (err: any) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json(new apiError(401, "Token Expired", "Refresh Token expired, login again"))
        }
        return res.status(401).json(new apiError(401, "Unknown Error", err.message))
    }
}