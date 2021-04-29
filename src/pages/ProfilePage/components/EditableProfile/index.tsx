import React from "react";
import stylesEditableProfile from "./style.module.css";
import stylesProfilePage from "../../style.module.css";
import Title from "../../../../components/Title";
import EditableArea from "./EditableArea";

export default function EditableProfile() {
  return (
    <div className={stylesEditableProfile.container}>
      <Title className={stylesProfilePage.title}>Editar Dados</Title>
      <EditableArea />
    </div>
  );
}
