import AuthWrapper from '#/components/auth/auth-wrapper.tsx'
import ForgotPasswordPopup from '#/components/auth/forgot-password.tsx'
import SignInForm from '#/components/auth/form/sign-in.tsx'
import VerifyEmailPopup from '#/components/auth/verify-email.tsx'
import { Spinner } from '#/components/ui/spinner.tsx'
import type { verificationEmailFormValues } from '#/features/auth/schema.tsx'
import { verifyEmailServerFn } from '#/features/auth/server/auth.ts'
import { Button } from '@/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'
import {
  CircleAlertIcon,
  CircleCheckIcon,
  RotateCwIcon,
  Shield,
} from 'lucide-react'
import { useEffect, useRef, useState, useTransition } from 'react'
import { toast } from 'sonner'
import z from 'zod'

export const SignInStatus = [
  'auto-verify',
  'manual-verify',
  'reset-password',
] as const
export type SignInStatus = (typeof SignInStatus)[number]

const SignInParams = z.object({
  status: z.enum(SignInStatus).optional().catch(undefined),
  email: z.string().optional(),
  otp: z.coerce.string().optional().catch(undefined),
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
  const [displayForgotPasswordEmailForm, setDisplayForgotPasswordForm] =
    useState(false)
  const [isVerifying, startVerify] = useTransition()

  const performVerify = async (data: verificationEmailFormValues) => {
    const toastId = toast.info('Verifying your email...', {
      icon: <Spinner />,
      duration: Infinity, // giữ toast cho tới khi mình tự đóng
    })

    startVerify(() => {
      verifyEmailServerFn({ data })
        .then(() => {
          setDisplayVerifyEmailForm(false)
          toast.success('Account successfully verified, please log in again!', {
            id: toastId,
            icon: <CircleCheckIcon className="size-4" />,
            duration: 4000,
          })
        })
        .catch((error: any) => {
          toast.error(
            error?.message ??
              'Verification failed, the code may be invalid or expired',
            {
              id: toastId,
              icon: <CircleAlertIcon className="size-4" />,
              duration: 4000,
            },
          )
        })
    })
  }

  useEffect(() => {
    if (hasShownToast.current) return
    hasShownToast.current = true

    switch (status) {
      case 'manual-verify':
        setDisplayVerifyEmailForm(true)
        navigate({
          to: '.',
          search: (prev) => ({ ...prev, status: undefined, otp: undefined }),
          replace: true,
        })
        break

      case 'auto-verify':
        navigate({
          to: '.',
          search: (prev) => ({ ...prev, status: undefined, otp: undefined }),
          replace: true,
        })
        break

      case 'reset-password':
        setDisplayForgotPasswordForm(true)
        navigate({
          to: '.',
          search: (prev) => ({ ...prev, status: undefined }),
          replace: true,
        })
        break

      default:
        break
    }

    if (status === 'auto-verify' && email && otp) {
      performVerify({ email, otp })
      navigate({
        to: '.',
        search: (prev) => ({ ...prev, status: undefined, otp: undefined }),
        replace: true,
      })
    }

    if (status === 'manual-verify') {
      setDisplayVerifyEmailForm(true)
      navigate({
        to: '.',
        search: (prev) => ({ ...prev, status: undefined, otp: undefined }),
        replace: true,
      })
    }
  }, [status])

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
              <Button
                onClick={() => setDisplayForgotPasswordForm(true)}
                variant="secondary"
              >
                <RotateCwIcon /> Forgot Password
              </Button>
              <Button
                disabled={isVerifying}
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
        onVerify={performVerify}
        isVerifying={isVerifying}
      />
      <ForgotPasswordPopup
        open={displayForgotPasswordEmailForm}
        setOpen={setDisplayForgotPasswordForm}
      />
    </>
  )
}
