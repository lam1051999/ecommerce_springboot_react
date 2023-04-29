// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { AuthenticationState } from "../types/types";

// const initialState: AuthenticationState = {
//   isLogin: false,
//   token: null,
//   userInfo: null
// };

// export const authenticationSlice = createSlice({
//   name: "authentication",
//   initialState,
//   reducers: {
//     onLogin: {
//       reducer: (state, action: PayloadAction<PathLink[]>) => {
//         state.listPath = action.payload;
//       },
//       prepare: (listPath: PathLink[]) => {
//         return { payload: listPath };
//       },
//     },
//   },
// });

// export const { onChangeListPath } = authenticationSlice.actions;
// export default authenticationSlice;
