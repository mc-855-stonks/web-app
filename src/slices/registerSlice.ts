import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface RegisterState {
  name: string;
  investorProfile: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const initialState: RegisterState = {
  name: "",
  investorProfile: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

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

export default registerSlice.reducer;
