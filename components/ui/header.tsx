"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, LogOut, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import useAuth from "@/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import useCart from "@/hooks/useCart";
import { twMerge } from "tailwind-merge";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

export default function Header() {
  const router = useRouter();

  const { cart, removeCart } = useCart();

  const pathname = usePathname();

  const { signOut } = useAuth();

  function handleButtonClick() {
    if (pathname === "/menu") {
      signOut();
    } else {
      router.back();
    }
  }

  function handleNavigateToCart() {
    router.push("/cart");
  }

  function handleRemoveCart() {
    removeCart();
  }

  return (
    <div className="flex items-center px-4 justify-between border-b w-full h-24 border-gray100">
      <Button
        size="icon"
        className="bg-transparent hover:bg-transparent border-none"
        onClick={handleButtonClick}
      >
        {pathname === "/menu" ? (
          <LogOut color="#ff3f4b" size={30} />
        ) : (
          <ChevronLeft size={30} />
        )}
      </Button>

      {pathname === "/cart" ? (
        <h1 className="text-xl font-bold">Comanda</h1>
      ) : (
        <Image
          src={Logo}
          alt="Logo"
          width={120}
          height={120}
          className="drop-shadow-3xl"
        />
      )}

      {pathname === "/cart" ? (
        <Dialog>
          <DialogTrigger
            className={twMerge(
              "bg-transparent hover:bg-transparent relative hidden",
              cart.length && "block"
            )}
          >
            <Trash2 size={30} color="#D73A21" />
          </DialogTrigger>
          <DialogContent className="flex flex-col gap-8">
            <DialogHeader>
              <DialogTitle>Deseja realmente excluir sua comanda?</DialogTitle>
            </DialogHeader>
            <div className="w-full flex justify-around items-center">
              <DialogClose asChild>
                <Button
                  className="bg-mainGreen hover:bg-mainGreen/60 text-white font-medium text-base"
                  onClick={handleRemoveCart}
                >
                  Sim
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button className="bg-red500 hover:bg-red500/60 text-white font-medium text-base">
                  Voltar
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Button
          size="icon"
          className="bg-transparent hover:bg-transparent relative"
          onClick={handleNavigateToCart}
        >
          {cart.length > 0 && (
            <div className="flex items-center justify-center bg-red500 w-5 h-5 rounded-xl absolute -bottom-[2px] -left-1">
              <p className="text-xs text-white font-bold">{cart.length}</p>
            </div>
          )}
          <ShoppingCart size={30} />
        </Button>
      )}
    </div>
  );
}
