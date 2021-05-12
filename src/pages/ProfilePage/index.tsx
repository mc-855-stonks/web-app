import React from "react";
import { useAppDispatch, useAppSelector } from "hooks";
import { selectStatus, getProfile } from "slices/profileSlice";
import Header from "components/Header";
import AppPage from "components/AppPage";
import Loading from "components/Loading";
import ProfileContainer from "./components/ProfileContainer";

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);

  switch (status) {
    case "loading":
      return <Loading />;
    case "success":
      return (
        <AppPage>
          <Header>Configurações</Header>
          <ProfileContainer />
        </AppPage>
      );
    default:
      dispatch(getProfile());
      return <div />;
  }
}
