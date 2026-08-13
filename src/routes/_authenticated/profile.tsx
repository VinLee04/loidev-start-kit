import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '#/components/reui/badge.tsx'
import { Button, buttonVariants } from '#/components/ui/button.tsx'
import { ModeToggle } from '#/components/ui/mode-toggle.tsx'
import { sessionQueryOptions } from '#/features/auth/server/session.ts'
import { authClient } from '#/lib/auth-client.ts'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { createFileRoute, Link } from '@tanstack/react-router'
import { format } from 'date-fns'
import {
  CarrotIcon,
  ShieldBanIcon,
  ShieldCheckIcon,
  SpadeIcon,
} from 'lucide-react'
import { toast } from 'sonner'

export const Route = createFileRoute('/_authenticated/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  const { queryClient, user, isAdmin } = Route.useRouteContext()
  const navigate = Route.useNavigate()

  // TODO: Đổi mật khẩu
  // TODO: Quên mật khẩu
  // TODO: Xóa tài khoản và toàn bộ thông tin liên quan
  // TODO: Xác thực email nếu chưa
  // TODO: Chỉnh sửa profile (name, image)

  const onSignOut = () =>
    authClient.signOut({
      fetchOptions: {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: sessionQueryOptions.queryKey,
          })
          navigate({ to: '/' })
          toast.success('Đăng xuất thành công!')
        },
      },
    })

  return (
    <div className="md:h-screen flex items-center justify-center">
      <div className="relative flex flex-col p-4 md:p-10 md:border rounded-md w-full md:w-fit">
        <div className="md:absolute top-0 left-0 md:-translate-y-1/2 flex justify-between">
          <div className="flex gap-x-2">
            <Link to=".." className={buttonVariants()}>
              Quay lại trang chủ
            </Link>
            <ModeToggle />
          </div>

          <div className="flex md:hidden gap-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary">Tính năng</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Đổi mật khẩu</DropdownMenuItem>
                <DropdownMenuItem>Quên mật khẩu</DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem variant="destructive" disabled>
                  Xóa tài khoản
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={onSignOut}>
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="md:flex hidden absolute bottom-0 left-0 w-full translate-y-1/2 gap-x-2">
          <Button variant="destructive" className="mr-auto" disabled>
            Xóa tài khoản
          </Button>

          <Button variant="secondary">Đổi mật khẩu</Button>
          <Button variant="secondary">Quên mật khẩu</Button>
          <Button variant="default" onClick={onSignOut}>
            Đăng xuất
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-10 md:h-40 mt-4 md:mt-0">
          <div className="relative md:size-40">
            <Avatar className="size-full rounded-lg">
              <AvatarImage
                src={user.image ?? 'https://api.dicebear.com/10.x/planets/svg'}
              />
              <AvatarFallback>{user.name}</AvatarFallback>
            </Avatar>
            <Badge
              variant={user.emailVerified ? 'success' : 'destructive'}
              className="absolute bottom-0 right-0"
            >
              {user.emailVerified ? (
                <>
                  {' '}
                  <ShieldCheckIcon /> Đã xác thực{' '}
                </>
              ) : (
                <>
                  {' '}
                  <ShieldBanIcon /> Chưa xác thực{' '}
                </>
              )}
            </Badge>
          </div>

          <div className="h-full flex flex-col gap-y-2">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xl font-semibold text-primary uppercase">
                  {' '}
                  {user.name}{' '}
                </p>
                <p> {user.email} </p>
              </div>
              <Badge>
                {isAdmin ? (
                  <>
                    {' '}
                    <SpadeIcon /> Quản lý{' '}
                  </>
                ) : (
                  <>
                    {' '}
                    <CarrotIcon /> Khách hàng{' '}
                  </>
                )}
              </Badge>
            </div>

            <div className="flex gap-x-6 gap-y-2 flex-col md:flex-row mt-auto md:text-center text-sm">
              <div>
                <p>Ngày tạo tài khoản</p>
                {format(new Date(user.createdAt), 'dd/MM/yyyy HH:mm:ss')}
              </div>

              <div>
                <p>Lần cuối chỉnh sửa</p>
                {format(new Date(user.updatedAt), 'dd/MM/yyyy HH:mm:ss')}
              </div>
            </div>
          </div>
        </div>

        {/* FIX: Tạm để cho đẹp, sau này sẽ thay đúng tính năng phù hợp */}
        <div
          className="flex-1 bg-muted rounded-md mt-7 p-4 grid grid-cols-2 md:grid-cols-3 gap-4 
        *:flex-col *:h-auto *:w-full *:text-base *:rounded-lg *:py-2.5
         [&>span]:text-sm [&>span>p]:font-semibold
         "
        >
          <Badge variant="default">
            Đơn hàng
            <p> 2 </p>
          </Badge>
          <Badge variant="warning">
            Đang giao
            <p> 0 </p>
          </Badge>
          <Badge variant="destructive">
            Đã hủy
            <p> 0 </p>
          </Badge>
          <Badge variant="success">
            {' '}
            Tổng tiền
            <p> 250.000 VNĐ </p>
          </Badge>
          <Badge variant="invert">
            Tiết kiệm
            <p> 50.000 VNĐ </p>
          </Badge>
          <Badge variant="info">
            Đã chi
            <p> 200.000 VNĐ </p>
          </Badge>
        </div>
      </div>
    </div>
  )
}
