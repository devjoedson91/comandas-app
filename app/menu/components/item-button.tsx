import { Button } from "@/components/ui/button";
import { ProductProps } from "@/types";
import { formatPrice } from "@/utils/format";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ItemButtonProps {
  product: ProductProps;
}

export default function ItemButton({ product }: ItemButtonProps) {
  const router = useRouter();

  function navigateToOpenOrder(product_id: string) {
    router.push(`/order?product_id=${product_id}`);
  }

  return (
    <Button
      className="w-full min-h-40 flex justify-between py-1 px-4 bg-secondary hover:bg-bgPages"
      onClick={() => navigateToOpenOrder(product.id)}
    >
      <div className="flex flex-col gap-2 max-w-[60%]">
        <h1 className="overflow-hidden text-start text-ellipsis whitespace-nowrap text-base font-semibold">
          {product.name}
        </h1>
        <p className="text-zinc800 overflow-hidden text-ellipsis whitespace-nowrap text-sm">
          {product.description}
        </p>
        <span className="text-start text-base text-yelowDescription font-semibold">
          {formatPrice(Number(product.price))}
        </span>
      </div>
      <Image
        src={product.banner}
        alt={product.name}
        width={100}
        height={100}
        className="rounded"
      />
    </Button>
  );
}
