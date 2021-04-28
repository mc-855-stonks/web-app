import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import counterReducer from "./slices/counterSlice";
import loginReducer from "./slices/loginSlice";
import registerReducer from "./slices/registerSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    register: registerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
