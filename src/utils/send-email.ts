// src/utils/send-email.ts
import { DemoEmailTemplate } from '#/components/email/demo-template.tsx'
import { resend } from '#/lib/resend.ts'
import { createServerFn } from '@tanstack/react-start'
import { randomUUID } from 'node:crypto'
import z from 'zod'

const sendEmailSchema = z.object({
  name: z.string(),
  to: z.email(),
  subject: z.string(),
  message: z.string(),
  preventThreading: z.boolean().optional(),
})

export const sendEmail = createServerFn({ method: 'POST' })
  .validator(sendEmailSchema)
  .handler(
    async ({ data: { name, to, subject, message, preventThreading } }) => {
      if (!resend) {
        console.warn('[sendEmail] Bỏ qua: thiếu RESEND_API_KEY trong .env')
        return null
      }

      const emailOptions: Parameters<typeof resend.emails.send>[0] = {
        from: process.env.EMAIL_FROM || 'Vĩnh Lợi <onboarding@resend.dev>',
        to: [to],
        subject,
        react: DemoEmailTemplate({ name, message }),
      }

      if (preventThreading) {
        emailOptions.headers = { 'X-Entity-Ref-ID': randomUUID() }
      }

      const { data, error } = await resend.emails.send(emailOptions)
      if (error) {
        throw new Error(error.message) // ném lỗi thật, để nơi gọi tự catch
      }
      return data
    },
  )
