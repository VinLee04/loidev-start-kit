import { FieldGroup } from "#/components/ui/field.tsx";
import { formOptions } from "@tanstack/react-form";
import { signInSchema, type SignInFormValues } from "../schema";
import { withForm } from "#/lib/form/form-hook.ts";

const signInFormDefaultValues: SignInFormValues = {
  email: '',
  password: '',
  rememberMe: false
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
        {(field: any) => <field.TextField label="Email" type="email" placeholder="vinhloi@email.com" autoFocus={focusField === 'email'} />}
      </form.AppField>
      <form.AppField name="password">
        {(field: any) => <field.TextField label="Mật khẩu" type="password" placeholder="••••••••" autoFocus={focusField === 'password'}
        />}
      </form.AppField>
      <form.AppField name="rememberMe">
        {(field: any) => <field.SwitchField label="Ghi nhớ mật khẩu" />}
      </form.AppField>
    </FieldGroup>
  )
})