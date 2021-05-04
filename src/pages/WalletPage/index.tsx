import React from "react";

import { useAppSelector, useAppDispatch } from "hooks";

import Header from "components/Header";
import AppPage from "components/AppPage";

import { selectAddModalVisible, showAddModal } from "slices/walletSlice";

// import ProfileContainer from "./components/ProfileContainer";

import EmptyState from "./components/EmptyState";
import AddModal from "./components/AddModal";

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const addModalVisible = useAppSelector(selectAddModalVisible);

  return (
    <AppPage>
      <Header onClickAdd={() => dispatch(showAddModal())}>Carteira</Header>
      {addModalVisible && <AddModal />}
      {/* <ProfileContainer /> */}
      {!addModalVisible && <EmptyState />}
    </AppPage>
  );
}
