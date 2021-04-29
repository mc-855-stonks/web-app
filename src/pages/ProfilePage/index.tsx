import React from "react";
import styles from "./style.module.css";
import ProfileContainer from "./components/ProfileContainer";

export default function ProfilePage() {
  return (
    <div className={styles.container}>
      <ProfileContainer />
    </div>
  );
}
