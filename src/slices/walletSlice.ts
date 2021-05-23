import {
  createSlice,
  AsyncThunk,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import moment from "moment";
import { getWalletSummary, WalletResponse } from "services/wallet";
import type { AsyncThunkConfig, RootState } from "../store";

interface AddForm {
  selectedStockID: number | null;
  stockTicker: string;
  operationDate: string;
  amount: string;
  price: string;
  side: "buy" | "sell" | "";
}

interface WalletState {
  status: string;
  addModalVisible: boolean;
  editModalVisible: boolean;
  wallet: WalletResponse | null;
  addForm: AddForm;
}

export const fetchWalletSummary: AsyncThunk<
  WalletResponse,
  void,
  AsyncThunkConfig
> = createAsyncThunk<WalletResponse, void, AsyncThunkConfig>(
  "wallet/fetchWalletSummary",
  async () => {
    return Promise.resolve(getWalletSummary());
  }
);

const initialState: WalletState = {
  status: "",
  addModalVisible: false,
  editModalVisible: false,
  wallet: null,
  addForm: {
    selectedStockID: null,
    stockTicker: "",
    operationDate: moment().format("DD/MM/yyyy"),
    amount: "",
    price: "",
    side: "",
  },
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
      state.addForm = initialState.addForm;
    },
    showEditModal: (state) => {
      state.editModalVisible = true;
    },
    hideEditModal: (state) => {
      state.editModalVisible = false;
    },
    clearAddForm: (state) => {
      state.addForm = initialState.addForm;
    },
    updateAddFormTicker: (state, action: PayloadAction<string>) => {
      state.addForm.stockTicker = action.payload;
    },
    updateAddFormOperationDate: (state, action: PayloadAction<string>) => {
      state.addForm.operationDate = action.payload;
    },
    updateAddFormAmount: (state, action: PayloadAction<string>) => {
      state.addForm.amount = action.payload;
    },
    updateAddFormPrice: (state, action: PayloadAction<string>) => {
      state.addForm.price = action.payload;
    },
    updateAddFormSelectedStock: (state, action: PayloadAction<number>) => {
      state.addForm.selectedStockID = action.payload;
    },
    addFormSelectSide: (state, action: PayloadAction<"buy" | "sell">) => {
      if (state.addForm.side === action.payload) {
        state.addForm.side = "";
      } else {
        state.addForm.side = action.payload;
      }
    },
  },
  extraReducers: {
    [fetchWalletSummary.pending.type]: (state) => {
      state.status = "loading";
    },
    [fetchWalletSummary.fulfilled.type]: (
      state,
      action: PayloadAction<WalletResponse>
    ) => {
      state.status = "";
      state.wallet = action.payload;
    },
    [fetchWalletSummary.rejected.type]: (state) => {
      state.status = "error";
    },
  },
});

export const {
  hideAddModal,
  showAddModal,
  hideEditModal,
  showEditModal,
  updateAddFormAmount,
  updateAddFormOperationDate,
  updateAddFormPrice,
  updateAddFormSelectedStock,
  updateAddFormTicker,
  addFormSelectSide,
} = walletSlice.actions;

export const selectAddModalVisible = (state: RootState) =>
  state.wallet.addModalVisible;

export const selectEditModalVisible = (state: RootState) =>
  state.wallet.editModalVisible;

export const selectWallet = (state: RootState) => state.wallet.wallet;
export const selectStatus = (state: RootState) => state.wallet.status;
export const selectStocks = (state: RootState) =>
  state.wallet.wallet ? state.wallet.wallet.stocks : [];
export const selectAddForm = (state: RootState) => state.wallet.addForm;

export default walletSlice.reducer;
