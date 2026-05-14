CREATE TYPE "public"."status" AS ENUM('pending', 'approved', 'rejected');--> statement-breakpoint
ALTER TABLE "admin" RENAME COLUMN "isApproved" TO "status";--> statement-breakpoint
ALTER TABLE "admin" ADD COLUMN "description" varchar(300) NOT NULL;