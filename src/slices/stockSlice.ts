import {
  createSlice,
  AsyncThunk,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import { getAvailableStocks, Stock } from "services/stock";
import type { AsyncThunkConfig, RootState } from "../store";

interface StockState {
  stocks: Array<Stock>;
  status: string;
}

export const fetchStocks: AsyncThunk<
  Array<Stock>,
  void,
  AsyncThunkConfig
> = createAsyncThunk<Array<Stock>, void, AsyncThunkConfig>(
  "stock/fetchStocks",
  async () => {
    const response = await getAvailableStocks();
    return response.stocks;
  }
);

const initialState: StockState = {
  status: "",
  stocks: [],
};

export const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchStocks.pending.type]: (state) => {
      state.status = "loading";
    },
    [fetchStocks.fulfilled.type]: (
      state,
      action: PayloadAction<Array<Stock>>
    ) => {
      state.status = "";
      state.stocks = action.payload;
    },
    [fetchStocks.rejected.type]: (state) => {
      state.status = "error";
    },
  },
});

// export const {} = stockSlice.actions;

export const selectStocks = (state: RootState) => {
  return state.stock.stocks;
};
export const selectStatus = (state: RootState) => state.stock.status;

export default stockSlice.reducer;
