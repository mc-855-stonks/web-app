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

import type { RootState, AsyncThunkConfig } from "../store";

interface ProfileState {
  name: string;
  investorProfile: string;
  password: string;
  passwordConfirmation: string;
  status: string;
}

const initialState: ProfileState = {
  name: "",
  investorProfile: "",
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
    const { name, investorProfile, password } = getState().profile;
    await editProfileService(name, investorProfile, password);
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
      state.investorProfile = action.payload.investor_profile;
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

export const selectName = (state: RootState) => state.profile.name;
export const selectInvestorProfile = (state: RootState) =>
  state.profile.investorProfile;
export const selectPassword = (state: RootState) => state.profile.password;
export const selectStatus = (state: RootState) => state.profile.status;

export default profileSlice.reducer;
