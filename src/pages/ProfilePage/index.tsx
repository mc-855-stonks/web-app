import React from "react";
import styles from "./style.module.css";
import Header from "../../components/Header";
import ProfileContainer from "./components/ProfileContainer";

export default function ProfilePage() {
  return (
    <div className={styles.container}>
      <Header>Configurações</Header>
      <ProfileContainer />
    </div>
  );
}
