import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface LoginState {
  email: string;
  password: string;
  errorMode: boolean;
}

const initialState: LoginState = {
  email: "",
  password: "",
  errorMode: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    updateEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    updatePassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    updateErrorMode: (state, action: PayloadAction<boolean>) => {
      state.errorMode = action.payload;
    },
  },
});

export const {
  updateEmail,
  updatePassword,
  updateErrorMode,
} = loginSlice.actions;

export const selectEmail = (state: RootState) => state.login.email;
export const selectPassword = (state: RootState) => state.login.password;
export const selectErrorMode = (state: RootState) => state.login.errorMode;

export default loginSlice.reducer;
