import React from "react";
import stylesEditableProfile from "./style.module.css";
import Subtitle from "../../../../components/Subtitle";
import Button from "../../../../components/Button";
import EditableArea from "./EditableArea";

export default function EditableProfile() {
  return (
    <div className={stylesEditableProfile.container}>
      <Subtitle>Editar Dados</Subtitle>
      <div className={stylesEditableProfile.profileContent}>
        <EditableArea />
        <Button value="SALVAR" style={{ width: 189, marginLeft: "auto" }} />
      </div>
    </div>
  );
}
