import { drizzle } from 'drizzle-orm/node-postgres'

import * as auth from './schema/auth'
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
})
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Lỗi kết nối thực tế:', err);
  } else {
    console.log('Kết nối thành công tới DB vào lúc:', res.rows[0]);
  }
  pool.end();
});
export const db = drizzle(pool, {
  schema: { ...auth },
  logger: true, // Enable logging for debugging,
  casing: 'snake_case' // Use snake_case for database columns
})
