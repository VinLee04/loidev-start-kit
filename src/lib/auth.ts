import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { db } from '../db'
import { admin, emailOTP } from 'better-auth/plugins'
import { sendEmail } from '#/utils/send-email.ts'
import { eq } from 'drizzle-orm'
import { user } from '#/db/schema/auth.ts'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  user: {
    deleteUser: {
      enabled: true,
      // sendDeleteAccountVerification: async ({ user, url, token }) => {
      // 	// Send delete account verification
      // },
      // beforeDelete: async (user) => {
      // 	// Perform actions before user deletion
      // },
      // afterDelete: async (user) => {
      // 	// Perform cleanup after user deletion
      // }
    },
  },
  emailAndPassword: {
    enabled: true,

    sendResetPassword: async ({ user, url, token }, request) => {
      // TODO: Gửi mail để reset password
      // void sendEmail({
      //   to: user.email,
      //   subject: "Reset your password",
      //   text: `Click the link to reset your password: ${url}`,
      // });
      console.log(
        `Send reset password to ${user} with url: ${url} and token: ${token}`,
      )
    },
    onPasswordReset: async ({ user }, request) => {
      // TODO: Khôi phục mật khẩu
      // your logic here
      console.log(`Password for user ${user.email} has been reset.`)
    },

    //  NOTE: Đăng ký xong không tự đăng nhập, phải cần xác thực email
    requireEmailVerification: true,
    autoSignIn: false,
    customSyntheticUser: ({ coreFields, additionalFields, id }) => ({
      ...coreFields,
      // Admin plugin fields (in schema order)
      role: 'user',
      banned: false,
      banReason: null,
      banExpires: null,
      // Your additional fields
      ...additionalFields,
      // ID must be last to match database output order
      id,
    }),
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (type === 'email-verification') {
          const currentUser = await db.query.user.findFirst({
            where: eq(user.email, email),
          })

          // Đã verified rồi thì không gửi nữa, dù request tới từ đâu
          if (currentUser?.emailVerified) return

          await sendEmail({
            type: 'email-verification',
            to: email,
            name: currentUser?.name ?? 'there',
            otp,
          })
        } else if (type === 'sign-in') {
          // Send the OTP for sign in
        } else if (type === 'forget-password') {
          // Send the OTP for password reset
        } else {
          // Send the OTP for change email
        }
      },
    }),
    admin(),
    tanstackStartCookies(),
  ],
})
