"use client";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Auth } from "@/hooks/auth";
import { LogOut, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import { CartContext } from "@/hooks/cart";

export default function MenuHeader() {
  const { cart } = useContext(CartContext);

  const { signOut } = useContext(Auth);
  return (
    <div className="flex items-center px-4 justify-between border-b w-full h-24 border-gray100">
      <Button
        variant="outline"
        size="icon"
        className="bg-transparent border-none"
        onClick={() => signOut()}
      >
        <LogOut color="#ff3f4b" />
      </Button>
      <Image src={Logo} alt="Logo" width={0} height={0} className="w-32" />
      <Button
        variant="outline"
        size="icon"
        className="bg-transparent border-none relative"
      >
        {cart.length > 0 && (
          <div className="flex items-center justify-center bg-red500 w-5 h-5 rounded-xl absolute -bottom-[2px] -left-1">
            <span className="text-xs text-white font-bold">{cart.length}</span>
          </div>
        )}
        <ShoppingCart />
      </Button>
    </div>
  );
}
