ALTER TABLE "tb_user" ADD COLUMN "email" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "tb_user" ADD CONSTRAINT "tb_user_email_key" UNIQUE("email");