ALTER TABLE "admin" ADD COLUMN "refreshTokens" jsonb DEFAULT '[]'::jsonb;--> statement-breakpoint
ALTER TABLE "participant" ADD COLUMN "refreshTokens" jsonb DEFAULT '[]'::jsonb;