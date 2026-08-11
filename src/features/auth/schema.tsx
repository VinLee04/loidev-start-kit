import z from "zod";

// Schema cho chức năng đăng ký
export const signUpSchema = z.object({
  name: z.string().min(1, { message: 'Bắt buộc phải nhập tên' }),
  email: z.email({ message: 'Email không đúng định dạng' }),
  password: z.string().min(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' }),
  confirm: z.string().min(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' }),
}).refine((data) => data.password === data.confirm, {
  error: "Mật khẩu xác nhận không khớp",
  path: ["confirm"],
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;


// Schema cho chức năng đăng nhập
export const signInSchema = z.object({
  email: z.email({ message: 'Email không đúng định dạng' }),
  password: z.string().min(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự' }),
  rememberMe: z.boolean()
})

export type SignInFormValues = z.infer<typeof signInSchema>;