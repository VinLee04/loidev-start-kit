import { pgTable, unique, integer, varchar, text } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const tbUser = pgTable("tb_user", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "tb_user_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: varchar(),
	createdAt: text("created_at").default(now()),
	updatedAt: text("updated_at").default(now()),
	email: varchar({ length: 255 }).notNull(),
}, (table) => [
	unique("tb_user_email_key").on(table.email),
]);
