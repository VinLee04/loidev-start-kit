import AuthWrapper from '#/components/auth/auth-wrapper.tsx'
import SignUpForm from '#/components/auth/form/sign-up.tsx'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_authentication/sign-up')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AuthWrapper
      title="Sign Up"
      description="Please fill in your information to create an account"
      footer={
        <div className="text-sm  text-center space-y-3">
          <p>
            Already have an account?{' '}
            <Link to="/sign-in" className="text-primary hover:underline">
              Sign In
            </Link>
          </p>
          <p className="italic text-muted-foreground">
            We keep your personal information safe using current security
            standards.
          </p>
        </div>
      }
    >
      <SignUpForm />
    </AuthWrapper>
  )
}
