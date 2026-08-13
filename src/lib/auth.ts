import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { db } from '../db'
import { admin } from 'better-auth/plugins'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
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

    //  NOTE: Tạm thời đăng ký xong sẽ tự đăng nhập không cần xác thực email, sau này sẽ đổi lại sau
    requireEmailVerification: false,
    autoSignIn: true,
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
  plugins: [admin(), tanstackStartCookies()],
})
