import { auth } from '#/lib/auth.ts'
import { createServerFn } from '@tanstack/react-start'
import { signInSchema, signUpSchema } from '../schema'
import { sendEmail } from '#/utils/send-email.ts'

export const signUpServerFn = createServerFn({ method: 'POST' })
  .validator(signUpSchema)
  .handler(async ({ data }) => {
    const { confirm, ...signUpData } = data

    await auth.api.signUpEmail({
      body: {
        ...signUpData,
        image: `https://api.dicebear.com/10.x/planets/svg?seed=${data.name}`,
        callbackURL: `${process.env.APP_URL}/sign-up`,
      },
    })
    await sendEmail({
      data: {
        name: data.name,
        to: data.email,
        subject: 'Chào mừng bạn!',
        message: 'Cảm ơn bạn đã đăng ký.',
      },
    })
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
