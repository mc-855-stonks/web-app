import React from "react";
import { Switch, Route } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks";

import {
  selectStatus as selectStatusLogin,
  clearStatus as clearStatusLogin,
} from "slices/loginSlice";
import {
  selectStatus as selectStatusRegister,
  clearStatus as clearStatusRegister,
} from "slices/registerSlice";

import LoadingOverlay from "components/LoadingOverlay";
import Notification from "components/Notification";

import LoginCard from "./components/LoginCard";
import RegisterCard from "./components/RegisterCard";

import backgroundImage from "./imgs/background.svg";

import styles from "./style.module.css";

export default function AuthPage() {
  const dispatch = useAppDispatch();
  const statusLogin = useAppSelector(selectStatusLogin);
  const statusRegister = useAppSelector(selectStatusRegister);
  const loadingLogin = statusLogin === "loading";
  const loadingRegister = statusRegister === "loading";
  const errorLogin = statusLogin === "error";
  const errorRegister = statusRegister === "error";
  const errorMessage = errorLogin
    ? "Houve um problema ao tentar realizar o login"
    : "Houve um problema ao tentar realizar o cadastro";

  const dismissNotification = () => {
    dispatch(clearStatusLogin());
    dispatch(clearStatusRegister());
  };

  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url("${backgroundImage}")` }}
    >
      {(loadingLogin || loadingRegister) && <LoadingOverlay />}
      {(errorLogin || errorRegister) && (
        <Notification
          type="error"
          message={errorMessage}
          onDismiss={dismissNotification}
        />
      )}
      <Switch>
        <Route path="/login" component={LoginCard} />
        <Route path="/register" component={RegisterCard} />
      </Switch>
    </div>
  );
}
