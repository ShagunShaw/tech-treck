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

        return admins;
    } catch (error: any) {
        if (error instanceof apiError) {
            throw error;
        }

        throw new apiError(
            500,
            error.name || "InternalServerError",
            error.message || "An unexpected error occurred"
        );
    }
}

export const manageApprovalService = async (adminId: number, status: 'approved' | 'rejected') => {
    try {
        const data= await db.update(Admin)
            .set({ status: ((status === 'approved')?'approved':'rejected') })
            .where(eq(Admin.id, adminId))
            .returning({ id: Admin.id })

        if(data.length === 0)   throw new apiError(404, "Entry not found", "No such entry with this admin id found")

        Send an email to the admin about their acception/rejection via Kafka's email service

        return data;        
    } catch (error: any) {
        if (error instanceof apiError) {
            throw error;
        }

        throw new apiError(
            500,
            error.name || "InternalServerError",
            error.message || "An unexpected error occurred"
        );
    }
}

export const deleteAdminService = async (adminId: number) => {
    try {
        const data= await db.delete(Admin)
                            .where(eq(Admin.id, adminId))
                            .returning({ id: Admin.id })

        if(data.length === 0)   throw new apiError(404, "Entry not found", "No such entry with this admin id found")

        Send an email to the admin about them being removed via Kafka's email service

        return data;
    } catch (error: any) {
        if (error instanceof apiError) {
            throw error;
        }

        throw new apiError(
            500,
            error.name || "InternalServerError",
            error.message || "An unexpected error occurred"
        );
    }
}