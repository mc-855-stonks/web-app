import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { AxiosError } from "axios";

import loginReducer from "./slices/loginSlice";
import registerReducer from "./slices/registerSlice";
import profileReducer from "./slices/profileSlice";
import walletReducer from "./slices/walletSlice";
import stockReducer from "./slices/stockSlice";
import portfolioReducer from "./slices/portfolioSlice";
import monthlyIncomeReducer from "./slices/monthlyIncomeSlice";
import benchmarkReducer from "./slices/benchmarkSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    profile: profileReducer,
    wallet: walletReducer,
    stock: stockReducer,
    portfolio: portfolioReducer,
    monthlyIncome: monthlyIncomeReducer,
    benchmark: benchmarkReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AsyncThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: AxiosError;
};

export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
