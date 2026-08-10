CREATE TABLE "tb_user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"created_at" date DEFAULT now(),
	"updated_at" date DEFAULT now()
);
