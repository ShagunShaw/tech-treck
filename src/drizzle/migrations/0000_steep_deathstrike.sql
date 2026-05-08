CREATE TYPE "public"."role" AS ENUM('admin', 'superAdmin');--> statement-breakpoint
CREATE TYPE "public"."year" AS ENUM('1st', '2nd', '3rd', '4th', '5th');--> statement-breakpoint
CREATE TABLE "admin" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"email" varchar(70) NOT NULL,
	"googleId" varchar(21) NOT NULL,
	"phone" varchar(10),
	"role" "role" NOT NULL,
	"isApproved" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "admin_email_unique" UNIQUE("email"),
	CONSTRAINT "admin_googleId_unique" UNIQUE("googleId")
);
--> statement-breakpoint
CREATE TABLE "participant" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"email" varchar(70) NOT NULL,
	"googleId" varchar(21) NOT NULL,
	"phone" varchar(10),
	"college" varchar(100),
	"department" varchar(50),
	"year" "year",
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "participant_email_unique" UNIQUE("email"),
	CONSTRAINT "participant_googleId_unique" UNIQUE("googleId")
);
