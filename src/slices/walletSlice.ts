import {
  createSlice,
  AsyncThunk,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import moment from "moment";
import { createOperation, CreateOperationResponse } from "services/operation";
import { getWalletSummary, WalletResponse } from "services/wallet";
import type { AsyncThunkConfig, RootState } from "../store";

interface AddForm {
  stockTicker: string;
  operationDate: string;
  amount: string;
  price: string;
  side: "buy" | "sell" | "";
  showAddFormErrors: boolean;
}

interface WalletState {
  notificationMessage: string;
  status: "success" | "error" | "loading" | "";
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

export const createNewOperation: AsyncThunk<
  CreateOperationResponse,
  void,
  AsyncThunkConfig
> = createAsyncThunk<CreateOperationResponse, void, AsyncThunkConfig>(
  "wallet/createNewOperation",
  async (_, { getState, dispatch }) => {
    const { wallet } = getState();
    const { addForm } = wallet;
    const {
      validAmount,
      validOperationDate,
      validPrice,
      validSide,
      validStockTicker,
    } = selectValidAddForm(getState());
    if (
      !validAmount ||
      !validOperationDate ||
      !validPrice ||
      !validSide ||
      !validStockTicker
    ) {
      dispatch(showAddFormErrors());
      throw new Error("invalid params");
    }

    const formatedDate = moment(addForm.operationDate, "DD/MM/yyyy").format(
      "yyyy-MM-DD"
    );
    const result = await createOperation(
      formatedDate,
      addForm.side,
      parseInt(addForm.amount, 10),
      parseFloat(addForm.price),
      addForm.stockTicker
    );
    dispatch(fetchWalletSummary());

    return result;
  }
);

const initialState: WalletState = {
  status: "",
  notificationMessage: "",
  addModalVisible: false,
  editModalVisible: false,
  wallet: null,
  addForm: {
    showAddFormErrors: false,
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
    clearStatus: (state) => {
      state.status = "";
    },
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
    addFormSelectSide: (state, action: PayloadAction<"buy" | "sell">) => {
      if (state.addForm.side === action.payload) {
        state.addForm.side = "";
      } else {
        state.addForm.side = action.payload;
      }
    },
    showAddFormErrors: (state) => {
      state.addForm.showAddFormErrors = true;
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
      state.notificationMessage = "Houve um erro ao recuperar a sua carteira";
      state.status = "error";
    },
    [createNewOperation.pending.type]: (state) => {
      state.status = "loading";
    },
    [createNewOperation.fulfilled.type]: (state) => {
      state.status = "success";
      state.notificationMessage = "Successo ao adicionar a operação";
      state.addModalVisible = false;
      state.addForm = initialState.addForm;
    },
    [createNewOperation.rejected.type]: (state) => {
      state.notificationMessage = "Houve um erro para adicionar a operação";
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
  updateAddFormTicker,
  addFormSelectSide,
  showAddFormErrors,
  clearAddForm,
  clearStatus,
} = walletSlice.actions;

export const selectNotificationMessage = (state: RootState) =>
  state.wallet.notificationMessage;
export const selectAddModalVisible = (state: RootState) =>
  state.wallet.addModalVisible;
export const selectEditModalVisible = (state: RootState) =>
  state.wallet.editModalVisible;
export const selectWallet = (state: RootState) => state.wallet.wallet;
export const selectStatus = (state: RootState) => state.wallet.status;
export const selectStocks = (state: RootState) =>
  state.wallet.wallet ? state.wallet.wallet.stocks : [];
export const selectAddForm = (state: RootState) => state.wallet.addForm;
export const selectValidAddForm = (state: RootState) => {
  const {
    amount,
    operationDate,
    price,
    side,
    stockTicker,
  } = state.wallet.addForm;
  const date = moment(operationDate, "DD/MM/yyyy");
  return {
    validStockTicker: stockTicker !== "",
    validAmount: amount !== "" && !Number.isNaN(parseInt(amount, 10)),
    validPrice: price !== "" && !Number.isNaN(parseFloat(price)),
    validSide: side !== "",
    validOperationDate: date.isValid(),
  };
};

export default walletSlice.reducer;
