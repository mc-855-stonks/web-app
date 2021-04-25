import React from "react";

import LoginCard from "./components/LoginCard";

import styles from "./style.module.css";

export default function AuthPage() {
  return (
    <div className={styles.container}>
      <LoginCard />
    </div>
  );
}
