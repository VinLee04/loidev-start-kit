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
          toast.success('Signed out successfully!')
        },
      },
    })

  return (
    <div className="md:h-screen flex items-center justify-center">
      <div className="relative flex flex-col p-4 md:p-10 md:border rounded-md w-full md:w-fit">
        <div className="md:absolute top-0 left-0 md:-translate-y-1/2 flex justify-between">
          <div className="flex gap-x-2">
            <Link to=".." className={buttonVariants()}>
              Back to Home
            </Link>
            <ModeToggle />
          </div>

          <div className="flex md:hidden gap-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary">Features</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Change Password</DropdownMenuItem>
                <DropdownMenuItem>Forgot Password</DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem variant="destructive" disabled>
                  Delete Account
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={onSignOut}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="md:flex hidden absolute bottom-0 left-0 w-full translate-y-1/2 gap-x-2">
          <Button variant="destructive" className="mr-auto" disabled>
            Delete Account
          </Button>

          <Button variant="secondary">Change Password</Button>
          <Button variant="secondary">Forgot Password</Button>
          <Button variant="default" onClick={onSignOut}>
            Sign Out
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
                  <ShieldCheckIcon /> Verified{' '}
                </>
              ) : (
                <>
                  {' '}
                  <ShieldBanIcon /> Not Verified{' '}
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
                    <SpadeIcon /> Admin{' '}
                  </>
                ) : (
                  <>
                    {' '}
                    <CarrotIcon /> User{' '}
                  </>
                )}
              </Badge>
            </div>

            <div className="flex gap-x-6 gap-y-2 flex-col md:flex-row mt-auto md:text-center text-sm">
              <div>
                <p>Account Created</p>
                {format(new Date(user.createdAt), 'dd/MM/yyyy HH:mm:ss')}
              </div>

              <div>
                <p>Last Modified</p>
                {format(new Date(user.updatedAt), 'dd/MM/yyyy HH:mm:ss')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
