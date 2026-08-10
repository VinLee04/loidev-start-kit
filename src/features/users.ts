import { createServerFn } from "@tanstack/react-start";
import { db } from "@/db";

export const getUsers = createServerFn({ method: 'GET' }).handler(async () => {
  console.log('start fetching users');
  const users = await db.query.user.findMany();
  console.log('finished fetching users');
  return users;
})