import { Button } from '#/components/ui/button.tsx'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '#/components/ui/input-group.tsx'
import { Label } from '#/components/ui/label.tsx'
import { deleteUserServerFn } from '#/features/auth/server/auth.ts'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useNavigate } from '@tanstack/react-router'
import { EyeIcon, EyeOffIcon, UserXIcon } from 'lucide-react'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

const DeleteAccountButton = () => {
  const navigate = useNavigate()
  const [openAskAfterDelete, setOpenAskAfterDelete] = useState(false)
  const [password, setPassword] = useState('')
  const [isPending, startTransition] = useTransition()
  const [isHidePassword, setIsHidePassword] = useState(true)

  const onCancelDelete = () => {
    setPassword('')
    toast.success('Your account safe')
  }

  const onDeleteAccount = () => {
    const toastId = toast.info('Checking...')

    startTransition(async () => {
      await deleteUserServerFn({ data: { password } })
        .then(() => {
          toast.success('Account deleted successfully!', {
            id: toastId,
          })
          navigate({ to: '/sign-up' })
        })
        .catch(({ message }) => toast.error(message, { id: toastId }))
    })
  }

  return (
    <>
      <AlertDialog
        open={openAskAfterDelete}
        onOpenChange={setOpenAskAfterDelete}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
            <div className="mt-6 space-y-3 w-full">
              <Label>Password</Label>
              <InputGroup>
                <InputGroupInput
                  readOnly={isPending}
                  type={isHidePassword ? 'password' : 'text'}
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === 'Enter' &&
                    password.length >= 8 &&
                    onDeleteAccount()
                  }
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setIsHidePassword((prev) => !prev)}
                    tabIndex={-1}
                    className="rounded-md"
                  >
                    {isHidePassword ? <EyeIcon /> : <EyeOffIcon />}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              variant="outline"
              onClick={onCancelDelete}
              disabled={isPending}
            >
              No, I don't
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={password.length < 8 || isPending}
              onClick={(e) => {
                e.preventDefault()
                onDeleteAccount()
              }}
            >
              Yes, I want to delete this account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Button
        variant="destructive"
        className="mr-auto"
        onClick={() => setOpenAskAfterDelete(true)}
      >
        <UserXIcon /> Delete Account
      </Button>
    </>
  )
}

export default DeleteAccountButton
