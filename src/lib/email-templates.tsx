// lib/email-templates.tsx
import { EmailVerificationTemplate } from '#/components/email/email-verification-template.tsx'

export const emailTemplates = {
  'email-verification': {
    subject: 'Verify your email address',
    render: (d: { name: string; otp: string; to: string }) => (
      <EmailVerificationTemplate name={d.name} otp={d.otp} email={d.to} />
    ),
  },
  'sign-in': {
    subject: 'Your sign-in code',
    render: () => <></>,
  },
  'forget-password': {
    subject: 'Reset your password',
    render: () => <></>,
  },
  'change-email': {
    subject: 'Change your email',
    render: () => <></>,
  },
} as const

export type EmailType = keyof typeof emailTemplates
