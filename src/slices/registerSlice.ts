import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { register as registerService } from "services/register";

import type { AsyncThunkConfig, RootState } from "../store";

interface RegisterState {
  name: string;
  investorProfile: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  status: string;
}

const initialState: RegisterState = {
  name: "",
  investorProfile: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  status: "",
};

export const register: AsyncThunk<
  void,
  void,
  AsyncThunkConfig
> = createAsyncThunk<void, void, AsyncThunkConfig>(
  "register/register",
  async (_, { getState }) => {
    const { email, password, investorProfile, name } = getState().register;
    await registerService(email, investorProfile, name, password);
  }
);

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    updateInvestorProfile: (state, action: PayloadAction<string>) => {
      state.investorProfile = action.payload;
    },
    updateEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    updatePassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    updatePasswordConfirmation: (state, action: PayloadAction<string>) => {
      state.passwordConfirmation = action.payload;
    },
  },
  extraReducers: {
    [register.pending.type]: (state) => {
      state.status = "loading";
    },
    [register.fulfilled.type]: (state) => {
      state.status = "success";
    },
    [register.rejected.type]: (state) => {
      state.status = "error";
    },
  },
});

export const {
  updateEmail,
  updatePassword,
  updateInvestorProfile,
  updateName,
  updatePasswordConfirmation,
} = registerSlice.actions;

export const selectFormData = (state: RootState) => {
  const {
    email,
    passwordConfirmation,
    password,
    investorProfile,
    name,
  } = state.register;

  return {
    email,
    password,
    passwordConfirmation,
    investorProfile,
    name,
  };
};

export const selectStatus = (state: RootState) => state.register.status;

export default registerSlice.reducer;
