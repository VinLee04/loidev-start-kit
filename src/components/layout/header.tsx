import { sessionQueryOptions } from '#/features/auth/server/session.ts'
import { authClient } from '#/lib/auth-client.ts'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { buttonVariants } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ModeToggle } from '@/components/ui/mode-toggle'
import type { Theme } from '@/components/ui/theme-provider'
import { useTheme } from '@/components/ui/theme-provider'
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import {
  LogOutIcon,
  MonitorIcon,
  MoonIcon,
  PaletteIcon,
  SunIcon,
  UsersIcon,
} from 'lucide-react'
import { toast } from 'sonner'

const Logo = () => {
  return (
    <a href="https://vinhloi.tech">
      <img src="/logo.png" className="size-10 shadow rounded-sm" />
    </a>
  )
}

const Header = () => {
  const { data: session } = useSuspenseQuery(sessionQueryOptions)
  const { theme, setTheme } = useTheme()
  const queryClient = useQueryClient()

  return (
    <header className="fixed inset-x-0">
      <div className="flex py-2 h-16 items-center w-full bg-background px-4 sm:px-10 gap-x-7 border-b shadow">
        <Logo />

        <div className="ml-auto space-x-2 flex items-center">
          {session.user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <Avatar className="rounded-md size-10">
                    <AvatarImage
                      src={
                        session.user.image ??
                        'https://api.dicebear.com/10.x/planets/svg'
                      }
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel className="flex gap-x-4">
                    <Avatar className="rounded-md size-10">
                      <AvatarImage
                        src={
                          session.user.image ??
                          'https://api.dicebear.com/10.x/planets/svg'
                        }
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="font-semibold text-primary">
                        {' '}
                        {session.user.name}{' '}
                      </span>
                      <p className="text-sm italic">{session.user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">
                      <UsersIcon className="text-inherit" />
                      Profile
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <PaletteIcon className="text-inherit" />
                      Theme
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuGroup>
                          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                          <DropdownMenuRadioGroup
                            value={theme}
                            onValueChange={(value) => setTheme(value as Theme)}
                          >
                            <DropdownMenuRadioItem value="light" check>
                              <SunIcon />
                              Light
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="dark" check>
                              <MoonIcon />
                              Dark
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="system" check>
                              <MonitorIcon />
                              System
                            </DropdownMenuRadioItem>
                          </DropdownMenuRadioGroup>
                        </DropdownMenuGroup>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>

                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() =>
                        void authClient.signOut({
                          fetchOptions: {
                            onSuccess: async () => {
                              await queryClient.invalidateQueries({
                                queryKey: sessionQueryOptions.queryKey,
                              })
                              toast.success('Sign out successfully!')
                            },
                          },
                        })
                      }
                    >
                      <LogOutIcon />
                      Sign Out
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <ModeToggle />
              <Link to="/sign-in" className={buttonVariants()}>
                Sign In
              </Link>
              <Link
                to="/sign-up"
                className={buttonVariants({ variant: 'secondary' })}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
