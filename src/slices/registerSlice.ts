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
  passwordConfirmationEquals: boolean;
  invalidName: boolean;
  invalidInvestorProfile: boolean;
  invalidEmail: boolean;
  invalidPassword: boolean;
  invalidPasswordConfirmation: boolean;
}

const initialState: RegisterState = {
  name: "",
  investorProfileDisplayText: "",
  investorProfileValue: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  status: "",
  passwordConfirmationEquals: true,
  invalidName: false,
  invalidInvestorProfile: false,
  invalidEmail: false,
  invalidPassword: false,
  invalidPasswordConfirmation: false,
};

export const register: AsyncThunk<void, void, AsyncThunkConfig> =
  createAsyncThunk<void, void, AsyncThunkConfig>(
    "register/register",
    async (_, { getState }) => {
      const {
        email,
        password,
        investorProfileValue,
        name,
        passwordConfirmation,
        passwordConfirmationEquals,
      } = getState().register;

      if (
        email.trim() !== "" &&
        investorProfileValue.trim() !== "" &&
        name.trim() !== "" &&
        password.trim() !== "" &&
        passwordConfirmation.trim() !== "" &&
        passwordConfirmationEquals
      ) {
        await registerService(email, investorProfileValue, name, password);
      }
    }
  );

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      state.invalidName = state.name.trim() === "";
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
        state.invalidInvestorProfile = state.investorProfileValue.trim() === "";
      }
    },
    updateEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      state.invalidEmail = state.email.trim() === "";
    },
    updatePassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
      state.invalidPassword = state.password.trim() === "";
    },
    updatePasswordConfirmation: (state, action: PayloadAction<string>) => {
      state.passwordConfirmation = action.payload;
      state.passwordConfirmationEquals =
        state.password === state.passwordConfirmation;
      state.invalidPasswordConfirmation =
        state.passwordConfirmation.trim() === "";
    },
  },
  extraReducers: {
    [register.pending.type]: (state) => {
      state.status = "loading";
    },
    [register.fulfilled.type]: (state) => {
      const invalidFields =
        state.email.trim() === "" ||
        state.investorProfileValue.trim() === "" ||
        state.name.trim() === "" ||
        state.password.trim() === "" ||
        state.passwordConfirmation.trim() === "";
      state.status = invalidFields ? "invalid-fields" : "success";
      state.invalidEmail = state.email.trim() === "";
      state.invalidInvestorProfile = state.investorProfileValue.trim() === "";
      state.invalidName = state.name.trim() === "";
      state.invalidPassword = state.password.trim() === "";
      state.invalidPasswordConfirmation =
        state.passwordConfirmation.trim() === "";
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
export const selectPasswordConfirmationEqualsStatus = (state: RootState) =>
  state.register.passwordConfirmationEquals;

export const selectInvalidFieldsStatus = (state: RootState) => {
  const {
    invalidEmail,
    invalidInvestorProfile,
    invalidName,
    invalidPassword,
    invalidPasswordConfirmation,
  } = state.register;

  return {
    invalidEmail,
    invalidInvestorProfile,
    invalidName,
    invalidPassword,
    invalidPasswordConfirmation,
  };
};

export default registerSlice.reducer;
