import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PathLink } from "../../constants/type";
import { BreadScrumbState } from "../types/types";

const initialState: BreadScrumbState = {
  listPath: [],
};

export const breadcrumbSlice = createSlice({
  name: "breadcrumb",
  initialState,
  reducers: {
    onChangeListPath: {
      reducer: (state, action: PayloadAction<PathLink[]>) => {
        state.listPath = action.payload;
      },
      prepare: (listPath: PathLink[]) => {
        return { payload: listPath };
      },
    },
  },
});

export const { onChangeListPath } = breadcrumbSlice.actions;
export default breadcrumbSlice;
