import React from "react";
import { Switch, Route } from "react-router-dom";
import { useAppSelector } from "hooks";

import { selectStatus as selectStatusLogin } from "slices/loginSlice";
import { selectStatus as selectStatusRegister } from "slices/registerSlice";

import LoadingOverlay from "components/LoadingOverlay";
import Notification from "components/Notification";

import LoginCard from "./components/LoginCard";
import RegisterCard from "./components/RegisterCard";

import styles from "./style.module.css";

export default function AuthPage() {
  const statusLogin = useAppSelector(selectStatusLogin);
  const statusRegister = useAppSelector(selectStatusRegister);
  const loadingLogin = statusLogin === "loading";
  const loadingRegister = statusRegister === "loading";
  const errorLogin = statusLogin === "error";
  const errorRegister = statusRegister === "error";
  const errorMessage = errorLogin
    ? "Houve um problema ao tentar realizar o login"
    : "Houve um problema ao tentar realizar o cadastro";

  return (
    <div className={styles.container}>
      {(loadingLogin || loadingRegister) && <LoadingOverlay />}
      {(errorLogin || errorRegister) && (
        <Notification type="error" message={errorMessage} />
      )}
      <Switch>
        <Route path="/login" component={LoginCard} />
        <Route path="/register" component={RegisterCard} />
      </Switch>
    </div>
  );
}
