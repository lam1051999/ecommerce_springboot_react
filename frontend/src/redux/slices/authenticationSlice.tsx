import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthenticationResponse, AuthenticationState } from "../types/types";

const initialState: AuthenticationState = {
  token: null,
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    onLogin: {
      reducer: (state, action: PayloadAction<AuthenticationResponse>) => {
        state.token = action.payload.data ? action.payload.data.token : null;
      },
      prepare: (authenPayload: AuthenticationResponse) => {
        return { payload: authenPayload };
      },
    },
  },
});

export const { onLogin } = authenticationSlice.actions;
export default authenticationSlice;
