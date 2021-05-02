import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface ProfileState {
  name: string;
  investorProfile: string;
  password: string;
  passwordConfirmation: string;
}

const initialState: ProfileState = {
  name: "",
  investorProfile: "",
  password: "",
  passwordConfirmation: "",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    updateInvestorProfile: (state, action: PayloadAction<string>) => {
      state.investorProfile = action.payload;
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
  updatePassword,
  updateInvestorProfile,
  updateName,
  updatePasswordConfirmation,
} = profileSlice.actions;

export const selectFormData = (state: RootState) => {
  const {
    passwordConfirmation,
    password,
    investorProfile,
    name,
  } = state.profile;

  return {
    password,
    passwordConfirmation,
    investorProfile,
    name,
  };
};

export default profileSlice.reducer;
