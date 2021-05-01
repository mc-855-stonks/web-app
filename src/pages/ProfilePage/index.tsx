import React from "react";

import Header from "components/Header";
import AppPage from "components/AppPage";

import ProfileContainer from "./components/ProfileContainer";

export default function ProfilePage() {
  return (
    <AppPage>
      <Header>Configurações</Header>
      <ProfileContainer />
    </AppPage>
  );
}
