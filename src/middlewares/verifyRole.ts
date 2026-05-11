import type { NextFunction, Request, Response } from "express"
import { apiError } from "../utils/ApiError"

// Handling Role-Based Access Control
const authorize = (...roles: []) => {
    return (req: any, res: Response, next: NextFunction) => {
        try {
            const role = req.user.role

            const isAllowed = roles.find(val => role === val)
            if (!isAllowed) {
                return res.status(403).json(new apiError(403, "Forbidden Access", "You are not allowed to access this route"))
            }

            return next()
        } catch (error) {
            return res.status(500).json(new apiError(500, "Unknown Error", "Something went wrong"))
        }
    }
}