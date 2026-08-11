import AuthWrapper from '#/components/auth/auth-wrapper.tsx';
import SignUpForm from '#/components/auth/form/sign-up.tsx';
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_authentication/sign-up')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AuthWrapper
      title='Đăng Ký Tài Khoản'
      description='Vui lòng điền thông tin để đăng ký tài khoản'
      footer={
        <div className="text-sm  text-center space-y-3">

          <p>
            Đã có tài khoản?{' '}
            <Link to="/sign-in" className="text-primary hover:underline">
              Đăng nhập
            </Link>
          </p>

          <p className='italic text-muted-foreground'>Chúng tôi đảm bảo an toàn cho thông tin cá nhân của bạn dựa trên các tiêu chuẩn bảo mật hiện hành.</p>

        </div>
      }
    >
      <SignUpForm />
    </AuthWrapper>
  )
}