import { FieldGroup } from '#/components/ui/field.tsx'
import { withForm } from '#/lib/form/form-hook.ts'
import { formOptions } from '@tanstack/react-form'
import { ShieldCheckIcon, ShieldIcon } from 'lucide-react'
import type { ChangePasswordFormValues } from '../schema'
import { changePasswordSchema } from '../schema'

const changePasswordFormDefaultValues: ChangePasswordFormValues = {
  currentPassword: '',
  newPassword: '',
}

export const changePasswordFormOpts = formOptions({
  defaultValues: changePasswordFormDefaultValues,
  validators: { onSubmit: changePasswordSchema },
})

export const ChangePasswordFormFields = withForm({
  ...changePasswordFormOpts,
  render: ({ form }) => (
    <FieldGroup>
      <form.AppField name="currentPassword">
        {(field) => (
          <field.TextField
            autoFocus
            label="Current Password"
            type="password"
            placeholder="••••••••"
            Icon={ShieldIcon}
          />
        )}
      </form.AppField>
      <form.AppField name="newPassword">
        {(field) => (
          <field.TextField
            label="New Password"
            type="password"
            placeholder="••••••••"
            Icon={ShieldCheckIcon}
          />
        )}
      </form.AppField>
    </FieldGroup>
  ),
})
