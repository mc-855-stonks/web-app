import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { login as loginService } from "services/auth";

import type { RootState, AsyncThunkConfig } from "../store";

interface LoginState {
  email: string;
  password: string;
  loading: boolean;
}

const initialState: LoginState = {
  email: "",
  password: "",
  loading: false,
};

export const login: AsyncThunk<void, void, AsyncThunkConfig> = createAsyncThunk<
  void,
  void,
  AsyncThunkConfig
>("login/login", async (_, { getState }) => {
  const { email, password } = getState().login;
  const response = await loginService(email, password);
  console.info(response.data);
});

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
    [login.pending.type]: (state) => {
      state.loading = true;
    },
    [login.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [login.rejected.type]: (state) => {
      state.loading = false;
    },
  },
});

export const { updateEmail, updatePassword } = loginSlice.actions;

export const selectEmail = (state: RootState) => state.login.email;
export const selectPassword = (state: RootState) => state.login.password;

export default loginSlice.reducer;
