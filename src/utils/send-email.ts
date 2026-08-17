// src/utils/send-email.ts
import { emailTemplates } from '#/lib/email-templates.tsx'
import { resend } from '#/lib/resend.ts'
import { createServerFn } from '@tanstack/react-start'
import { randomUUID } from 'node:crypto'
import z from 'zod'

const sendEmailSchema = z.object({
  type: z.enum([
    'email-verification',
    'sign-in',
    'forget-password',
    'change-email',
  ]),
  to: z.email(),
  name: z.string().optional(),
  otp: z.string().optional(),
  preventThreading: z.boolean().optional(),
})

export const sendEmail = createServerFn({ method: 'POST' })
  .validator(sendEmailSchema)
  .handler(async ({ data }) => {
    if (!resend) {
      console.warn('[sendEmail] Skipped: RESEND_API_KEY is missing from .env')
      return null
    }

    const template = emailTemplates[data.type]

    const emailOptions: Parameters<typeof resend.emails.send>[0] = {
      from: process.env.EMAIL_FROM || 'Vĩnh Lợi <onboarding@resend.dev>',
      to: [data.to],
      subject: template.subject,
      react: template.render(data as any),
    }

    if (data.preventThreading) {
      emailOptions.headers = { 'X-Entity-Ref-ID': randomUUID() }
    }

    const { data: result, error } = await resend.emails.send(emailOptions)
    if (error) throw new Error(error.message)
    return result
  })
