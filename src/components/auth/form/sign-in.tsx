
import { SignInFormFields, signInFormOpts } from '#/features/auth/form/sign-in.tsx';
import { signInServerFn } from '#/features/auth/server/auth.ts';
import { useAppForm, withForm } from '#/lib/form/form-hook.ts';
import { getRouteApi } from '@tanstack/react-router';
import { toast } from 'sonner';

export const SignInFormComponent = withForm({
  ...signInFormOpts,
  props: {
    focusField: 'email' as 'email' | 'password',
  },
  render: ({ form, focusField }) => (
    <form onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); form.handleSubmit() }}
      className="flex flex-col gap-4 p-2 md:p-4"
    >
      <SignInFormFields form={form} focusField={focusField} />

      <form.AppForm>
        <form.SubscribeButton label="Đăng nhập" />
      </form.AppForm>
    </form>
  ),
})

const Route = getRouteApi('/_authentication/sign-in');

const SignInForm = () => {
  const navigate = Route.useNavigate();
  const { email } = Route.useSearch();

  const signInForm = useAppForm({
    ...signInFormOpts,
    defaultValues: {
      ...signInFormOpts.defaultValues,
      email: email ?? signInFormOpts.defaultValues.email,
    },
    onSubmit: async (values) => {
      try {
        await signInServerFn({ data: values.value })
        signInForm.reset();
        navigate({ from: '/sign-in', to: '/' })
        toast.success('Đăng nhập thành công!');
      } catch (error: any) {
        toast.error(error.message);
        console.error(error)
      }
    }
  })

  return (
    <SignInFormComponent form={signInForm} focusField={email ? 'password' : 'email'} />
  )
}

export default SignInForm