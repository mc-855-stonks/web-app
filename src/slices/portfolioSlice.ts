import {
  createSlice,
  PayloadAction,
  AsyncThunk,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import {
  PortfolioResponse,
  SectorData,
  TickerData,
  getPortfolio as getPortfolioService,
} from "services/portfolio";
import type { RootState, AsyncThunkConfig } from "store";

interface ChartPointData {
  name: string;
  value: number;
}

interface PortfolioState {
  displayType: string;
  stocksData: Array<ChartPointData>;
  sectorsData: Array<ChartPointData>;
  status: string;
}

const initialState: PortfolioState = {
  displayType: "stock",
  stocksData: [],
  sectorsData: [],
  status: "",
};

export const getPortfolio: AsyncThunk<
  PortfolioResponse,
  void,
  AsyncThunkConfig
> = createAsyncThunk<PortfolioResponse, void, AsyncThunkConfig>(
  "portfolio/getPortfolio",
  async () => {
    const portfolio = await getPortfolioService();
    return portfolio;
  }
);

const getChartPointDataFromStock = (stockData: TickerData) => {
  return { name: stockData.ticker, value: stockData.current_total };
};

const getChartPointDataFromSector = (sectorData: SectorData) => {
  return { name: sectorData.sector, value: sectorData.current_total };
};

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    updateDisplayType: (state, action: PayloadAction<string>) => {
      state.displayType = action.payload;
    },
  },
  extraReducers: {
    [getPortfolio.pending.type]: (state) => {
      state.status = "loading";
    },
    [getPortfolio.rejected.type]: (state) => {
      state.status = "error";
    },
    [getPortfolio.fulfilled.type]: (
      state,
      action: PayloadAction<PortfolioResponse>
    ) => {
      state.stocksData = action.payload.stocks.map((stock) =>
        getChartPointDataFromStock(stock)
      );
      state.sectorsData = action.payload.sectors.map((sector) =>
        getChartPointDataFromSector(sector)
      );
      state.status = "success";
    },
  },
});

export const { updateDisplayType } = portfolioSlice.actions;
export const selectDisplayType = (state: RootState) =>
  state.portfolio.displayType;
export const selectStatus = (state: RootState) => state.portfolio.status;
export const selectData = (state: RootState) => {
  return state.portfolio.displayType === "stock"
    ? state.portfolio.stocksData
    : state.portfolio.sectorsData;
};

export default portfolioSlice.reducer;
