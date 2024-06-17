"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, LogOut, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import useCart from "@/hooks/useCart";

interface HeaderProps {
  pathname: string;
}

export default function Header({ pathname }: HeaderProps) {
  const router = useRouter();

  const { cart } = useCart();

  const { signOut } = useAuth();

  function handleButtonClick() {
    if (pathname === "/menu") {
      signOut();
    } else {
      router.back();
    }
  }

  return (
    <div className="flex items-center px-4 justify-between border-b w-full h-24 border-gray100">
      <Button
        size="icon"
        className="bg-transparent hover:bg-transparent border-none"
        onClick={handleButtonClick}
      >
        {pathname === "/menu" ? (
          <LogOut color="#ff3f4b" size={28} />
        ) : (
          <ChevronLeft size={28} />
        )}
      </Button>
      <Image src={Logo} alt="Logo" width={0} height={0} className="w-44" />
      <Button
        size="icon"
        className="bg-transparent hover:bg-transparent border-none relative"
      >
        {cart.length > 0 && (
          <div className="flex items-center justify-center bg-red500 w-5 h-5 rounded-xl absolute -bottom-[2px] -left-1">
            <span className="text-xs text-white font-bold">{cart.length}</span>
          </div>
        )}
        <ShoppingCart size={28} />
      </Button>
    </div>
  );
}
