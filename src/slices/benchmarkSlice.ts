import {
  createSlice,
  PayloadAction,
  AsyncThunk,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { getChartDateLabel } from "utils/date";
import {
  getBenchmark as getBenchmarkService,
  BenchmarkData,
  BenchmarkResponse,
} from "services/benchmark";
import type { RootState, AsyncThunkConfig } from "store";

interface ChartPointData {
  name: string;
  return: number;
  ibov: number;
  cdi: number;
}

interface BenchmarkState {
  timeSelectionType: "3-months" | "6-months" | "12-months";
  displayTypes: Array<string>;
  monthsDataMap: {
    "3-months": Array<ChartPointData>;
    "6-months": Array<ChartPointData>;
    "12-months": Array<ChartPointData>;
  };
  status: string;
}

const initialState: BenchmarkState = {
  timeSelectionType: "12-months",
  displayTypes: ["return", "ibov", "cdi"],
  monthsDataMap: {
    "3-months": [],
    "6-months": [],
    "12-months": [],
  },
  status: "",
};

export const getBenchmark: AsyncThunk<
  BenchmarkResponse,
  void,
  AsyncThunkConfig
> = createAsyncThunk<BenchmarkResponse, void, AsyncThunkConfig>(
  "benchmark/getBenchmark",
  async () => {
    const data = await getBenchmarkService();
    return data;
  }
);

const getLabeledChartPointData = (benchmarkData: BenchmarkData) => {
  return {
    name: getChartDateLabel(benchmarkData.date),
    return: benchmarkData.return,
    ibov: benchmarkData.ibov * 100,
    cdi: benchmarkData.cdi * 100,
  };
};

const getBenchmarkChartData = (
  data: Array<Array<BenchmarkData>>,
  monthsNumber: number
) => {
  const sliceNumber = monthsNumber <= data.length ? monthsNumber : data.length;
  let orderedMonthList = data.slice(0, sliceNumber).reverse();
  orderedMonthList = orderedMonthList.map((monthData) =>
    monthData.slice().reverse()
  );

  if (!orderedMonthList || orderedMonthList.length === 0) {
    return [];
  }

  const dayGroupedData = orderedMonthList.flat();
  return dayGroupedData.map((value) => getLabeledChartPointData(value));
};

export const benchmarkSlice = createSlice({
  name: "benchmark",
  initialState,
  reducers: {
    updateDisplayType: (state, action: PayloadAction<string>) => {
      if (state.displayTypes.includes(action.payload)) {
        state.displayTypes.splice(
          state.displayTypes.indexOf(action.payload),
          1
        );
      } else {
        state.displayTypes.push(action.payload);
      }
    },
    updateTimeSelectionType: (
      state,
      action: PayloadAction<"3-months" | "6-months" | "12-months">
    ) => {
      state.timeSelectionType = action.payload;
    },
  },
  extraReducers: {
    [getBenchmark.pending.type]: (state) => {
      state.status = "loading";
    },
    [getBenchmark.rejected.type]: (state) => {
      state.status = "error";
    },
    [getBenchmark.fulfilled.type]: (
      state,
      action: PayloadAction<BenchmarkResponse>
    ) => {
      console.log("data", action.payload.data);
      state.monthsDataMap = {
        "3-months": getBenchmarkChartData(action.payload.data, 3),
        "6-months": getBenchmarkChartData(action.payload.data, 6),
        "12-months": getBenchmarkChartData(action.payload.data, 12),
      };
      console.log(state.monthsDataMap);
      state.status = "success";
    },
  },
});

export const { updateDisplayType, updateTimeSelectionType } =
  benchmarkSlice.actions;
export const selectDisplayTypes = (state: RootState) =>
  state.benchmark.displayTypes;
export const selectTimeSelectionType = (state: RootState) =>
  state.benchmark.timeSelectionType;
export const selectStatus = (state: RootState) => state.benchmark.status;
export const selectData = (state: RootState) => {
  return state.benchmark.monthsDataMap[state.benchmark.timeSelectionType] || [];
};

export default benchmarkSlice.reducer;
