import React from "react";
import { Redirect } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks";
import { selectStatus, getProfile, clearStatus } from "slices/profileSlice";
import { getUserSessionId } from "utils/userSession";
import Notification from "components/Notification";
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
    case "":
      if (getUserSessionId()) {
        dispatch(getProfile());
        return <div />;
      }
      return <Redirect to="/login" />;
    default:
      return (
        <AppPage>
          {status === "edit-profile-success" && (
            <Notification
              type="success"
              message="Seu perfil foi alterado com sucesso"
              onDismiss={() => dispatch(clearStatus())}
            />
          )}
          <Header>Configurações</Header>
          <ProfileContainer />
        </AppPage>
      );
  }
}
