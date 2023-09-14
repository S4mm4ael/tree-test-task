import { useEffect, useState } from "react";
import { CreateNodeForm, DeleteNodeForm, RenameNodeForm } from "../Forms";
import styles from "./styles.module.css";
import { createNode, deleteNode } from "../../utils/utils";

type ModalType = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalProps: { type: string; id: number; currentName: string };
  fetchTree: (treeName: string) => Promise<any>;
};

export function Modal({
  visible,
  setVisible,
  modalProps,
  fetchTree,
}: ModalType) {
  const [name, setName] = useState("");
  const classes = [styles.ModalRegular];
  if (visible) {
    classes.push(styles.ModalRegular_active);
  }

  useEffect(() => {
    console.log(modalProps);
  }, [handleFromSubmission]);

  function handleFromSubmission() {
    if (modalProps.type === "add") {
      createNode("test__tree", modalProps.id, name);
    }
    if (modalProps.type === "rename") {
      createNode("test__tree", modalProps.id, name);
    }
    if (modalProps.type === "delete") {
      deleteNode("test__tree", modalProps.id);
    }
    fetchTree("test__tree").finally(() => {
      setVisible(false);
      setName("");
    });
  }

  return (
    <div className={classes.join(" ")} onClick={() => setVisible(false)}>
      <div
        className={styles.ModalRegular__content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.ModalRegular__header}>
          <h6>{modalProps.type}</h6>
        </div>
        <div className={styles.ModalRegular__form}>
          {modalProps.type === "add" && (
            <CreateNodeForm value={name} setValue={setName} />
          )}
          {modalProps.type === "rename" && (
            <RenameNodeForm value={name} setValue={setName} />
          )}
          {modalProps.type === "delete" && (
            <DeleteNodeForm name={modalProps.currentName} />
          )}
        </div>
        <div className={styles.ModalRegular__footer}>
          <button
            onClick={() => setVisible(false)}
            className={styles.ModalRegular__btn}
          >
            CANCEL
          </button>
          <button
            onClick={handleFromSubmission}
            className={`${styles.ModalRegular__btn} ${
              modalProps.type === "delete"
                ? styles.ModalRegular__btn_delete
                : styles.ModalRegular__btn_submit
            } `}
          >
            {modalProps.type.toUpperCase()}
          </button>
        </div>
      </div>
    </div>
  );
}
