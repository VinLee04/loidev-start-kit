import AuthWrapper from '#/components/auth/auth-wrapper.tsx'
import SignInForm from '#/components/auth/form/sign-in.tsx'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'
import z from 'zod'

const SignInParams = z.object({
  status: z.enum(['signup']).optional().catch(undefined),
  email: z.string().optional(),
})

export const Route = createFileRoute('/_authentication/sign-in')({
  validateSearch: SignInParams,
  component: RouteComponent,
})

function RouteComponent() {
  const { status } = Route.useSearch()
  const navigate = Route.useNavigate()
  const hasShownToast = useRef(false)

  useEffect(() => {
    if (status === 'signup' && !hasShownToast.current) {
      hasShownToast.current = true
      // TODO: Sau khi đăng ký thì in thông báo yêu cầu xác thực email đồng thời gửi mail cho người dùng để xác thực
      toast.success('Sign up successful', {
        description: 'Automatically logged in',
      })

      navigate({ to: '/' })

      // toast.success('Vui lòng đăng nhập bằng tài khoản vừa tạo')
      // navigate({ to: '.', search: (prev) => ({ ...prev, status: undefined }), replace: true })
    }
  }, [status])

  return (
    <>
      <AuthWrapper
        title="Welcome back"
        description="Please fill in your information to sign in"
        footer={
          <div className="text-sm  text-center space-y-3">
            <p>
              Don't have an account?{' '}
              <Link to="/sign-up" className="text-primary hover:underline">
                Sign Up
              </Link>
            </p>
            <p className="italic text-muted-foreground">
              We keep your personal information safe using current security
              standards.
            </p>
          </div>
        }
      >
        <SignInForm />
        {/* TODO: Xác thực email */}
        {/* TODO: Tính năng Quên mật khẩu */}
        {/* TODO: Phương thức đăng nhập bằng mxh */}
      </AuthWrapper>
    </>
  )
}
