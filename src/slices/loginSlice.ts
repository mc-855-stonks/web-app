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
  status: string;
}

const initialState: LoginState = {
  email: "",
  password: "",
  status: "",
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
    clearStatus: (state) => {
      state.status = "";
    },
    clearForm: (state) => {
      state.email = initialState.email;
      state.password = initialState.password;
      state.status = initialState.status;
    },
  },
  extraReducers: {
    [login.pending.type]: (state) => {
      state.status = "loading";
    },
    [login.fulfilled.type]: (state) => {
      state.status = "success";
    },
    [login.rejected.type]: (state) => {
      state.status = "error";
    },
  },
});

export const { updateEmail, updatePassword, clearStatus, clearForm } =
  loginSlice.actions;

export const selectEmail = (state: RootState) => state.login.email;
export const selectPassword = (state: RootState) => state.login.password;
export const selectStatus = (state: RootState) => state.login.status;

export default loginSlice.reducer;
