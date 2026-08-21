// forgot-password-popup.tsx
import { Button } from '#/components/ui/button'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '#/components/ui/input-group'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '#/components/ui/input-otp'
import { Label } from '#/components/ui/label'
import type { ResetPasswordFormValues } from '#/features/auth/schema.tsx'
import {
  checkEmailVerifiedServerFn,
  requestResetPasswordServerFn,
  resetPasswordOTPServerFn,
} from '#/features/auth/server/auth.ts'
import { isValidEmail } from '#/utils/is-valid-email'
import { getRouteApi } from '@tanstack/react-router'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { MailIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { PasswordInputField } from '../ui/password-input-field'
import ResponsivePopup from '../ui/responsive-popup'

const Route = getRouteApi('/_authentication/sign-in')

type PopupProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  onResetPassword: (data: ResetPasswordFormValues) => Promise<void>
  isSubmitting: boolean
}

const ResetPasswordFormContent = ({
  onResetPassword,
  isResetting: isLoading,
}: {
  onResetPassword: PopupProps['onResetPassword']
  isResetting: boolean
}) => {
  const { email: emailFromUrl, otp: otpFromUrl } = Route.useSearch()

  const [emailValue, setEmailValue] = useState(emailFromUrl ?? '')
  const [otpValue, setOtpValue] = useState(otpFromUrl ?? '')
  const [resending, setResending] = useState(false)
  const [password, setPassword] = useState('')

  const isEmailValid = isValidEmail(emailValue)
  const isOtpComplete = otpValue.length === 6

  useEffect(() => {
    isEmailValid &&
      isOtpComplete &&
      (
        document.querySelector(
          '#forgot-password-form input[type=password]',
        ) as HTMLInputElement
      ).focus()
  }, [])

  const resentOTP = async (targetEmail: string) => {
    setResending(true)
    try {
      const { exists } = await checkEmailVerifiedServerFn({
        data: { email: targetEmail },
      })

      if (!exists) {
        toast.error('No account found with this email')
        return
      }

      await requestResetPasswordServerFn({ data: { email: emailValue } })

      toast.success(`An OTP has been sent to: ${targetEmail}`)
    } catch (error: any) {
      toast.error(error?.message ?? 'Failed to resend OTP')
    } finally {
      setResending(false)
    }
  }

  const onSubmit = async () => {
    await onResetPassword({ email: emailValue, otp: otpValue, password })
  }

  return (
    <form
      id="forgot-password-form"
      onSubmit={async (e) => {
        e.preventDefault()
        if (isEmailValid && isOtpComplete && !isLoading) {
          await onSubmit()
        }
      }}
      className="space-y-4"
    >
      <Label htmlFor="email">Email</Label>
      <div className="flex justify-between gap-2">
        <InputGroup>
          <InputGroupAddon>
            <MailIcon />
          </InputGroupAddon>
          <InputGroupInput
            id="email"
            placeholder="you@example.com"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
          />
        </InputGroup>
        <Button
          type="button"
          className="w-32"
          disabled={!isEmailValid || resending}
          variant="secondary"
          onClick={() => resentOTP(emailValue)}
        >
          {resending ? 'Sending...' : 'Resend OTP'}
        </Button>
      </div>

      <Label htmlFor="otp" className="mt-4">
        OTP Code
      </Label>
      <InputOTP
        value={otpValue}
        onChange={setOtpValue}
        maxLength={6}
        inputMode="numeric"
        pattern={REGEXP_ONLY_DIGITS}
      >
        <InputOTPGroup>
          {Array.from({ length: 6 }).map((_, i) => (
            <InputOTPSlot key={i} index={i} />
          ))}
        </InputOTPGroup>
      </InputOTP>

      <PasswordInputField
        isPending={isLoading || !isOtpComplete || !isEmailValid}
        password={password}
        setPassword={setPassword}
      />

      <Button
        type="submit"
        className="w-full mt-2"
        disabled={
          !isEmailValid ||
          !isOtpComplete ||
          isLoading ||
          password.length < 8 ||
          resending
        }
      >
        {isLoading ? 'Changing...' : 'Change Password'}
      </Button>
    </form>
  )
}

const ForgotPasswordPopup = ({
  open,
  setOpen,
}: Omit<PopupProps, 'onResetPassword' | 'isSubmitting'>) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleResetPassword = async (data: ResetPasswordFormValues) => {
    setIsSubmitting(true)
    await resetPasswordOTPServerFn({ data })
      .then(() => {
        toast.success('Your password has been successfully reset!')
        setOpen(false)
      })
      .catch((e) => {
        toast.error(e.message)
      })
      .finally(() => setIsSubmitting(false))
  }

  return (
    <ResponsivePopup
      title="Forgot Password"
      description="Enter your email and the OTP code sent to it to reset your password"
      open={open}
      setOpen={setOpen}
    >
      <ResetPasswordFormContent
        isResetting={isSubmitting}
        onResetPassword={handleResetPassword}
      />
    </ResponsivePopup>
  )
}

export default ForgotPasswordPopup
