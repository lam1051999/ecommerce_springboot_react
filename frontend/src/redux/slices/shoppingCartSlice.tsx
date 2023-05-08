import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductsEntity, ShoppingCart } from "../types/types";

const initialState: ShoppingCart = {
  cartItems: [],
};

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    addCartProduct: {
      reducer: (state, action: PayloadAction<ProductsEntity>) => {
        const cartIndex = state.cartItems.findIndex(
          (item) => item.products_entity.id === action.payload.id
        );
        if (cartIndex >= 0) {
          state.cartItems[cartIndex].quantity += 1;
        } else {
          const tempProduct = {
            products_entity: { ...action.payload },
            quantity: 1,
          };
          state.cartItems.push(tempProduct);
        }
      },
      prepare: (actionData: ProductsEntity) => {
        return { payload: actionData };
      },
    },
    getCartProducts: (state) => {
      return {
        ...state,
      };
    },
    removeCartItem: {
      reducer: (state, action: PayloadAction<string>) => {
        const index = state.cartItems.findIndex(
          (item) => item.products_entity.id === action.payload
        );
        if (index !== -1) {
          state.cartItems.splice(index, 1);
        }
      },
      prepare: (actionData: string) => {
        return { payload: actionData };
      },
    },
    increment: {
      reducer: (state, action: PayloadAction<string>) => {
        const index = state.cartItems.findIndex(
          (item) => item.products_entity.id === action.payload
        );
        state.cartItems[index].quantity += 1;
      },
      prepare: (actionData: string) => {
        return { payload: actionData };
      },
    },
    decrement: {
      reducer: (state, action: PayloadAction<string>) => {
        const index = state.cartItems.findIndex(
          (item) => item.products_entity.id === action.payload
        );
        if (state.cartItems[index].quantity >= 2) {
          state.cartItems[index].quantity -= 1;
        } else {
          state.cartItems.splice(index, 1);
        }
      },
      prepare: (actionData: string) => {
        return { payload: actionData };
      },
    },
    resetCart: (state) => {
      state.cartItems = initialState.cartItems;
    },
  },
});

export const {
  addCartProduct,
  decrement,
  getCartProducts,
  increment,
  removeCartItem,
  resetCart,
} = shoppingCartSlice.actions;
export default shoppingCartSlice;
