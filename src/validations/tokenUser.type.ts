import * as z from "zod";

export const tokenUser = z.object({
    id: z.number(),
    email: z.email(),
    role: z.enum(["participant", "admin", "super-admin"])
})