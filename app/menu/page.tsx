"use client";
import { useEffect, useState } from "react";
import CategoryButton from "./components/category-button";
import MenuHeader from "./components/menu-header";
import { CategoryProps, ProductProps } from "@/types";
import { api } from "@/services/apiClient";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils/format";

export default function Menu() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState<CategoryProps[]>([]);

  const [categorySelected, setCategorySelected] = useState<
    CategoryProps | undefined
  >();

  const [products, setProducts] = useState<ProductProps[] | []>([]);

  const [productSelected, setProductSelected] = useState<
    ProductProps | undefined
  >();

  useEffect(() => {
    loadCategories();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorySelected]);

  async function loadCategories() {
    try {
      setLoading(true);

      const response = await api.get("/category");

      setCategory(response.data);
      setCategorySelected(response.data[0]);
    } catch (error: any) {
      toast({
        description: "Não foi possível carregar suas categorias",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function loadProducts() {
    try {
      setLoading(true);
      const response = await api.get("/category/product", {
        params: { category_id: categorySelected?.id },
      });

      setProducts(response.data);
      setProductSelected(response.data[0]);
    } catch (error: any) {
      toast({
        description: "Ocorreu um erro ao carregar os produtos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  function handleChangeCategory(item: CategoryProps) {
    setCategorySelected(item);
  }

  return (
    <div>
      <MenuHeader />
      <div className="p-6 flex flex-col gap-7">
        <h1 className="font-base text-base font-semibold">Categorias</h1>
        <div className="flex w-full gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {category.map((item) => {
            return (
              <CategoryButton
                key={item.id}
                title={item.name}
                action={() => handleChangeCategory(item)}
                selected={categorySelected?.id === item.id}
              />
            );
          })}
        </div>
        {products.map((product) => {
          return (
            <Button
              key={product.id}
              className="w-full min-h-40 border-b border-bgPages flex justify-between py-1 px-4"
              variant="outline"
            >
              <div className="flex flex-col gap-2 max-w-[60%]">
                <h1 className="overflow-hidden text-defaultText text-start text-ellipsis whitespace-nowrap text-base font-semibold">
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
        })}
      </div>
    </div>
  );
}
