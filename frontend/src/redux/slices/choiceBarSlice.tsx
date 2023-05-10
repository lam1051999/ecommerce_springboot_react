import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChoiceBarState, ProductType } from "../types/types";

const initialState: ChoiceBarState = {
  productType: ProductType.IPHONE,
  productSubType: null,
  sortType: "RANDOM",
  page: 0,
  numPage: 16,
};

export const choiceBarSlice = createSlice({
  name: "choiceBar",
  initialState,
  reducers: {
    onChangeProductType: {
      reducer: (state, action: PayloadAction<ProductType>) => {
        state.productType = action.payload;
      },
      prepare: (actionData: ProductType) => {
        return { payload: actionData };
      },
    },
    onChangeProductSubType: {
      reducer: (state, action: PayloadAction<string | null>) => {
        state.productSubType = action.payload;
      },
      prepare: (actionData: string | null) => {
        return { payload: actionData };
      },
    },
    onChangeSortType: {
      reducer: (state, action: PayloadAction<string>) => {
        state.sortType = action.payload;
      },
      prepare: (sortType: string) => {
        return { payload: sortType };
      },
    },
    onChangePage: {
      reducer: (state, action: PayloadAction<number>) => {
        state.page = action.payload;
      },
      prepare: (page: number) => {
        return { payload: page };
      },
    },
    increasePage: (state) => {
      state.page += 1;
    },
    decreasePage: (state) => {
      state.page -= 1;
    },
    onChangeNumPage: {
      reducer: (state, action: PayloadAction<number>) => {
        state.numPage = action.payload;
      },
      prepare: (numPage: number) => {
        return { payload: numPage };
      },
    },
  },
});

export const {
  onChangeProductType,
  onChangeProductSubType,
  onChangeSortType,
  onChangePage,
  increasePage,
  decreasePage,
  onChangeNumPage,
} = choiceBarSlice.actions;
export default choiceBarSlice;
