import ChangePasswordForm from '#/components/auth/form/change-password.tsx'
import { Button } from '#/components/ui/button.tsx'
import ResponsivePopup from '#/components/ui/responsive-popup.tsx'
import { RotateCcwKeyIcon } from 'lucide-react'
import { useState } from 'react'

const formInfo = {
  title: 'Change your password here',
  description:
    "This action will change the current account's password and simultaneously log the account out of all other devices.",
}

const ChangePasswordButton = () => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        <RotateCcwKeyIcon /> Change Password
      </Button>

      <ResponsivePopup {...formInfo} open={open} setOpen={setOpen}>
        <ChangePasswordForm onClose={() => setOpen(false)} />
      </ResponsivePopup>
    </>
  )
}

export default ChangePasswordButton
