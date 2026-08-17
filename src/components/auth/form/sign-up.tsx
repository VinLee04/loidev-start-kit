import {
  SignUpFormFields,
  signUpFormOpts,
} from '#/features/auth/form/sign-up.tsx'
import { signUpServerFn } from '#/features/auth/server/auth.ts'
import { useAppForm, withForm } from '#/lib/form/form-hook.ts'
import type { SignInStatus } from '#/routes/_authentication/sign-in.tsx'
import { getRouteApi } from '@tanstack/react-router'
import { toast } from 'sonner'

export const SignUpFormComponent = withForm({
  ...signUpFormOpts,
  render: ({ form }) => (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="flex flex-col gap-4 p-2 md:p-4"
    >
      <SignUpFormFields form={form} />

      <form.AppForm>
        <form.SubscribeButton label="Create Account" />
      </form.AppForm>
    </form>
  ),
})

const Route = getRouteApi('/_authentication/sign-up')

const SignUpForm = () => {
  const navigate = Route.useNavigate()

  const goToSignIn = (email: string, status?: SignInStatus) =>
    navigate({
      to: '/sign-in',
      search: { status, email },
    })

  const signUpForm = useAppForm({
    ...signUpFormOpts,
    onSubmit: async (values) => {
      const result = await signUpServerFn({ data: values.value })

      if (!result.success) {
        if (result.code === 'ALREADY_EXISTS_UNVERIFIED') {
          toast.warning(
            'This email is already registered but not verified yet.',
            {
              description: 'Please verify your account on the sign-in page.',
              action: {
                label: 'Go to verify',
                onClick: () => goToSignIn(values.value.email, 'manual-verify'),
              },
            },
          )
        } else {
          toast.error(
            'This email is already registered. Please sign in instead.',
            {
              action: {
                label: 'Go to sign in',
                onClick: () => goToSignIn(values.value.email),
              },
            },
          )
        }
      } else {
        toast.success('Account created! Check your email to verify.')
        goToSignIn(values.value.email, 'manual-verify')
      }
      signUpForm.reset()
    },
  })

  return <SignUpFormComponent form={signUpForm} />
}

export default SignUpForm
