import React from "react";
import { useAppDispatch } from "hooks";
import { editProfile } from "slices/profileSlice";
import stylesEditableProfile from "./style.module.css";
import Subtitle from "../../../../components/Subtitle";
import Button from "../../../../components/Button";
import EditableArea from "./EditableArea";

export default function EditableProfile() {
  const dispatch = useAppDispatch();

  return (
    <div className={stylesEditableProfile.container}>
      <Subtitle>Editar Dados</Subtitle>
      <div className={stylesEditableProfile.profileContent}>
        <EditableArea />
        <Button
          value="SALVAR"
          style={{ width: 189, marginLeft: "auto" }}
          onClick={() => dispatch(editProfile())}
        />
      </div>
    </div>
  );
}
