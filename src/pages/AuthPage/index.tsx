import React from "react";
import { Switch, Route } from "react-router-dom";

import LoginCard from "./components/LoginCard";
import RegisterCard from "./components/RegisterCard";

import styles from "./style.module.css";

export default function AuthPage() {
  return (
    <div className={styles.container}>
      <Switch>
        <Route path="/login" component={LoginCard} />
        <Route path="/register" component={RegisterCard} />
      </Switch>
    </div>
  );
}
