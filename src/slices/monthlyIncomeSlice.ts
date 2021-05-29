import {
  createSlice,
  PayloadAction,
  AsyncThunk,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import {
  getMonthlyIncome as getMonthlyIncomeService,
  MonthlyIncomeData,
} from "services/monthlyIncome";
import type { RootState, AsyncThunkConfig } from "store";

interface ChartPointData {
  name: string;
  value: number;
}

interface MonthlyIncomeState {
  displayType: string;
  monthsDataMap: Map<string, Array<ChartPointData>>;
  status: string;
}

const initialState: MonthlyIncomeState = {
  displayType: "12-months",
  monthsDataMap: new Map([
    ["3-months", []],
    ["6-months", []],
    ["12-months", []],
  ]),
  status: "",
};

const MONTH_LABEL_LIST = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

export const getMonthlyIncome: AsyncThunk<
  Array<MonthlyIncomeData>,
  void,
  AsyncThunkConfig
> = createAsyncThunk<Array<MonthlyIncomeData>, void, AsyncThunkConfig>(
  "monthlyIncome/getMonthlyIncome",
  async () => {
    const data = await getMonthlyIncomeService();
    return data;
  }
);

const getChartDateLabel = (date: string) => {
  const yearMonth = date.split("-");
  if (!yearMonth || yearMonth.length < 2) {
    return "";
  }
  return `${MONTH_LABEL_LIST[Number(yearMonth[1]) - 1]}/${yearMonth[0]}`;
};

const getLabeledChartPointData = (income: MonthlyIncomeData) => {
  return {
    name: getChartDateLabel(income.date),
    value: income.return,
  };
};

const getNonLabeledChartPointData = (income: MonthlyIncomeData) => {
  return { name: "", value: income.return };
};

const getMonthlyIncomeChartData = (
  data: Array<MonthlyIncomeData>,
  monthsNumber: number,
) => {
  const orderedMonthList = data.slice(0, monthsNumber).reverse();
  if (!orderedMonthList || orderedMonthList.length === 0) {
    return [];
  }
  
  const firstMonthChartData = getLabeledChartPointData(orderedMonthList[0]);
  if (orderedMonthList.length < 2) {
    return [firstMonthChartData];
  }
  
  const { length } = orderedMonthList;
  const lastMonthChartData = getLabeledChartPointData(orderedMonthList[length - 1]);
  const intermediaryMonthChartData = orderedMonthList.slice(1, length - 1).map(getNonLabeledChartPointData);
  return [firstMonthChartData].concat(intermediaryMonthChartData).concat(lastMonthChartData);
};

export const monthlyIncomeSlice = createSlice({
  name: "monthlyIncome",
  initialState,
  reducers: {
    updateDisplayType: (state, action: PayloadAction<string>) => {
      state.displayType = action.payload;
    },
  },
  extraReducers: {
    [getMonthlyIncome.pending.type]: (state) => {
      state.status = "loading";
    },
    [getMonthlyIncome.rejected.type]: (state) => {
      state.status = "error";
    },
    [getMonthlyIncome.fulfilled.type]: (
      state,
      action: PayloadAction<Array<MonthlyIncomeData>>
    ) => {
      state.monthsDataMap = new Map([
        ["3-months", getMonthlyIncomeChartData(action.payload, 3)],
        ["6-months", getMonthlyIncomeChartData(action.payload, 6)],
        ["12-months", getMonthlyIncomeChartData(action.payload, 12)],
      ]);
      state.status = "success";
    },
  },
});

export const { updateDisplayType } = monthlyIncomeSlice.actions;
export const selectDisplayType = (state: RootState) =>
  state.monthlyIncome.displayType;
export const selectStatus = (state: RootState) => state.monthlyIncome.status;
export const selectData = (state: RootState) => {
  return state.monthlyIncome.monthsDataMap.get(
    state.monthlyIncome.displayType
  ) || [];
};

export default monthlyIncomeSlice.reducer;
