"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Product } from "@/types";
import { api } from "@/services/apiClient";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import Header from "@/components/ui/header";
import useCart from "@/hooks/useCart";
import Loading from "@/components/ui/loading";

export default function Order() {
  const searchParams = useSearchParams();

  const { cart, addToCart, removeFromCart } = useCart();

  const product_id = searchParams.get("product_id");

  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState<Product>();

  const productExists = cart.find((product) => product.id === product_id);

  async function loadProduct() {
    setLoading(true);
    const response = await api.get("/product", {
      params: {
        product_id: product_id,
      },
    });

    setLoading(false);
    setProduct(response.data);
  }

  useEffect(() => {
    product_id && loadProduct();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product_id]);

  function handleAddItemCart() {
    addToCart(product as Product);
  }

  function handleRemoveItemCart(product: Product) {
    removeFromCart(product.id);
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  if (!product) return null;

  return (
    <>
      <Header />
      <div className="p-6 flex flex-col gap-4">
        <div className="relative w-full h-44">
          <Image
            src={product.banner}
            alt={product.name}
            layout="fill"
            className="rounded-lg"
            objectFit="cover"
          />
        </div>
        <h1 className="font-bold text-xl">{product.name}</h1>
        <p className="font-medium text-zinc800 text-base">
          {product.description}
        </p>

        <div className="w-full h-24 border-t border-t-secondary flex justify-around items-center">
          <div className="flex items-center justify-evenly rounded-lg border border-secondary w-40 h-12">
            <button
              onClick={() => handleRemoveItemCart(productExists as Product)}
              disabled={
                (productExists?.amount as number) === 0 || !productExists
              }
            >
              <Minus size={22} color="#979797" />
            </button>
            <h1 className="text-base text-yelowDescription font-bold">
              {productExists ? productExists.amount : 0}
            </h1>
            <button onClick={handleAddItemCart}>
              <Plus size={22} color="#979797" />
            </button>
          </div>
          <Button
            className="rounded-lg bg-bgButton hover:bg-bgButton/60 flex justify-center px-3 items-center w-40 h-12"
            onClick={handleAddItemCart}
          >
            <h1 className="font-bold text-base">Adicionar</h1>
          </Button>
        </div>
      </div>
    </>
  );
}
