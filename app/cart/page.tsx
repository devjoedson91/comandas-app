"use client";
import { useState } from "react";
import Header from "@/components/ui/header";
import useCart from "@/hooks/useCart";
import CartItem from "./components/cart-item";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/utils/format";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { api } from "@/services/apiClient";
import { useToast } from "@/components/ui/use-toast";

export default function Cart() {
  const { cart } = useCart();

  const { toast } = useToast();

  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);

  const total = formatPrice(
    cart.reduce((sumTotal, product) => {
      return (sumTotal += product.amount * Number(product.price));
    }, 0)
  );

  const router = useRouter();

  function handleReturnToMenu() {
    router.push("/menu");
  }

  async function handleOpenOrder() {
    try {
      setLoading(true);

      const order_response = await api.post("/order", {
        table: 1,
        delivery: false,
        name,
      });

      Promise.all(
        cart.map(async (item) => {
          await api.post("/order/add", {
            order_id: order_response.data.id,
            product_id: item.id,
            amount: Number(item.amount),
          });
        })
      );

      router.push(`/print?order_id=${order_response.data.id}`);
    } catch (error) {
      toast({
        description:
          "Houve um problema ao criar pedido, tente novamente ou contate o suporte",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
          <Dialog>
            <DialogTrigger>
              <Button className="bg-mainGreen text-lg w-full hover:bg-mainGreen/60">
                Finalizar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Deseja informar o nome do cliente?</DialogTitle>
              </DialogHeader>
              <div className="w-full flex gap-4 items-center justify-around">
                <DialogClose asChild>
                  <Dialog>
                    <DialogTrigger>
                      <Button className="bg-mainGreen hover:bg-mainGreen/60 text-white font-medium text-base">
                        Sim
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <Input
                        className="w-full font-semibold"
                        placeholder="Nome do cliente"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                      />
                      <DialogClose asChild>
                        <Button
                          className="bg-mainGreen hover:bg-mainGreen/60 text-white font-medium text-base"
                          variant="outline"
                          onClick={handleOpenOrder}
                          disabled={name.length < 3 || loading}
                        >
                          Gerar comanda
                        </Button>
                      </DialogClose>
                    </DialogContent>
                  </Dialog>
                </DialogClose>

                <DialogClose asChild>
                  <Button
                    className="bg-yelowDescription hover:bg-yelowDescription/60 text-white font-medium text-base"
                    onClick={handleOpenOrder}
                  >
                    Não
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
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
