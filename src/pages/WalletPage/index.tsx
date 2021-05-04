import React from "react";

import Header from "components/Header";
import AppPage from "components/AppPage";

// import ProfileContainer from "./components/ProfileContainer";

import EmptyState from "./components/EmptyState";

export default function ProfilePage() {
  return (
    <AppPage>
      <Header onClickAdd={() => {}}>Carteira</Header>
      {/* <ProfileContainer /> */}
      <EmptyState />
    </AppPage>
  );
}
