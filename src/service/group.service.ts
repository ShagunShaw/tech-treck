when the TTL for a creating a group has expired and all members are not added to it, then how will all the members(who has been added in the group till now) and the group lead will be notified about it in frontend and will be asked to create another group

import * as z from 'zod'
import type { genreSchema } from '../validations/tokenUser.type'
import client from '../redis.config'
import { apiError } from '../utils/ApiError'
import { db } from "../drizzle/db"
import { Group, GroupMember } from '../drizzle/schema'
import { inArray, eq, and } from 'drizzle-orm'

type GenreType = z.infer<typeof genreSchema>;

export const registerGenre = async (genre: GenreType, userId: number) => {
    try {
        const existing = await client.get(`genre:${userId}`)
        if (existing) throw new apiError(400, "Already Registered", "You have already registered your genre")

        await client.set(`genre:${userId}`, genre)
    } catch (error: any) {
        throw new apiError(500, error.name, error.message)
    }
}

export const abortGroup = async (userId: number, groupId: number) => {
    try {
        const result = await db.update(Group)
            .set({ status: 'aborted' })
            .where(
                inArray(Group.id, (         // subqueries k liye we use 'inArray' instead of 'eq'
                    db.select({ groupId: GroupMember.groupId })
                        .from(GroupMember)
                        .where(
                            and(
                                eq(GroupMember.participantId, userId),
                                eq(GroupMember.groupId, groupId)
                            )
                        )
                )
                )
            )
            .returning({ id: Group.id })

        if (result.length == 0) return {success: false}
        else    return {success: true}

    } catch (error: any) {
        throw new apiError(500, error.name, error.message)
    }
}