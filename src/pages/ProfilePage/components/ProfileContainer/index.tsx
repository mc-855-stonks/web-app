import React from "react";
import styles from "./style.module.css";
import EditableProfile from "../EditableProfile";
import ProductInfo from "../ProductInfo";

export default function ProfileContainer() {
  return (
    <div className={styles.container}>
      <EditableProfile />
      <ProductInfo />
    </div>
  );
}
