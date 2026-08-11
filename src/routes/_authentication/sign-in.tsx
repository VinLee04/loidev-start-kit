import AuthWrapper from '#/components/auth/auth-wrapper.tsx';
import SignInForm from '#/components/auth/form/sign-in.tsx';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import z from 'zod';

const SignInParams = z.object({
  status: z.enum(['signup']).optional().catch(undefined),
  email: z.email().optional()
})

export const Route = createFileRoute('/_authentication/sign-in')({
  validateSearch: SignInParams,
  component: RouteComponent,
})

function RouteComponent() {
  const { status } = Route.useSearch()
  const navigate = Route.useNavigate()
  const hasShownToast = useRef(false)

  useEffect(() => {
    if (status === 'signup' && !hasShownToast.current) {
      hasShownToast.current = true
      toast.success('Vui lòng đăng nhập bằng tài khoản vừa tạo')
      navigate({ to: '.', search: (prev) => ({ ...prev, status: undefined }), replace: true })
    }
  }, [status])


  return (
    <AuthWrapper
      title='Chào mừng bạn quay lại'
      description='Vui lòng điền thông tin để đăng nhập tài khoản'
      footer={
        <div className="text-sm  text-center space-y-3">

          <p>
            Chưa có tài khoản?{' '}
            <Link to="/sign-up" className="text-primary hover:underline">
              Đăng ký
            </Link>
          </p>

          <p className='italic text-muted-foreground'>Chúng tôi đảm bảo an toàn cho thông tin cá nhân của bạn dựa trên các tiêu chuẩn bảo mật hiện hành.</p>

        </div>
      }
    >
      <SignInForm />
    </AuthWrapper>
  )
}
