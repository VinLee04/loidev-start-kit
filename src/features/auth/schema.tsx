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
