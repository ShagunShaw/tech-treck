import type { Request, Response } from "express";
import { apiError } from "../utils/ApiError";
import * as superAdminService from "../service/super-admin.service"
import { apiResponse } from "../utils/ApiResponse";
import { statusSchema } from "../validations/tokenUser.type"

export const getPendingAdmins = async (req: Request, res: Response) => {
    try {
        const data = await superAdminService.getAdmins("pending");

        return res.status(200).json(new apiResponse(200, data, "Pending Admins fetched successfully"))
    } catch (error: any) {
        const staus = error.status ?? 500
        return res.status(staus).json(
            new apiError(staus, error.errName ?? error.name, error.errMessage ?? error.message)
        )
    }
}

export const manageApproval = async (req: Request, res: Response) => {
    try {
        const { adminId } = req.params
        if (!adminId) return res.status(400).json(new apiError(400, "Admin Id missing", "Admin id is missing in params"))

        const { status }= req.body
        if(!status || !statusSchema.safeParse(status).success)   return res.status(400).json(new apiError(400, "Error with status field", "status field is either missing or is not in the required format"))

        const data = await superAdminService.manageApprovalService(parseInt(adminId as string), status)

        return res.status(200).json(new apiResponse(200, data, "Admin approved successfully"))
    } catch (error: any) {
        const staus = error.status ?? 500
        return res.status(staus).json(
            new apiError(staus, error.errName ?? error.name, error.errMessage ?? error.message)
        )
    }
}

export const getApprovedAdmins = async (req: Request, res: Response) => {
    try {
        const data = await superAdminService.getAdmins("approved");

        return res.status(200).json(new apiResponse(200, data, "Approved Admins fetched successfully"))
    } catch (error: any) {
        const staus = error.status ?? 500
        return res.status(staus).json(
            new apiError(staus, error.errName ?? error.name, error.errMessage ?? error.message)
        )
    }
}

export const deleteAdmin = async (req: Request, res: Response) => {
    const { adminId } = req.params

    aage kro
}