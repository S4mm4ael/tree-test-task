import { useEffect, useState } from "react";
import { CreateNodeForm, DeleteNodeForm, RenameNodeForm } from "../Forms";
import styles from "./styles.module.css";
import { createNode, deleteNode, renameNode } from "../../utils/utils";

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
  const [name, setName] = useState(modalProps.currentName);
  const classes = [styles.ModalRegular];
  if (visible) {
    classes.push(styles.ModalRegular_active);
  }

  useEffect(() => {
    setName(modalProps.currentName);
  }, [modalProps.currentName]);

  function handleFromSubmission() {
    if (modalProps.type === "add") {
      createNode("test__tree", modalProps.id, "");
      setVisible(false);
    }
    if (modalProps.type === "rename") {
      renameNode("test__tree", modalProps.id, name);
      setVisible(false);
    }
    if (modalProps.type === "delete") {
      deleteNode("test__tree", modalProps.id).catch(() => {
        console.log("Bad request");
        setVisible(true);
      });
      setVisible(false);
    }
    fetchTree("test__tree").finally(() => {
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
          {modalProps.type === "delete" && <DeleteNodeForm name={name} />}
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
