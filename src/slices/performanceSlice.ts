import {
  createSlice,
  PayloadAction,
  AsyncThunk,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import {
  PerformanceResponse,
  getPerformance as getPerformanceService,
} from "services/performance";

import type { RootState, AsyncThunkConfig } from "store";

interface PerformanceState {
  alpha: number;
  beta: number;
  volatility: number;
  sharpe: number;
  status: "loading" | "" | "success" | "error";
}

const initialState: PerformanceState = {
  status: "",
  alpha: 0,
  beta: 0,
  volatility: 0,
  sharpe: 0,
};

export const getPerformance: AsyncThunk<
  PerformanceResponse,
  void,
  AsyncThunkConfig
> = createAsyncThunk<PerformanceResponse, void, AsyncThunkConfig>(
  "performance/getPerformance",
  async () => {
    const performance = await getPerformanceService();
    return performance;
  }
);

export const performanceSlice = createSlice({
  name: "performance",
  initialState,
  reducers: {},
  extraReducers: {
    [getPerformance.pending.type]: (state) => {
      state.status = "loading";
    },
    [getPerformance.rejected.type]: (state) => {
      state.status = "error";
    },
    [getPerformance.fulfilled.type]: (
      state,
      action: PayloadAction<PerformanceResponse>
    ) => {
      const { alpha, beta, sharpe, volatility } = action.payload;
      state.alpha = alpha;
      state.beta = beta;
      state.sharpe = sharpe;
      state.volatility = volatility;
      state.status = "success";
    },
  },
});

export const selectPerformance = (state: RootState) => {
  const { alpha, beta, sharpe, volatility } = state.performance;
  return {
    alpha,
    beta,
    sharpe,
    volatility,
  };
};

export const selectStatus = (state: RootState) => state.performance.status;

export default performanceSlice.reducer;
