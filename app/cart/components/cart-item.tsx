import { Card, CardContent } from "@/components/ui/card";
import { useCartReducer } from "@/store/reducers/cartReducer/useCartReducer";
import { Product } from "@/types";
import { formatPrice } from "@/utils/format";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";

interface CardItemProps {
  item: Product;
}

export default function CartItem({ item }: CardItemProps) {
  const { addToCart, removeFromCart } = useCartReducer();

  function handleRemoveItemCart() {
    removeFromCart(item.id);
  }

  function handleAddItemCart() {
    addToCart(item);
  }

  return (
    <Card className="bg-secondary border-none">
      <CardContent className="py-3 px-4 w-full flex items-center justify-between">
        <Image
          src={item.banner}
          alt={item.name}
          width={0}
          height={0}
          sizes="100vw"
          className="w-32 h-32 rounded"
          objectFit="cover"
        />
        <div className="flex flex-col w-36 gap-4">
          <div className="flex flex-col gap-4">
            <h1 className="text-base text-white font-medium">{item.name}</h1>
            <p className="text-yelowDescription text-base font-medium">
              {formatPrice(item.total)}
            </p>
          </div>
          <div className="border p-2 border-zinc800 rounded-md flex items-center justify-between">
            <button
              onClick={() => handleRemoveItemCart()}
              disabled={(item.amount as number) === 0 || !item}
            >
              <Minus size={22} color="#979797" />
            </button>
            <h1 className="font-bold text-base text-yelowDescription">
              {item.amount}
            </h1>
            <button onClick={() => handleAddItemCart()}>
              <Plus size={22} color="#979797" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
