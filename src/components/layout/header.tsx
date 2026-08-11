import { authClient } from "#/lib/auth-client.ts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
} from "@/components/ui/dropdown-menu";
import { Link } from "@tanstack/react-router";
import { CalendarIcon, LogOutIcon, MonitorIcon, MoonIcon, PaletteIcon, SunIcon, UsersIcon, ZapIcon } from "lucide-react";
import { buttonVariants } from "../ui/button";
import { useTheme, type Theme } from "../ui/theme-provider";

const Header = () => {
  const { data: session, isPending } = authClient.useSession();
  const { theme, setTheme } = useTheme()


  const logout = async () => {
    await authClient.signOut({
      // fetchOptions: {
      //   onSuccess: () => {
      //     navigate({ to: "/sign-in" });
      //   },
      // },
    });
  }

  return (
    <header className="fixed inset-x-0">
      <div className="flex py-2 h-16 items-center w-full bg-background px-10 gap-x-7 border">

        <ZapIcon />

        <nav className="space-x-2">
          <Link to=".">Sản Phẩm</Link>
          <Link to=".">Trang Chủ</Link>
          <Link to=".">Giới Thiệu</Link>
        </nav>

        <div className="ml-auto space-x-2 flex items-center">
          {session && session.user ?
            (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <Avatar className="rounded-md size-10">
                      <AvatarImage src={session.user.image ?? ''} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel className="flex gap-x-4">
                      <Avatar className="rounded-md size-10">
                        <AvatarImage src={session.user.image ?? ''} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="font-semibold text-primary"> {session.user.name} </span>
                        <p className="text-sm italic">{session.user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><UsersIcon className="text-inherit" />Thông tin cá nhân</DropdownMenuItem>
                    <DropdownMenuItem> <CalendarIcon className="text-inherit" /> Lịch sử mua hàng </DropdownMenuItem>

                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <PaletteIcon className="text-inherit" />
                        Chủ đề
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuGroup>
                            <DropdownMenuLabel>Giao diện</DropdownMenuLabel>
                            <DropdownMenuRadioGroup
                              value={theme}
                              onValueChange={(value) => setTheme(value as Theme)}
                            >
                              <DropdownMenuRadioItem value="light" check>
                                <SunIcon />
                                Sáng
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="dark" check>
                                <MoonIcon />
                                Tối
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="system" check>
                                <MonitorIcon />
                                Hệ thống
                              </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                          </DropdownMenuGroup>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>


                    <DropdownMenuSeparator />

                    <DropdownMenuGroup>
                      <DropdownMenuItem variant="destructive" onClick={logout}>
                        <LogOutIcon />
                        Sign Out
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>


                  </DropdownMenuContent>


                </DropdownMenu>
              </>
            )
            :
            (
              <>
                <Link to="/sign-in" className={buttonVariants()}>Đăng Nhập</Link>
                <Link to="/sign-up" className={buttonVariants({ variant: 'secondary' })}>Đăng Ký</Link>
              </>
            )
          }
        </div>

      </div>
    </header>
  )
}

export default Header