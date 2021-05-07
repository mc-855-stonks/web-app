import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

interface WalletState {
  addModalVisible: boolean;
}

const initialState: WalletState = {
  addModalVisible: false,
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    showAddModal: (state) => {
      state.addModalVisible = true;
    },
    hideAddModal: (state) => {
      state.addModalVisible = false;
    },
  },
});

export const { hideAddModal, showAddModal } = walletSlice.actions;

export const selectAddModalVisible = (state: RootState) =>
  state.wallet.addModalVisible;

export default walletSlice.reducer;
