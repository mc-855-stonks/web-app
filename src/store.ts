import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import loginReducer from "./slices/loginSlice";
import registerReducer from "./slices/registerSlice";
import profileReducer from "./slices/profileSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
