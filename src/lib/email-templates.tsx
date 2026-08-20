// lib/email-templates.tsx
import { EmailVerificationTemplate } from '#/components/email/email-verification-template.tsx'
import { ForgetPasswordTemplate } from '#/components/email/forget-password-template.tsx'

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
    render: (d: { name: string; otp: string; to: string }) => (
      <ForgetPasswordTemplate name={d.name} otp={d.otp} email={d.to} />
    ),
  },
  'change-email': {
    subject: 'Change your email',
    render: () => <></>,
  },
} as const

export type EmailType = keyof typeof emailTemplates
