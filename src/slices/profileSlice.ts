import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import {
  editProfile as editProfileService,
  getProfile as getProfileService,
  GetProfileResponseData,
} from "services/profile";

import { investorProfileMapping } from "types/InvestorProfile";

import type { RootState, AsyncThunkConfig } from "../store";

interface ProfileState {
  name: string;
  investorProfileDisplayText: string;
  investorProfileValue: string;
  password: string;
  passwordConfirmation: string;
  status: string;
}

const initialState: ProfileState = {
  name: "",
  investorProfileDisplayText: "",
  investorProfileValue: "",
  password: "",
  passwordConfirmation: "",
  status: "",
};

export const editProfile: AsyncThunk<
  void,
  void,
  AsyncThunkConfig
> = createAsyncThunk<void, void, AsyncThunkConfig>(
  "profile/editProfile",
  async (_, { getState }) => {
    const { name, investorProfileValue, password } = getState().profile;
    await editProfileService(name, investorProfileValue, password);
  }
);

export const getProfile: AsyncThunk<
  GetProfileResponseData,
  void,
  AsyncThunkConfig
> = createAsyncThunk<GetProfileResponseData, void, AsyncThunkConfig>(
  "profile/getProfile",
  async () => {
    const profile = await getProfileService();
    profile.investor_profile =
      profile.investor_profile.charAt(0).toLowerCase() +
      profile.investor_profile.slice(1);
    return profile;
  }
);

export const profileSlice = createSlice({
  name: "profile",
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
    updatePassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    updatePasswordConfirmation: (state, action: PayloadAction<string>) => {
      state.passwordConfirmation = action.payload;
    },
  },
  extraReducers: {
    [editProfile.pending.type]: (state) => {
      state.status = "loading";
    },
    [editProfile.fulfilled.type]: (state) => {
      state.status = "success";
    },
    [editProfile.rejected.type]: (state) => {
      state.status = "error";
    },
    [getProfile.pending.type]: (state) => {
      state.status = "loading";
    },
    [getProfile.fulfilled.type]: (
      state,
      action: PayloadAction<GetProfileResponseData>
    ) => {
      state.status = "success";
      state.name = action.payload.name;
      state.investorProfileValue = action.payload.investor_profile;

      const filteredProfile = investorProfileMapping.filter(
        (it) => it.value === state.investorProfileValue
      );
      if (filteredProfile.length > 0) {
        state.investorProfileDisplayText = filteredProfile[0].displayValue;
      }
    },
  },
});

export const {
  updatePassword,
  updateInvestorProfileValue,
  updateInvestorProfileDisplayText,
  updateName,
  updatePasswordConfirmation,
} = profileSlice.actions;

export const selectFormData = (state: RootState) => {
  const {
    passwordConfirmation,
    password,
    investorProfileDisplayText,
    investorProfileValue,
    name,
  } = state.profile;

  return {
    password,
    passwordConfirmation,
    investorProfileDisplayText,
    investorProfileValue,
    name,
  };
};

export const selectName = (state: RootState) => state.profile.name;
export const selectPassword = (state: RootState) => state.profile.password;
export const selectStatus = (state: RootState) => state.profile.status;

export default profileSlice.reducer;
