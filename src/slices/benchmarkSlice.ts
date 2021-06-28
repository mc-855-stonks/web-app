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
    return: benchmarkData.return * 100,
    ibov: benchmarkData.ibov * 100,
    cdi: benchmarkData.cdi * 100,
  };
};

const getNonLabeledChartPointData = (benchmarkData: BenchmarkData) => {
  return {
    name: "",
    return: benchmarkData.return * 100,
    ibov: benchmarkData.ibov * 100,
    cdi: benchmarkData.cdi * 100,
  };
};

const getBenchmarkChartData = (
  data: Array<Array<BenchmarkData>>,
  monthsNumber: number
) => {
  const sliceNumber = (monthsNumber <= data.length) ? monthsNumber : data.length;
  const orderedMonthList = data.slice(0, sliceNumber).reverse();
  if (!orderedMonthList || orderedMonthList.length === 0) {
    return [];
  }
  const orderedMonthListReversed = orderedMonthList.map((daysList) => daysList.reverse());
  const firstMonthOrderedMonthList = orderedMonthListReversed[0];

  const firstDayChartData = getLabeledChartPointData(firstMonthOrderedMonthList[0]);
  if (orderedMonthListReversed.length < 2) {
    const firstMonthLength = orderedMonthListReversed[0].length;
    const remainingDays = orderedMonthListReversed[0]
      .slice(1, firstMonthLength - 1)
      .map(getNonLabeledChartPointData);

    return [firstDayChartData].concat(remainingDays);
  }

  const lastMonthLength = orderedMonthList[orderedMonthListReversed.length-1].length;
  const lastDayChartData = getLabeledChartPointData(
    orderedMonthList[orderedMonthListReversed.length-1][lastMonthLength - 1]
  );
  const dayGroupedData = orderedMonthListReversed.flat();
  const daysLength = dayGroupedData.length;
  const intermediaryDayChartData = dayGroupedData
    .slice(1, daysLength - 1)
    .map(getNonLabeledChartPointData);

  return [firstDayChartData]
    .concat(intermediaryDayChartData)
    .concat(lastDayChartData);
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
