import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

interface WalletState {
  addModalVisible: boolean;
  editModalVisible: boolean;
}

const initialState: WalletState = {
  addModalVisible: false,
  editModalVisible: false,
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
    showEditModal: (state) => {
      state.editModalVisible = true;
    },
    hideEditModal: (state) => {
      state.editModalVisible = false;
    },
  },
});

export const { hideAddModal, showAddModal, hideEditModal, showEditModal } =
  walletSlice.actions;

export const selectAddModalVisible = (state: RootState) =>
  state.wallet.addModalVisible;

export const selectEditModalVisible = (state: RootState) =>
  state.wallet.editModalVisible;

export default walletSlice.reducer;
