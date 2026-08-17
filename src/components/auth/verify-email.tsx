// verify-email-popup.tsx
import { Button } from '#/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '#/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '#/components/ui/drawer'
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
import { checkEmailVerifiedServerFn } from '#/features/auth/server/auth.ts'
import { useIsMobile } from '#/hooks/use-is-mobile'
import { authClient } from '#/lib/auth-client'
import { isValidEmail } from '#/utils/is-valid-email'
import { getRouteApi } from '@tanstack/react-router'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { MailIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

const Route = getRouteApi('/_authentication/sign-in')

type verificationEmailFormValues = { email: string; otp: string }

type PopupProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  onVerify: (data: verificationEmailFormValues) => void
  isVerifying: boolean
}

const VerifyEmailFormContent = ({
  onVerify,
  onClose,
  isVerifying,
}: {
  onVerify: PopupProps['onVerify']
  onClose: () => void
  isVerifying: boolean
}) => {
  const { email: emailFromUrl } = Route.useSearch()
  const navigate = Route.useNavigate()

  const [emailValue, setEmailValue] = useState(emailFromUrl ?? '')
  const [otpValue, setOtpValue] = useState('')
  const [resending, setResending] = useState(false)

  const isEmailValid = isValidEmail(emailValue)
  const isOtpComplete = otpValue.length === 6

  const resentOTP = async (targetEmail: string) => {
    setResending(true)
    try {
      const { exists, verified } = await checkEmailVerifiedServerFn({
        data: { email: targetEmail },
      })

      if (!exists) {
        toast.error('No account found with this email')
        return
      }
      if (verified) {
        toast.info('This email is already verified. You can sign in now.')
        navigate({
          to: '.',
          search: (prev) => ({ ...prev, email: targetEmail }),
          replace: true,
        })
        onClose()
        return
      }

      await authClient.emailOtp.sendVerificationOtp({
        email: targetEmail,
        type: 'email-verification',
      })
      toast.success(`An OTP has been sent to: ${targetEmail}`)
    } catch (error: any) {
      toast.error(error?.message ?? 'Failed to resend OTP')
    } finally {
      setResending(false)
    }
  }

  const handleVerify = () => {
    onVerify({ email: emailValue, otp: otpValue })
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (isEmailValid && isOtpComplete && !isVerifying) {
          handleVerify()
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
      <div className="flex justify-between gap-2">
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
        <Button
          type="submit"
          className="w-32"
          disabled={!isEmailValid || !isOtpComplete || isVerifying}
          onClick={handleVerify}
        >
          {isVerifying ? 'Verifying...' : 'Verify'}
        </Button>
      </div>
    </form>
  )
}

const DesktopDialog = ({
  open,
  setOpen,
  onVerify,
  isVerifying,
}: PopupProps) => (
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent className="max-w-fit!">
      <DialogHeader>
        <DialogTitle>Verify Account</DialogTitle>
        <DialogDescription>
          Enter your email and the OTP code sent to it to verify your account
        </DialogDescription>
      </DialogHeader>
      <VerifyEmailFormContent
        isVerifying={isVerifying}
        onVerify={onVerify}
        onClose={() => setOpen(false)}
      />
    </DialogContent>
  </Dialog>
)

const MobileDrawer = ({ open, setOpen, onVerify, isVerifying }: PopupProps) => (
  <Drawer open={open} onOpenChange={setOpen}>
    <DrawerContent className="p-4">
      <DrawerHeader>
        <DrawerTitle>Verify Account</DrawerTitle>
        <DrawerDescription>
          Enter your email and the OTP code sent to it to verify your account
        </DrawerDescription>
      </DrawerHeader>
      <div className="px-2 pb-8">
        <VerifyEmailFormContent
          isVerifying={isVerifying}
          onVerify={onVerify}
          onClose={() => setOpen(false)}
        />
      </div>
    </DrawerContent>
  </Drawer>
)

const VerifyEmailPopup = ({
  open,
  setOpen,
  onVerify,
  isVerifying,
}: PopupProps) => {
  const isMobile = useIsMobile()
  return isMobile ? (
    <MobileDrawer
      open={open}
      setOpen={setOpen}
      onVerify={onVerify}
      isVerifying={isVerifying}
    />
  ) : (
    <DesktopDialog
      open={open}
      setOpen={setOpen}
      onVerify={onVerify}
      isVerifying={isVerifying}
    />
  )
}

export default VerifyEmailPopup
