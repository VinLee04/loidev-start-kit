import {
  SignUpFormFields,
  signUpFormOpts,
} from '#/features/auth/form/sign-up.tsx'
import { signUpServerFn } from '#/features/auth/server/auth.ts'
import { sessionQueryOptions } from '#/features/auth/server/session.ts'
import { useAppForm, withForm } from '#/lib/form/form-hook.ts'
import { getRouteApi, useNavigate } from '@tanstack/react-router'

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
  const navigate = useNavigate()
  const { queryClient } = Route.useRouteContext()

  const signUpForm = useAppForm({
    ...signUpFormOpts,
    onSubmit: async (values) => {
      await signUpServerFn({ data: values.value })
      signUpForm.reset()
      await queryClient.invalidateQueries({
        queryKey: sessionQueryOptions.queryKey,
      })
      navigate({
        from: '/sign-up',
        to: '/sign-in',
        search: { status: 'signup', email: values.value.email },
      })
    },
  })

  return <SignUpFormComponent form={signUpForm} />
}

export default SignUpForm
