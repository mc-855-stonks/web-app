import { createSlice } from "@reduxjs/toolkit";

interface WalletState {
  wip: string;
}

const initialState: WalletState = {
  wip: "",
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {},
});

// export const {} = walletSlice.actions;

export default walletSlice.reducer;
