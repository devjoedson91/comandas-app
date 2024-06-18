import { useEffect, useRef } from "react";
import { AppDispatch, RootState } from "@/store";
import {
  addItemCart,
  remove,
  removeItemCart,
} from "@/store/reducers/cartReducer";
import { Product } from "@/types";
import { useDispatch, useSelector } from "react-redux";

export default function useCart() {
  const dispatch: AppDispatch = useDispatch();

  const cart = useSelector((state: RootState) => state.cartReducer.cart);

  const prevCartRef = useRef<Product[]>();

  useEffect(() => {
    prevCartRef.current = cart;
  });

  const cartPreviousValue = prevCartRef.current ?? cart;

  useEffect(() => {
    if (cartPreviousValue !== cart) {
      localStorage.setItem("@comanda:cart", JSON.stringify(cart));
    }
  }, [cart, cartPreviousValue]);

  function addToCart(item: Product) {
    dispatch(addItemCart(item));
  }

  function removeFromCart(product_id: string) {
    dispatch(removeItemCart(product_id));
  }

  function removeCart() {
    dispatch(remove());
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    removeCart,
  };
}
