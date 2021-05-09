import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { register as registerService } from "services/register";
import { investorProfileMapping } from "types/InvestorProfile";

import type { AsyncThunkConfig, RootState } from "../store";

interface RegisterState {
  name: string;
  investorProfileDisplayText: string;
  investorProfileValue: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  status: string;
}

const initialState: RegisterState = {
  name: "",
  investorProfileDisplayText: "",
  investorProfileValue: "",
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
    const { email, password, investorProfileValue, name } = getState().register;
    await registerService(email, investorProfileValue, name, password);
  }
);

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    updateInvestorProfileDisplayText: (
      state,
      action: PayloadAction<string>
    ) => {
      state.investorProfileDisplayText = action.payload;
    },
    updateInvestorProfileValue: (state, action: PayloadAction<string>) => {
      const filteredProfile = investorProfileMapping.filter(
        (it) => it.value === action.payload
      );
      if (filteredProfile.length > 0) {
        state.investorProfileDisplayText = filteredProfile[0].displayValue;
        state.investorProfileValue = action.payload;
      }
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
  updateInvestorProfileDisplayText,
  updateInvestorProfileValue,
  updateName,
  updatePasswordConfirmation,
} = registerSlice.actions;

export const selectFormData = (state: RootState) => {
  const {
    email,
    passwordConfirmation,
    password,
    investorProfileDisplayText,
    name,
  } = state.register;

  return {
    email,
    password,
    passwordConfirmation,
    investorProfileDisplayText,
    name,
  };
};

export const selectStatus = (state: RootState) => state.register.status;

export default registerSlice.reducer;
