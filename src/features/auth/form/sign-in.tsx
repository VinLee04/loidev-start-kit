import { FieldGroup } from '#/components/ui/field.tsx'
import { withForm } from '#/lib/form/form-hook.ts'
import { formOptions } from '@tanstack/react-form'
import { MailIcon, ShieldIcon } from 'lucide-react'
import { signInSchema } from '../schema'
import type { SignInFormValues } from '../schema'

const signInFormDefaultValues: SignInFormValues = {
  email: '',
  password: '',
  rememberMe: false,
}

export const signInFormOpts = formOptions({
  defaultValues: signInFormDefaultValues,
  validators: { onSubmit: signInSchema },
})

export const SignInFormFields = withForm({
  ...signInFormOpts,
  props: {
    focusField: 'email' as 'email' | 'password',
  },
  render: ({ form, focusField }) => (
    <FieldGroup className="gap-2.5">
      <form.AppField name="email">
        {(field: any) => (
          <field.TextField
            label="Email"
            type="email"
            placeholder="vinhloi@email.com"
            Icon={MailIcon}
            autoFocus={focusField === 'email'}
          />
        )}
      </form.AppField>
      <form.AppField name="password">
        {(field: any) => (
          <field.TextField
            label="Password"
            type="password"
            placeholder="••••••••"
            Icon={ShieldIcon}
            autoFocus={focusField === 'password'}
          />
        )}
      </form.AppField>
      <form.AppField name="rememberMe">
        {(field: any) => <field.SwitchField label="Remember Me" />}
      </form.AppField>
    </FieldGroup>
  ),
})
