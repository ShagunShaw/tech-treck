import { eq } from "drizzle-orm"
import { db } from "../drizzle/db"
import { Admin } from "../drizzle/schema"
import { apiError } from "../utils/ApiError"

export const getAdmins = async (status: 'approved' | 'pending') => {
    try {
        const admins = await db.query.Admin.findMany({
            where: eq(Admin.status, ((status === 'pending')?'pending':'approved')),
            columns: {
                id: true,
                name: true,
                email: true,
                phone: true,
                description: true
            }
        })

        return admins ?? [];
    } catch (error: any) {
        throw new apiError(500, error.name, error.message)
    }
}

export const manageApprovalService = async (adminId: number, status: 'approved' | 'rejected') => {
    try {
        if(!adminId)  throw new apiError(500, "Admin Id missing", "Admin id not found in service parameter")

        const data= await db.update(Admin)
            .set({ status: ((status === 'approved')?'approved':'rejected') })
            .where(eq(Admin.id, adminId));

        Send an email to the admin about their acception/rejection via Kafka's email service

        return data;        
    } catch (error: any) {
        throw new apiError(500, error.name, error.message)
    }
}

export const deleteAdminService = async (adminId: number) => {
    isko kor
}