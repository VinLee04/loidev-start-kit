import { authClient } from "#/lib/auth-client.ts";
import { Link } from "@tanstack/react-router";
import { ZapIcon } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";

const Header = () => {

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
          <Link to="/sign-in" className={buttonVariants()}>Đăng Nhập</Link>
          <Link to="/sign-up" className={buttonVariants({ variant: 'secondary' })}>Đăng Ký</Link>
          <Button variant='destructive' onClick={logout}>Đăng Xuất`</Button>
        </div>

      </div>
    </header>
  )
}

export default Header