import { pgTable, serial, varchar, boolean, numeric, pgEnum, timestamp, jsonb } from "drizzle-orm/pg-core"

export const roleEnum= pgEnum('role', ['admin', 'superAdmin'])
export const yearEnum= pgEnum('year', ['1st', '2nd', '3rd', '4th', '5th'])
export const statusEnum= pgEnum('status', ['pending', 'approved', 'rejected'])


export const Participant = pgTable('participant', {
    id: serial().primaryKey(),      // auto_increment by default
    name: varchar({length: 50}).notNull(),
    email: varchar({length: 70}).unique().notNull(),
    googleId: varchar({length: 21}).unique().notNull(),
    phone: varchar({length: 10}),
    college: varchar({length: 100}),
    department: varchar({length: 50}),
    year: yearEnum(),
    refreshTokens: jsonb().$type<{sessionId: string, token: string}[]>().default([]),
    created_at: timestamp().defaultNow()
})

export const Admin = pgTable('admin', {
    id: serial().primaryKey(),      // check if you can start the value from 1000 or not
    name: varchar({length: 50}).notNull(),
    email: varchar({length: 70}).unique().notNull(),
    googleId: varchar({length: 21}).unique().notNull(),
    phone: varchar({length: 10}),
    role: roleEnum().notNull(),
    description: varchar({length: 300}).notNull(),
    status: statusEnum().default('pending'),
    refreshTokens: jsonb().$type<{sessionId: string, token: string}[]>().default([]),
    created_at: timestamp().defaultNow()
})

// export const Group = pgTable('group', {
    
// })

// export const GroupMember = pgTable('group_member', {

// })



// Generate — creates the SQL migration files from your schema changes. Just files, nothing applied to DB yet.
// Migrate — takes those generated files and actually runs them on your database. This is when your DB actually changes.

// now to migrate this thing we have to run: 'npx drizzle-kit generate:pg' , but for simplicity we wrote this command in our package.json in the scripts