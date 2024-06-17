import { Product, UpdateProductAmount } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartStateData {
  cart: Product[];
  // addItemCart?: (productId: string) => Promise<void>;
  // removeItemCart?: (productId: string) => void;
  // updateProductAmount?: ({ productId, amount }: UpdateProductAmount) => void;
  // removeCart?: () => void;
}

const storagedCart = localStorage.getItem("@comanda:cart");

const initialState: CartStateData = {
  cart: storagedCart ? JSON.parse(storagedCart) : [],
};

export const cartSlice = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addItemCart(state, action: PayloadAction<Product>) {
      const newProduct = action.payload;

      const productExists = state.cart.find(
        (item) => item.id === newProduct.id
      );

      if (productExists) {
        productExists.amount++;

        productExists.total += Number(newProduct.price);

        return;
      }

      state.cart.push({
        ...newProduct,
        amount: 1,
        total: Number(newProduct.price),
      });
    },
    removeItemCart(state, action: PayloadAction<string>) {
      const product_id = action.payload;

      const productExists = state.cart.find((item) => item.id === product_id);

      if (productExists) {
        if (productExists.amount === 1) {
          state.cart = state.cart.filter((item) => item.id !== product_id);
        } else {
          productExists.amount--;
          productExists.total -= Number(productExists.price);
        }
      }
    },
  },
});

export const { addItemCart, removeItemCart } = cartSlice.actions;

export default cartSlice.reducer;
