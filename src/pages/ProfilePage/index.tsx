import React, { useEffect } from "react";
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
  const loading = status === "loading";

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <AppPage>
      {loading && <Loading />}
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
