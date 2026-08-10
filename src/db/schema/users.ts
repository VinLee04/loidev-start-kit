// import { date, pgTable, serial, unique, varchar } from "drizzle-orm/pg-core";

// export const users = pgTable('tb_user', {
//   id: serial().primaryKey(),
// 	name: varchar({ length: 255 }).notNull(),
// 	createdAt: date("created_at").defaultNow(),
// 	updatedAt: date("updated_at").defaultNow(),
// 	email: varchar({ length: 255 }).notNull(),
// }, (table) => [
// 	unique("tb_user_email_key").on(table.email),
// ]);
