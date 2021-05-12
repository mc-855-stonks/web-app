import React from "react";
import { Switch, Route } from "react-router-dom";
import { useAppSelector } from "hooks";

import { selectStatus as selectStatusLogin } from "slices/loginSlice";
import { selectStatus as selectStatusRegister } from "slices/registerSlice";

import LoadingOverlay from "components/LoadingOverlay";

import LoginCard from "./components/LoginCard";
import RegisterCard from "./components/RegisterCard";

import styles from "./style.module.css";

export default function AuthPage() {
  const loadingLogin = useAppSelector(selectStatusLogin) === "loading";
  const loadingRegister = useAppSelector(selectStatusRegister) === "loading";

  return (
    <div className={styles.container}>
      {(loadingLogin || loadingRegister) && <LoadingOverlay />}
      <Switch>
        <Route path="/login" component={LoginCard} />
        <Route path="/register" component={RegisterCard} />
      </Switch>
    </div>
  );
}
