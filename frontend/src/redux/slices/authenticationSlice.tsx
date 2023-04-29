import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthenticationResponse, AuthenticationState } from "../types/types";

const initialState: AuthenticationState = {
  isLogin: false,
  token: "",
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    onLogin: {
      reducer: (state, action: PayloadAction<AuthenticationResponse>) => {
        state.isLogin = true;
        state.token = action.payload.data ? action.payload.data.token : "";
      },
      prepare: (authenPayload: AuthenticationResponse) => {
        return { payload: authenPayload };
      },
    },
  },
});

export const { onLogin } = authenticationSlice.actions;
export default authenticationSlice;
