import {
  ChangePasswordFormFields,
  changePasswordFormOpts,
} from '#/features/auth/form/change-password.tsx'
import { changePasswordServerFn } from '#/features/auth/server/auth.ts'
import { useAppForm, withForm } from '#/lib/form/form-hook.ts'
import { toast } from 'sonner'

export const ChangePasswordComponent = withForm({
  ...changePasswordFormOpts,
  render: ({ form }) => (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="flex flex-col gap-4"
    >
      <ChangePasswordFormFields form={form} />

      <div className="flex items-end">
        <form.AppForm>
          <form.ResetAndSubscribeForm label="Change Password" />
        </form.AppForm>
      </div>
    </form>
  ),
})

type ChangePasswordFormProps = {
  onClose: () => void
}

const ChangePasswordForm = ({ onClose }: ChangePasswordFormProps) => {
  const changePasswordForm = useAppForm({
    ...changePasswordFormOpts,
    onSubmit: async (values) => {
      await changePasswordServerFn({ data: values.value })
        .then(() => {
          toast.success('Your password has been successfully changed!')
          changePasswordForm.reset()
          onClose()
        })
        .catch((e) => {
          toast.error(e.message)
          ;(
            document.getElementById('currentPassword') as HTMLInputElement
          ).focus()
        })
    },
  })

  return <ChangePasswordComponent form={changePasswordForm} />
}

export default ChangePasswordForm
