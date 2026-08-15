/**
 * @see https://resend.com;
 *
 * Singleton Resend client instance có thể là `null` nếu thiếu
 * RESEND_API_KEY trong .env.
 *
 * ⚠️ Khuyến khích dùng qua `sendEmail` server function (đã tự xử lý
 * trường hợp null) thay vì import trực tiếp `resend` ở nơi khác.
 *
 * Nếu vẫn cần dùng trực tiếp, luôn check null trước:
 * ```ts
 * import { resend } from '~/lib/resend';
 *
 * if (resend) {
 *   const { data, error } = await resend.emails.send({ ... });
 * }
 * ```
 */

import { Resend } from 'resend'

export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null
