import * as z from "zod";

export const tokenUser = z.object({
    id: z.number(),
    email: z.email(),
    role: z.enum(["participant", "admin", "super-admin"])
})

export const statusSchema = z.enum(['approved', 'rejected'])

export const genreSchema = z.enum(['Sky', 'Stars', 'Earth', 'Sun'])