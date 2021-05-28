import React, { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "hooks";

import Header from "components/Header";
import AppPage from "components/AppPage";
import LoadingOverlay from "components/LoadingOverlay";
import Notification from "components/Notification";

import {
  selectAddModalVisible,
  selectEditModalVisible,
  showAddModal,
  selectStatus as selectWalletStatus,
  fetchWalletSummary,
  selectStocks,
  selectNotificationMessage,
  clearStatus,
} from "slices/walletSlice";
import {
  fetchStocks,
  selectStatus as selectStockStatus,
} from "slices/stockSlice";

import AddModal from "./components/AddModal";
import EditModal from "./components/EditModal";
import Wallet from "./components/Wallet";
import EmptyState from "./components/EmptyState";

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const addModalVisible = useAppSelector(selectAddModalVisible);
  const editModalVisible = useAppSelector(selectEditModalVisible);
  const stocks = useAppSelector(selectStocks);
  const walletStatus = useAppSelector(selectWalletStatus);
  const stockStatus = useAppSelector(selectStockStatus);
  const loading = walletStatus === "loading" || stockStatus === "loading";
  const error = walletStatus === "error" || stockStatus === "error";
  const success = walletStatus === "success";
  const notificationMessage = useAppSelector(selectNotificationMessage);

  useEffect(() => {
    dispatch(fetchWalletSummary());
    dispatch(fetchStocks());
  }, [dispatch]);

  return (
    <AppPage>
      <Header onClickAdd={() => dispatch(showAddModal())}>Carteira</Header>
      {loading && <LoadingOverlay />}
      {error && (
        <Notification
          type="error"
          message={notificationMessage}
          onDismiss={() => dispatch(clearStatus())}
        />
      )}
      {success && (
        <Notification
          type="success"
          message={notificationMessage}
          onDismiss={() => dispatch(clearStatus())}
        />
      )}
      {addModalVisible && <AddModal />}
      {editModalVisible && <EditModal />}
      {stocks && stocks.length === 0 && !addModalVisible && !loading && (
        <EmptyState />
      )}
      {stocks && stocks.length > 0 && <Wallet />}
    </AppPage>
  );
}
