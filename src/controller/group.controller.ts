import type { Request, Response } from 'express'
import * as groupService from '../service/group.service'
import { apiError } from '../utils/ApiError'
import { apiResponse } from '../utils/ApiResponse'
import { genreSchema } from '../validations/tokenUser.type'

export const registerGenre = async (req: any, res: Response) => {
    const { genre } = req.body
    const user = req.user

    if (!genre) return res.status(400).json(new apiError(400, "Invalid Body Structure", "Genre is missing in request's body"))

    const parsed = genreSchema.safeParse(genre)
    if (!parsed.success) return res.status(400).json(new apiError(400, "Invalid Genre", "Genre must be sky, sun, earth or moon"))

    try {
        await groupService.registerGenre(parsed.data, user.id)

        return res.status(201).json(new apiResponse(201, {}, "Genre Registered"))
    } catch (error: any) {
        const status = error.status ?? 500
        return res.status(status).json(
            new apiError(status, error.errName ?? error.name, error.errMessage ?? error.message)
        )
    }
}

export const createGroup = (req: Request, res: Response) => {

}

export const abort = async (req: any, res: Response) => {
    const user = req.user
    const { groupId } = req.params

    try {
        const { success } = await groupService.abortGroup(user.id, groupId)    
        
        if(!success)    return res.status(403).json(new apiError(403, "Forbidden", "You are not allowed to abort this group as you are not a part of it"))

        return res.status(204).json(new apiResponse(204, {}, "Group aborted successfully"))
    } catch (error: any) {
        const status = error.status ?? 500
        return res.status(status).json(
            new apiError(status, error.errName ?? error.name, error.errMessage ?? error.message)
        )
    }
}