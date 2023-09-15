import { useEffect, useState } from "react";
import { CreateNodeForm, DeleteNodeForm, RenameNodeForm } from "../Forms";
import styles from "./styles.module.css";
import { createNode, deleteNode, renameNode } from "../../utils/utils";
import { ErrorMessage } from "../ErrorMessage";

type ModalType = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalProps: { type: string; id: number; currentName: string };
  fetchTree: (treeName: string) => Promise<any>;
  errorMessage: { message: string; show: boolean };
  setErrorMessage: React.Dispatch<
    React.SetStateAction<{ message: string; show: boolean }>
  >;
};

export function Modal({
  visible,
  setVisible,
  modalProps,
  fetchTree,
  errorMessage,
  setErrorMessage,
}: ModalType) {
  const [name, setName] = useState(modalProps.currentName);

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
      deleteNode("test__tree", modalProps.id)
        .then(() => setVisible(false))
        .catch(() => {
          setErrorMessage({
            message: "You have to delete all children nodes first",
            show: true,
          });
          setVisible(true);
        });
    }
    fetchTree("test__tree").finally(() => {
      setName("");
    });
  }

  return (
    <div
      className={` ${styles.ModalRegular} ${
        visible ? styles.ModalRegular_active : ""
      }`}
      onClick={() => setVisible(false)}
    >
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
          {modalProps.type === "delete" && !errorMessage.show && (
            <DeleteNodeForm name={name} />
          )}
          {errorMessage.message && <span>{errorMessage.message}</span>}
        </div>
        <div className={styles.ModalRegular__footer}>
          {errorMessage.message ? (
            <button
              onClick={() => {
                setVisible(false);
                setErrorMessage({
                  message: "",
                  show: true,
                });
              }}
              className={styles.ModalRegular__btn}
              style={{ width: "100%" }}
            >
              CLOSE
            </button>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
