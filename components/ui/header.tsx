"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, LogOut, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
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

  const { cart, remove } = useCart();

  const { signOut } = useAuth();

  function handleButtonClick() {
    if (window.location.pathname === "/menu") {
      signOut();
    } else {
      router.back();
    }
  }

  function handleNavigateToCart() {
    router.push("/cart");
  }

  function handleRemoveCart() {
    remove();
  }

  return (
    <div className="flex items-center px-4 justify-between border-b w-full h-24 border-gray100">
      <Button
        size="icon"
        className="bg-transparent hover:bg-transparent border-none"
        onClick={handleButtonClick}
      >
        {window.location.pathname === "/menu" ? (
          <LogOut color="#ff3f4b" size={30} />
        ) : (
          <ChevronLeft size={30} />
        )}
      </Button>
      {window.location.pathname === "/cart" ? (
        <h1 className="text-xl font-bold">Comanda</h1>
      ) : (
        <Image src={Logo} alt="Logo" width={0} height={0} className="w-44" />
      )}
      {window.location.pathname === "/cart" ? (
        <Dialog>
          <DialogTrigger
            className={twMerge(
              "bg-transparent hover:bg-transparent relative hidden",
              cart.length && "block"
            )}
          >
            <Trash2 size={30} color="#D73A21" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Deseja realmente excluir sua comanda?</DialogTitle>
            </DialogHeader>
            <div className="w-full flex justify-around items-center">
              <DialogClose asChild>
                <Button
                  className="bg-mainGreen hover:bg-mainGreen/60 text-white font-medium text-base"
                  variant="outline"
                  onClick={handleRemoveCart}
                >
                  Sim
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  className="bg-yelowDescription hover:bg-yelowDescription/60 text-white font-medium text-base"
                  variant="outline"
                >
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
              <span className="text-xs text-white font-bold">
                {cart.length}
              </span>
            </div>
          )}
          <ShoppingCart size={28} />
        </Button>
      )}
    </div>
  );
}
