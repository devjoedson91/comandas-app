"use client";
import { useEffect, useRef, useState } from "react";
import { OrderDetailsProps } from "@/types";
import { useRouter } from "next/navigation";
import { api } from "@/services/apiClient";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loading from "@/components/ui/loading";
import { formatPrice } from "@/utils/format";
import { useToast } from "@/components/ui/use-toast";
import { useUserReducer } from "@/store/reducers/userReducer/useUserReducer";
import { useCartReducer } from "@/store/reducers/cartReducer/useCartReducer";

type PrintProps = {
  params: {
    order_id: string;
  };
};

export default function Print({ params }: PrintProps) {
  const { user } = useUserReducer();

  const { toast } = useToast();

  const { cart, removeCart } = useCartReducer();

  const [items, setItems] = useState<OrderDetailsProps[]>([]);

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");

  const [createdAt, setCreatedAt] = useState(Date.now());

  const comandaRef = useRef(null);

  const router = useRouter();

  const total = formatPrice(
    cart.reduce((sumTotal, product) => {
      return (sumTotal += product.amount * Number(product.price));
    }, 0)
  );

  useEffect(() => {
    async function orderDetails() {
      try {
        setLoading(true);

        const response = await api.get(
          `/order/detail?order_id=${params.order_id}`
        );

        console.log(response.data);

        setItems(response.data);

        setName(response.data[0].order.name);

        setCreatedAt(response.data[0].order.created_at);
      } catch (error) {
        toast({
          description: "Falha ao gerar a comanda",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    params.order_id && orderDetails();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleRemoveOrder() {
    setLoading(true);

    await api.delete("/order", {
      params: {
        order_id: params.order_id,
      },
    });

    localStorage.removeItem("@comanda:cart");

    removeCart();

    router.push("/menu");
  }

  const handlePrint = useReactToPrint({
    content: () => comandaRef.current,
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="p-5 flex flex-col gap-10 relative mi-h-screen">
      <Card ref={comandaRef} className="bg-yellow-100">
        <CardHeader>
          <CardTitle className="text-center text-lg">Comanda</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <p>
            <strong>Data: </strong>
            {new Date(createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Cliente: </strong> {!name ? "Não informado" : name}
          </p>
          <p>
            <strong>Operador: </strong> {user?.name}
          </p>
          <div className="w-full flex justify-between items-center">
            <p className="font-bold">Itens</p>
            <p className="font-bold">Preço</p>
          </div>
          <div className="flex flex-col gap-1">
            {items.map((item) => {
              return (
                <div
                  key={item.id}
                  className="w-full items-center justify-between flex"
                >
                  <p>{`${item.amount}x ${item.product.name}`}</p>
                  <p>{formatPrice(item.amount * Number(item.product.price))}</p>
                </div>
              );
            })}
          </div>
          <div className="w-full flex justify-between items-center">
            <p className="font-bold">Total:</p>
            <p className="font-bold">{total}</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center w-full justify-between gap-10">
        <Button
          className="w-full bg-mainGreen hover:bg-mainGreen rounded-md"
          onClick={handlePrint}
        >
          Imprimir
        </Button>
        <Button
          className="w-full bg-red500 hover:bg-red500/60 rounded-md"
          onClick={handleRemoveOrder}
          disabled={loading}
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
}
