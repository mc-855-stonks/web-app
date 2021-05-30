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
} from "services/benchmark";
import type { RootState, AsyncThunkConfig } from "store";

interface ChartPointData {
  name: string;
  return: number;
  ibov: number;
  cdi: number;
  ipca: number;
}

interface BenchmarkState {
  timeSelectionType: string;
  displayTypes: Array<string>;
  monthsDataMap: Map<string, Array<ChartPointData>>;
  status: string;
}

const initialState: BenchmarkState = {
  timeSelectionType: "12-months",
  displayTypes: ["return", "ibov", "cdi", "ipca",],
  monthsDataMap: new Map([
    ["3-months", []],
    ["6-months", []],
    ["12-months", []],
  ]),
  status: "",
};

export const getBenchmark: AsyncThunk<
  Array<Array<BenchmarkData>>,
  void,
  AsyncThunkConfig
> = createAsyncThunk<Array<Array<BenchmarkData>>, void, AsyncThunkConfig>(
  "benchmark/getBenchmark",
  async () => {
    const data = await getBenchmarkService();
    return data;
  }
);

const getLabeledChartPointData = (benchmarkData: BenchmarkData) => {
  return {
    name: getChartDateLabel(benchmarkData.date),
    return: benchmarkData.return*100,
    ibov: benchmarkData.ibov*100,
    cdi: benchmarkData.cdi*100,
    ipca: benchmarkData.ipca*100,
  };
};

const getNonLabeledChartPointData = (benchmarkData: BenchmarkData) => {
  return {
    name: "",
    return: benchmarkData.return*100,
    ibov: benchmarkData.ibov*100,
    cdi: benchmarkData.cdi*100,
    ipca: benchmarkData.ipca*100,
  };
};

const getBenchmarkChartData = (
  data: Array<Array<BenchmarkData>>,
  monthsNumber: number,
) => {
  let orderedMonthList = data.slice(0, monthsNumber).reverse();
  if (!orderedMonthList || orderedMonthList.length === 0) {
    return [];
  }
  orderedMonthList = orderedMonthList.map((daysList) => daysList.reverse());

  const firstDayChartData = getLabeledChartPointData(orderedMonthList[0][0]);
  if (orderedMonthList.length < 2) {
    const firstMonthLength = orderedMonthList[0].length;
    const remainingDays = orderedMonthList[0]
      .slice(1, firstMonthLength - 1)
      .map(getNonLabeledChartPointData);
    
    return [firstDayChartData].concat(remainingDays);
  }
  
  const lastMonthLength = orderedMonthList[monthsNumber-1].length;
  const lastDayChartData = getLabeledChartPointData(
    orderedMonthList[monthsNumber-1][lastMonthLength-1]
  );
  const dayGroupedData = orderedMonthList.flat();
  const daysLength = dayGroupedData.length;
  const intermediaryDayChartData = dayGroupedData
    .slice(1, daysLength-1)
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
        state.displayTypes.splice(state.displayTypes.indexOf(action.payload), 1);
      } else {
        state.displayTypes.push(action.payload);
      }
    },
    updateTimeSelectionType: (state, action: PayloadAction<string>) => {
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
      action: PayloadAction<Array<Array<BenchmarkData>>>
    ) => {
      state.monthsDataMap = new Map([
        ["3-months", getBenchmarkChartData(action.payload, 3)],
        ["6-months", getBenchmarkChartData(action.payload, 6)],
        ["12-months", getBenchmarkChartData(action.payload, 12)],
      ]);
      state.status = "success";
    },
  },
});

export const { updateDisplayType, updateTimeSelectionType } = benchmarkSlice.actions;
export const selectDisplayTypes = (state: RootState) =>
  state.benchmark.displayTypes;
export const selectTimeSelectionType = (state: RootState) =>
  state.benchmark.timeSelectionType;
export const selectStatus = (state: RootState) => state.benchmark.status;
export const selectData = (state: RootState) => {
  return state.benchmark.monthsDataMap.get(
    state.benchmark.timeSelectionType
  ) || [];
};

export default benchmarkSlice.reducer;
