"use client";
import Header from "@/components/ui/header";
import useCart from "@/hooks/useCart";
import CartItem from "./components/cart-item";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/utils/format";

export default function Cart() {
  const { cart } = useCart();

  const total = formatPrice(
    cart.reduce((sumTotal, product) => {
      return (sumTotal += product.amount * Number(product.price));
    }, 0)
  );

  const router = useRouter();

  function handleReturnToMenu() {
    router.push("/menu");
  }

  return (
    <>
      <Header />
      {cart.length ? (
        <div className="p-5 flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            {cart.map((item) => {
              return <CartItem key={item.id} item={item} />;
            })}
          </div>
          <div className="w-full flex items-center justify-between">
            <h1 className="font-bold">Total:</h1>
            <h1 className="text-lg font-bold">{total}</h1>
          </div>
          <Button
            className="bg-mainGreen text-lg w-full hover:bg-mainGreen/60"
            onClick={handleReturnToMenu}
          >
            Finalizar pedido
          </Button>
        </div>
      ) : (
        <div className="flex items-center flex-col p-5 gap-8 justify-center h-[500px]">
          <h1 className="text-center font-medium">
            Sua comanda está vazia, retorne ao menu para adicionar seus itens
          </h1>
          <Button
            className="bg-mainGreen text-lg w-full hover:bg-mainGreen/60"
            onClick={handleReturnToMenu}
          >
            Ir para o menu
          </Button>
        </div>
      )}
    </>
  );
}
