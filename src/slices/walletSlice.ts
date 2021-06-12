import {
  createSlice,
  AsyncThunk,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import moment from "moment";
import {
  createOperation,
  CreateOperationResponse,
  GetOperationsResponse,
  getOperations,
  Operation,
  updateOperation as updateOperationService,
  deleteOperation as deleteOperationService,
  UpdateOperationResponse,
  DeleteOperationResponse,
} from "services/operation";
import { getWalletSummary, WalletResponse } from "services/wallet";
import { formatCurrency } from "utils/formatters";
import type { AsyncThunkConfig, RootState } from "../store";

interface AddForm {
  stockTicker: string;
  operationDate: string;
  amount: string;
  price: string;
  side: "buy" | "sell" | "";
  showAddFormErrors: boolean;
}

interface EditForm {
  selectedOperation: number;
  selectedOperationText: string;
  operationDate: string;
  amount: string;
  price: string;
  side: "buy" | "sell" | "";
  showEditFormErrors: boolean;
}

interface WalletState {
  notificationMessage: string;
  status: "success" | "error" | "loading" | "";
  addModalVisible: boolean;
  editModalVisible: boolean;
  deleteModalVisible: boolean;
  wallet: WalletResponse | null;
  addForm: AddForm;
  editForm: EditForm;
  editingTicker: string;
  editingTickerOperations: Array<Operation>;
}

export const fetchEditingTickerOperations: AsyncThunk<
  GetOperationsResponse,
  void,
  AsyncThunkConfig
> = createAsyncThunk<GetOperationsResponse, void, AsyncThunkConfig>(
  "wallet/fetchEditingTickerOperations",
  async (_, { getState }) => {
    const { editingTicker } = getState().wallet;
    return Promise.resolve(getOperations(editingTicker));
  }
);

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

export const updateOperation: AsyncThunk<
  UpdateOperationResponse,
  void,
  AsyncThunkConfig
> = createAsyncThunk<UpdateOperationResponse, void, AsyncThunkConfig>(
  "wallet/updateOperation",
  async (_, { getState, dispatch }) => {
    const { wallet } = getState();
    const { editForm } = wallet;
    const { amount, operationDate, price, selectedOperation, side } = editForm;
    const {
      validAmount,
      validOperationDate,
      validPrice,
      validSelectedOperation,
      validSide,
    } = selectValidEditForm(getState());
    if (
      !validAmount ||
      !validOperationDate ||
      !validPrice ||
      !validSelectedOperation ||
      !validSide
    ) {
      dispatch(showEditFormErrors());
      throw new Error("invalid params");
    }

    const formatedDate = moment(operationDate, "DD/MM/yyyy").format(
      "yyyy-MM-DD"
    );
    const result = await updateOperationService(
      selectedOperation,
      formatedDate,
      side,
      parseInt(amount, 10),
      parseFloat(price),
      wallet.editingTicker
    );
    dispatch(fetchWalletSummary());

    return result;
  }
);

export const deleteOperation: AsyncThunk<
  DeleteOperationResponse,
  void,
  AsyncThunkConfig
> = createAsyncThunk<DeleteOperationResponse, void, AsyncThunkConfig>(
  "wallet/deleteOperation",
  async (_, { getState, dispatch }) => {
    const { wallet } = getState();
    const { editForm, editingTicker } = wallet;
    const { selectedOperation } = editForm;
    const result = await deleteOperationService(
      selectedOperation,
      editingTicker
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
  deleteModalVisible: false,
  editingTicker: "",
  editingTickerOperations: [],
  wallet: null,
  addForm: {
    showAddFormErrors: false,
    stockTicker: "",
    operationDate: moment().format("DD/MM/yyyy"),
    amount: "",
    price: "",
    side: "",
  },
  editForm: {
    selectedOperationText: "",
    amount: "",
    price: "",
    side: "",
    operationDate: "",
    selectedOperation: -1,
    showEditFormErrors: false,
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
    showEditModal: (state, action: PayloadAction<string>) => {
      state.editModalVisible = true;
      state.editingTicker = action.payload;
    },
    hideEditModal: (state) => {
      state.editModalVisible = false;
      state.deleteModalVisible = false;
      state.editingTicker = "";
      state.editForm = initialState.editForm;
    },
    showDeleteModal: (state, action: PayloadAction<string>) => {
      state.deleteModalVisible = true;
      state.editingTicker = action.payload;
    },
    hideDeleteModal: (state) => {
      state.deleteModalVisible = false;
      state.editingTicker = "";
      state.editForm = initialState.editForm;
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
    showEditFormErrors: (state) => {
      state.editForm.showEditFormErrors = true;
    },
    updateEditFormSelectedOperationText: (
      state,
      action: PayloadAction<string>
    ) => {
      state.editForm.selectedOperationText = action.payload;
    },
    updateEditFormSelectedOperation: (state, action: PayloadAction<number>) => {
      const operation = state.editingTickerOperations.filter(
        (it) => it.id === action.payload
      );
      if (operation.length === 1) {
        state.editForm.selectedOperation = action.payload;
        state.editForm.amount = operation[0].amount.toString();
        state.editForm.price = formatCurrency(operation[0].price);
        state.editForm.side = operation[0].side;
        state.editForm.operationDate = moment(
          operation[0].date,
          "yyyy-MM-DD"
        ).format("DD/MM/yyyy");
      }
    },
    updateEditFormAmount: (state, action: PayloadAction<string>) => {
      state.editForm.amount = action.payload;
    },
    updateEditFormPrice: (state, action: PayloadAction<string>) => {
      state.editForm.price = action.payload;
    },
    updateEditFormOperationDate: (state, action: PayloadAction<string>) => {
      state.editForm.operationDate = action.payload;
    },
    editFormSelectSide: (state, action: PayloadAction<"buy" | "sell">) => {
      state.editForm.side = action.payload;
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
    [fetchEditingTickerOperations.pending.type]: (state) => {
      state.status = "loading";
    },
    [fetchEditingTickerOperations.fulfilled.type]: (
      state,
      action: PayloadAction<GetOperationsResponse>
    ) => {
      state.status = "";
      state.editingTickerOperations = action.payload.data;
      state.addForm = initialState.addForm; // editing form
    },
    [fetchEditingTickerOperations.rejected.type]: (state) => {
      state.notificationMessage = "Houve um erro para editar as suas operações";
      state.status = "error";
      state.editModalVisible = false;
      state.editingTicker = "";
    },
    [updateOperation.pending.type]: (state) => {
      state.status = "loading";
    },
    [updateOperation.fulfilled.type]: (state) => {
      state.status = "success";
      state.notificationMessage = "Successo ao editar a operação";
      state.editModalVisible = false;
      state.editForm = initialState.editForm;
    },
    [updateOperation.rejected.type]: (state) => {
      state.notificationMessage = "Houve um erro para editar a operação";
      state.status = "error";
    },
    [deleteOperation.pending.type]: (state) => {
      state.status = "loading";
    },
    [deleteOperation.fulfilled.type]: (state) => {
      state.status = "success";
      state.notificationMessage = "Successo ao remover a operação";
      state.deleteModalVisible = false;
      state.editForm = initialState.editForm;
    },
    [deleteOperation.rejected.type]: (state) => {
      state.notificationMessage = "Houve um erro para remover a operação";
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
  updateEditFormSelectedOperationText,
  updateEditFormSelectedOperation,
  updateEditFormAmount,
  updateEditFormOperationDate,
  updateEditFormPrice,
  showEditFormErrors,
  editFormSelectSide,
  hideDeleteModal,
  showDeleteModal,
} = walletSlice.actions;

export const selectNotificationMessage = (state: RootState) =>
  state.wallet.notificationMessage;
export const selectAddModalVisible = (state: RootState) =>
  state.wallet.addModalVisible;
export const selectEditModalVisible = (state: RootState) =>
  state.wallet.editModalVisible || state.wallet.deleteModalVisible;
export const selectDeletingModalVisible = (state: RootState) =>
  state.wallet.deleteModalVisible;
export const selectWallet = (state: RootState) => state.wallet.wallet;
export const selectStatus = (state: RootState) => state.wallet.status;
export const selectStocks = (state: RootState) =>
  state.wallet.wallet ? state.wallet.wallet.stocks : [];
export const selectAddForm = (state: RootState) => state.wallet.addForm;
export const selectValidAddForm = (state: RootState) => {
  const { amount, operationDate, price, side, stockTicker } =
    state.wallet.addForm;
  const date = moment(operationDate, "DD/MM/yyyy");
  return {
    validStockTicker: stockTicker !== "",
    validAmount: amount !== "" && !Number.isNaN(parseInt(amount, 10)),
    validPrice: price !== "" && !Number.isNaN(parseFloat(price)),
    validSide: side !== "",
    validOperationDate: date.isValid(),
  };
};

export const selectEditingTickerOperations = (state: RootState) =>
  state.wallet.editingTickerOperations;

export const selectEditingTicker = (state: RootState) =>
  state.wallet.editingTicker;

export const selectEditForm = (state: RootState) => state.wallet.editForm;

export const selectValidEditForm = (state: RootState) => {
  const { amount, operationDate, price, selectedOperation, side } =
    state.wallet.editForm;
  const date = moment(operationDate, "DD/MM/yyyy");
  return {
    validAmount: amount !== "" && !Number.isNaN(parseInt(amount, 10)),
    validPrice: price !== "" && !Number.isNaN(parseFloat(price)),
    validOperationDate: date.isValid(),
    validSelectedOperation: selectedOperation !== -1,
    validSide: side !== "",
  };
};

export default walletSlice.reducer;
