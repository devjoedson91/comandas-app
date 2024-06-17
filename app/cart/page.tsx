"use client";
import Header from "@/components/ui/header";
import useCart from "@/hooks/useCart";
import CartItem from "./components/cart-item";

export default function Cart() {
  const { cart } = useCart();

  return (
    <>
      <Header />
      <div className="p-5">
        <div className="flex flex-col gap-4">
          {cart.map((item) => {
            return <CartItem key={item.id} item={item} />;
          })}
        </div>
      </div>
    </>
  );
}
