import React from "react";
import stylesEditableProfile from "./style.module.css";
import stylesProfilePage from "../../style.module.css";
import Title from "../../../../components/Title";
import Button from "../../../../components/Button";
import EditableArea from "./EditableArea";

export default function EditableProfile() {
  return (
    <div className={stylesEditableProfile.container}>
      <Title className={stylesProfilePage.title}>Editar Dados</Title>
      <div className={stylesEditableProfile.profileContent}>
        <EditableArea />
        <Button value="SALVAR" style={{ width: 189, marginLeft: "auto" }} />
      </div>
    </div>
  );
}
