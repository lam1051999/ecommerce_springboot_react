import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthenticationResponse, AuthenticationState } from "../types/types";

const initialState: AuthenticationState = {
  token: null,
  refresh_token: null,
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    onRenewToken: {
      reducer: (state, action: PayloadAction<AuthenticationResponse>) => {
        state.token = action.payload.data.token;
        state.refresh_token = action.payload.data.refresh_token;
      },
      prepare: (authenPayload: AuthenticationResponse) => {
        return { payload: authenPayload };
      },
    },
    onResetToken: (state) => {
      state.token = null;
      state.refresh_token = null;
    },
  },
});

export const { onRenewToken, onResetToken } = authenticationSlice.actions;
export default authenticationSlice;
