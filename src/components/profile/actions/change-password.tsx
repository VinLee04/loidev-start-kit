import ChangePasswordForm from '#/components/auth/form/change-password.tsx'
import { Button } from '#/components/ui/button.tsx'
import { useIsMobile } from '#/hooks/use-is-mobile.ts'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { RotateCcwKeyIcon } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'

type ChangePasswordPopup = {
  title: string
  description: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const ChangePasswordDesktopDialog = ({
  title,
  description,
  open,
  setOpen,
}: ChangePasswordPopup) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription> {description} </DialogDescription>
        </DialogHeader>
        <ChangePasswordForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

const ChangePasswordMobileDrawer = ({
  title,
  description,
  open,
  setOpen,
}: ChangePasswordPopup) => {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="p-4">{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-8">
          <ChangePasswordForm onClose={() => setOpen(false)} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

const formInfo = {
  title: 'Change your password here',
  description:
    "This action will change the current account's password and simultaneously log the account out of all other devices.",
}

const ChangePasswordButton = () => {
  const [openChangePasswordDialog, setOpenChangePasswordDialog] =
    useState(false)
  const isMobile = useIsMobile()

  return (
    <>
      <Button
        variant="secondary"
        onClick={() => setOpenChangePasswordDialog(true)}
      >
        <RotateCcwKeyIcon /> Change Password
      </Button>

      {isMobile ? (
        <ChangePasswordMobileDrawer
          {...formInfo}
          open={openChangePasswordDialog}
          setOpen={setOpenChangePasswordDialog}
        />
      ) : (
        <ChangePasswordDesktopDialog
          {...formInfo}
          open={openChangePasswordDialog}
          setOpen={setOpenChangePasswordDialog}
        />
      )}
    </>
  )
}

export default ChangePasswordButton
