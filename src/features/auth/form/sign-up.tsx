import { formOptions } from '@tanstack/react-form'
import { signUpSchema } from '../schema'
import type { SignUpFormValues } from '../schema'
import { FieldGroup } from '#/components/ui/field.tsx'
import { withForm } from '#/lib/form/form-hook.ts'
import { MailIcon, ShieldCheckIcon, ShieldIcon, UserIcon } from 'lucide-react'

const signUpFormDefaultValues: SignUpFormValues = {
  name: '',
  email: '',
  password: '',
  confirm: '',
}

export const signUpFormOpts = formOptions({
  defaultValues: signUpFormDefaultValues,
  validators: { onSubmit: signUpSchema },
})

export const SignUpFormFields = withForm({
  ...signUpFormOpts,
  render: ({ form }) => (
    <FieldGroup className="gap-2.5">
      <form.AppField name="name">
        {(field) => (
          <field.TextField
            label="Fullname"
            placeholder="Trần Vĩnh Lợi"
            autoFocus
            Icon={UserIcon}
          />
        )}
      </form.AppField>
      <form.AppField name="email">
        {(field) => (
          <field.TextField
            label="Email"
            type="email"
            placeholder="vinhloi@email.com"
            Icon={MailIcon}
          />
        )}
      </form.AppField>
      <form.AppField name="password">
        {(field) => (
          <field.TextField
            label="Password"
            type="password"
            placeholder="••••••••"
            Icon={ShieldIcon}
          />
        )}
      </form.AppField>
      <form.AppField name="confirm">
        {(field) => (
          <field.TextField
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            Icon={ShieldCheckIcon}
          />
        )}
      </form.AppField>
    </FieldGroup>
  ),
})
