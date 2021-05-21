import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "store";

interface PortfolioState {
  displayType: string;
  data: Array<any>;
}

const initialState: PortfolioState = {
  displayType: "stock",
  data: [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ],
};

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    updateDisplayType: (state, action: PayloadAction<string>) => {
      state.displayType = action.payload;
    },
  },
});

export const { updateDisplayType } = portfolioSlice.actions;
export const selectDisplayType = (state: RootState) =>
  state.portfolio.displayType;
export const selectData = (state: RootState) => state.portfolio.data;

export default portfolioSlice.reducer;
