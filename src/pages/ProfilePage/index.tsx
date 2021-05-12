import React from "react";
import { Redirect } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks";
import { selectStatus, getProfile } from "slices/profileSlice";
import { getUserSessionId } from "utils/userSession";
import Header from "components/Header";
import AppPage from "components/AppPage";
import Loading from "components/LoadingOverlay";
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
      if (getUserSessionId()) {
        dispatch(getProfile());
        return <div />;
      }
      return <Redirect to="/login" />;
  }
}
