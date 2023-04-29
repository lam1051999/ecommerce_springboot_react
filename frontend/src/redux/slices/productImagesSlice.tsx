import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductImagesState } from "../types/types";

const initialState: ProductImagesState = {
  color: "#fff",
  list_images: [],
  showcase_image: "",
};

export const productImagesSlice = createSlice({
  name: "productImages",
  initialState,
  reducers: {
    onChangeProductColor: {
      reducer: (state, action: PayloadAction<ProductImagesState>) => {
        state.color = action.payload.color;
        state.list_images = action.payload.list_images;
        state.showcase_image = action.payload.showcase_image;
      },
      prepare: (actionData: ProductImagesState) => {
        return { payload: actionData };
      },
    },
    onChangeShowcaseImage: {
      reducer: (state, action: PayloadAction<string>) => {
        state.showcase_image = action.payload;
      },
      prepare: (actionData: string) => {
        return { payload: actionData };
      },
    },
  },
});

export const { onChangeProductColor, onChangeShowcaseImage } =
  productImagesSlice.actions;
export default productImagesSlice;
