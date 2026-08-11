import { formOptions } from "@tanstack/react-form";
import { signUpSchema, type SignUpFormValues } from "../schema";
import { FieldGroup } from "#/components/ui/field.tsx";
import { withForm } from "#/lib/form/form-hook.ts";

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
        {(field) => <field.TextField label="Họ và tên" placeholder="Trần Vĩnh Lợi" autoFocus/>}
      </form.AppField>
      <form.AppField name="email">
        {(field) => <field.TextField label="Email" type="email" placeholder="vinhloi@email.com" />}
      </form.AppField>
      <form.AppField name="password">
        {(field) => <field.TextField label="Mật khẩu" type="password" placeholder="••••••••" />}
      </form.AppField>
      <form.AppField name="confirm">
        {(field) => <field.TextField label="Xác nhận mật khẩu" type="password" placeholder="••••••••" />}
      </form.AppField>
    </FieldGroup>
  ),
})
