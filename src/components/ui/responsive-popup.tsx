import React from 'react'
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
import { useIsMobile } from '#/hooks/use-is-mobile'
import type { ReactElement } from 'react'

type ResponsivePopupProps = {
  title: string
  description: string
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  children: ReactElement
}

const DesktopDialog = ({
  title,
  description,
  open,
  setOpen,
  children,
}: ResponsivePopupProps) => (
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      {children}
    </DialogContent>
  </Dialog>
)

const MobileDrawer = ({
  title,
  description,
  open,
  setOpen,
  children,
}: ResponsivePopupProps) => (
  <Drawer open={open} onOpenChange={setOpen}>
    <DrawerContent className="p-4">
      <DrawerHeader>
        <DrawerTitle>{title}</DrawerTitle>
        <DrawerDescription>{description}</DrawerDescription>
      </DrawerHeader>
      <div className="px-2 pb-8">{children}</div>
    </DrawerContent>
  </Drawer>
)

const ResponsivePopup = ({ children, ...props }: ResponsivePopupProps) => {
  const isMobile = useIsMobile()

  return isMobile ? (
    <MobileDrawer {...props}>{children}</MobileDrawer>
  ) : (
    <DesktopDialog {...props}>{children}</DesktopDialog>
  )
}

export default ResponsivePopup
