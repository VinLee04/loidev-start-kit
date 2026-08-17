// src/utils/is-valid-email.ts
import { z } from 'zod'

const emailSchema = z.email()

export const isValidEmail = (value?: string) => {
  if (!value) return false
  return emailSchema.safeParse(value).success
}
