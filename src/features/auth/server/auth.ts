import { auth } from '#/lib/auth.ts'
import { createServerFn } from '@tanstack/react-start'
import {
  checkEmailVerifiedSchema,
  signInSchema,
  signUpSchema,
  verifyEmailSchema,
} from '../schema'
import { db } from '#/db/index.ts'
import { user } from '#/db/schema/auth.ts'
import { eq } from 'drizzle-orm'

export const signUpServerFn = createServerFn({ method: 'POST' })
  .validator(signUpSchema)
  .handler(async ({ data }) => {
    const { confirm, ...signUpData } = data

    const existing = await db.query.user.findFirst({
      where: eq(user.email, data.email),
    })

    if (existing) {
      return {
        success: false as const,
        code: existing.emailVerified
          ? 'ALREADY_EXISTS'
          : 'ALREADY_EXISTS_UNVERIFIED',
      }
    }

    await auth.api.signUpEmail({
      body: {
        ...signUpData,
        image: `https://api.dicebear.com/10.x/planets/svg?seed=${data.name}`,
        callbackURL: `${process.env.APP_URL}/sign-up`,
      },
    })

    await auth.api.sendVerificationOTP({
      body: { email: data.email, type: 'email-verification' },
    })

    return { success: true as const }
  })

export const signInServerFn = createServerFn({ method: 'POST' })
  .validator(signInSchema)
  .handler(async ({ data }) => {
    await auth.api.signInEmail({
      body: {
        ...data,
        callbackURL: `${process.env.APP_URL}/sign-in`,
      },
    })
  })

export const verifyEmailServerFn = createServerFn({ method: 'POST' })
  .validator(verifyEmailSchema)
  .handler(async ({ data }) => {
    await auth.api.verifyEmailOTP({
      body: { ...data },
    })
  })

export const checkEmailVerifiedServerFn = createServerFn({ method: 'GET' })
  .validator(checkEmailVerifiedSchema)
  .handler(async ({ data }) => {
    const existingUser = await db.query.user.findFirst({
      where: eq(user.email, data.email),
      columns: { emailVerified: true },
    })
    return {
      exists: !!existingUser,
      verified: existingUser?.emailVerified ?? false,
    }
  })
