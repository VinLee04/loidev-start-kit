// verify-email-popup.tsx
import { useState } from 'react'
import { toast } from 'sonner'
import { MailIcon } from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Label } from '#/components/ui/label'
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '#/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '#/components/ui/drawer'
import { useIsMobile } from '#/hooks/use-is-mobile'
import { isValidEmail } from '#/utils/is-valid-email'
import { authClient } from '#/lib/auth-client'
import { getRouteApi } from '@tanstack/react-router'

const Route = getRouteApi('/_authentication/sign-in')

type verificationEmailFormValues = { email: string; otp: string }

type PopupProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  onVerify: (data: verificationEmailFormValues) => Promise<void>
}

const VerifyEmailFormContent = ({
  onVerify,
}: {
  onVerify: PopupProps['onVerify']
}) => {
  const { email: emailFromUrl } = Route.useSearch()

  const [emailValue, setEmailValue] = useState(emailFromUrl ?? '')
  const [otpValue, setOtpValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)

  const isEmailValid = isValidEmail(emailValue)
  const isOtpComplete = otpValue.length === 6

  const resentOTP = async (targetEmail: string) => {
    setResending(true)
    try {
      await authClient.emailOtp.sendVerificationOtp({
        email: targetEmail,
        type: 'email-verification',
      })
      toast.success(`An OTP has been sent to: ${targetEmail}`)
    } catch (error: any) {
      toast.error(error?.message ?? 'Failed to resend OTP')
      return
    } finally {
      setResending(false)
    }
  }

  const handleVerify = async () => {
    setLoading(true)
    try {
      await onVerify({ email: emailValue, otp: otpValue })
    } catch (error: any) {
      toast.error(error?.message ?? 'Verification failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
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
        >
          <InputOTPGroup>
            {Array.from({ length: 6 }).map((_, i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>
        <Button
          className="w-32"
          disabled={!isEmailValid || !isOtpComplete || loading}
          onClick={handleVerify}
        >
          {loading ? 'Verifying...' : 'Verify'}
        </Button>
      </div>
    </>
  )
}

const DesktopDialog = ({ open, setOpen, onVerify }: PopupProps) => (
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent className="max-w-fit!">
      <DialogHeader>
        <DialogTitle>Verify Account</DialogTitle>
        <DialogDescription>
          Enter your email and the OTP code sent to it to verify your account
        </DialogDescription>
      </DialogHeader>
      <VerifyEmailFormContent onVerify={onVerify} />
    </DialogContent>
  </Dialog>
)

const MobileDrawer = ({ open, setOpen, onVerify }: PopupProps) => (
  <Drawer open={open} onOpenChange={setOpen}>
    <DrawerContent className="p-4">
      <DrawerHeader>
        <DrawerTitle>Verify Account</DrawerTitle>
        <DrawerDescription>
          Enter your email and the OTP code sent to it to verify your account
        </DrawerDescription>
      </DrawerHeader>
      <div className="px-2 pb-8 space-y-4">
        <VerifyEmailFormContent onVerify={onVerify} />
      </div>
    </DrawerContent>
  </Drawer>
)

const VerifyEmailPopup = ({ open, setOpen, onVerify }: PopupProps) => {
  const isMobile = useIsMobile()
  return isMobile ? (
    <MobileDrawer open={open} setOpen={setOpen} onVerify={onVerify} />
  ) : (
    <DesktopDialog open={open} setOpen={setOpen} onVerify={onVerify} />
  )
}

export default VerifyEmailPopup
