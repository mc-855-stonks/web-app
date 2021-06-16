import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { login as loginService } from "services/auth";

import type { RootState, AsyncThunkConfig } from "../store";

interface SettingsState {
  hideValues: boolean;
}

const initialState: SettingsState = {
  hideValues: false,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleHideValues: (state) => {
      state.hideValues = !state.hideValues;
    },
  },
});

export const { toggleHideValues } = settingsSlice.actions;

export const selectHideValues = (state: RootState) => state.settings.hideValues;

export default settingsSlice.reducer;
