import z from 'zod'

// Schema cho chức năng đăng ký
export const signUpSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.email({ message: 'Invalid email format' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' }),
    confirm: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' }),
  })
  .refine((data) => data.password === data.confirm, {
    error: 'Confirmation password does not match',
    path: ['confirm'],
  })

export type SignUpFormValues = z.infer<typeof signUpSchema>

// Schema cho chức năng đăng nhập
export const signInSchema = z.object({
  email: z.email({ message: 'Invalid email format' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
  rememberMe: z.boolean(),
})

export type SignInFormValues = z.infer<typeof signInSchema>

// Schema cho chức năng xác thực email bằng OTP
export const verifyEmailSchema = z.object({
  email: z.email({ message: 'Invalid email format' }),
  otp: z.string().length(6, { message: 'OTP must be exactly 6 digits' }),
})

export type verificationEmailFormValues = z.infer<typeof verifyEmailSchema>

// Schema cho chức năng kiểm tra email đã xác thực chưa
export const checkEmailVerifiedSchema = z.object({
  email: z.email({ message: 'Invalid email format' }),
})

// Schema cho chức năng người dùng tự delete tài khoản của họ
export const deleteUserSchema = z.object({
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
})

// Schema cho chức năng đổi mật khẩu
export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
  newPassword: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
})

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>

// Schema cho chức năng yêu cầu đặt lại mật khẩu
export const requestResetPasswordSchema = z.object({
  email: z.email({ message: 'Invalid email format' }),
})

// Schema cho chức năng đặt lại mật khẩu
export const resetPasswordSchema = z.object({
  email: z.email({ message: 'Invalid email format' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
  otp: z.string().length(6, { message: 'OTP must be exactly 6 digits' }),
})

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>
