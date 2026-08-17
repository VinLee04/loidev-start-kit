import AuthWrapper from '#/components/auth/auth-wrapper.tsx'
import SignInForm from '#/components/auth/form/sign-in.tsx'
import VerifyEmailPopup from '#/components/auth/verify-email.tsx'
import type { verificationEmailFormValues } from '#/features/auth/schema.tsx'
import { verifyEmailServerFn } from '#/features/auth/server/auth.ts'
import { Button } from '@/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'
import { RotateCwIcon, Shield } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import z from 'zod'

export const SignInStatus = ['auto-verify', 'manual-verify'] as const
export type SignInStatus = (typeof SignInStatus)[number]

const SignInParams = z.object({
  status: z.enum(SignInStatus).optional().catch(undefined),
  email: z.string().optional(),
  otp: z.string().optional(),
})

export const Route = createFileRoute('/_authentication/sign-in')({
  validateSearch: SignInParams,
  component: RouteComponent,
})

function RouteComponent() {
  const { status, email, otp } = Route.useSearch()
  const navigate = Route.useNavigate()
  const hasShownToast = useRef(false)
  const [displayVerifyEmailForm, setDisplayVerifyEmailForm] = useState(false)

  useEffect(() => {
    if (hasShownToast.current) return
    hasShownToast.current = true

    if (status === 'manual-verify') {
      setDisplayVerifyEmailForm(true)
      navigate({
        to: '.',
        search: (prev) => ({ ...prev, status: undefined, otp: undefined }),
        replace: true,
      })
    }

    if (status === 'auto-verify' && email && otp) {
      // Không mở dialog, verify ngầm rồi báo kết quả qua toast
      onVerifyEmail({ email, otp }).finally(() => {
        navigate({
          to: '.',
          search: (prev) => ({ ...prev, status: undefined, otp: undefined }),
          replace: true,
        })
      })
    }
  }, [status])

  const onVerifyEmail = async (data: verificationEmailFormValues) => {
    try {
      await verifyEmailServerFn({ data })
      setDisplayVerifyEmailForm(false)
      toast.success('Account successfully verified, please log in again!')
    } catch (error: any) {
      toast.error(
        error?.message ??
          'Verification failed, the code may be invalid or expired',
      )
    }
  }

  return (
    <>
      <AuthWrapper
        title="Welcome back"
        description="Please fill in your information to sign in"
        footer={
          <div className="text-sm w-full text-center space-y-3">
            <p>
              Don't have an account?{' '}
              <Link to="/sign-up" className="text-primary hover:underline">
                Sign Up
              </Link>
            </p>
            <div className="mt-8 flex *:flex-1 gap-4">
              <Button disabled variant="secondary">
                <RotateCwIcon /> Forgot Password
              </Button>
              <Button
                onClick={() => setDisplayVerifyEmailForm(true)}
                variant="secondary"
              >
                <Shield className="fill-accent" /> Verify Email
              </Button>
            </div>
          </div>
        }
      >
        <SignInForm />
        {/* TODO: Tính năng Quên mật khẩu */}
        {/* TODO: Phương thức đăng nhập bằng mxh */}
      </AuthWrapper>
      <VerifyEmailPopup
        open={displayVerifyEmailForm}
        setOpen={setDisplayVerifyEmailForm}
        onVerify={onVerifyEmail}
      />
    </>
  )
}
