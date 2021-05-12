import React from "react";

import { useAppSelector, useAppDispatch } from "hooks";

import Header from "components/Header";
import AppPage from "components/AppPage";

import {
  selectAddModalVisible,
  selectEditModalVisible,
  showAddModal,
} from "slices/walletSlice";

import AddModal from "./components/AddModal";
import EditModal from "./components/EditModal";
import Wallet from "./components/Wallet";
import EmptyState from "./components/EmptyState";

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const addModalVisible = useAppSelector(selectAddModalVisible);
  const editModalVisible = useAppSelector(selectEditModalVisible);

  return (
    <AppPage>
      <Header onClickAdd={() => dispatch(showAddModal())}>Carteira</Header>
      {addModalVisible && <AddModal />}
      {editModalVisible && <EditModal />}
      {!addModalVisible && <EmptyState />}
      <Wallet />
    </AppPage>
  );
}
