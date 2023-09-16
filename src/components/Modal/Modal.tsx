import { useEffect, useState } from "react";
import { CreateNodeForm, DeleteNodeForm, RenameNodeForm } from "../Forms";
import styles from "./styles.module.css";
import { createNode, deleteNode, renameNode } from "../../utils/utils";
import { ModalType } from "../../Types/ModalType.type";
import { Spinner } from "../Spinner";

export function Modal({
  visible,
  setVisible,
  modalProps,
  fetchTree,
  errorMessage,
  setErrorMessage,
}: ModalType) {
  const [name, setName] = useState(modalProps.currentName);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setName(modalProps.currentName);
  }, [modalProps.currentName]);

  function handleFormSubmission() {
    if (modalProps.type === "add") {
      setIsLoading(true);
      createNode("test__tree", modalProps.id, name).finally(() => {
        setVisible(false);
        setIsLoading(false);
      });
    }
    if (modalProps.type === "rename") {
      setIsLoading(true);
      renameNode("test__tree", modalProps.id, name).finally(() => {
        setVisible(false);
        setIsLoading(false);
      });
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
        })
        .finally(() => {
          setIsLoading(false);
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
        {isLoading ? (
          <Spinner />
        ) : (
          <div className={styles.ModalRegular__form}>
            {modalProps.type === "add" && (
              <CreateNodeForm value={name} setValue={setName} />
            )}
            {modalProps.type === "rename" && (
              <RenameNodeForm value={name} setValue={setName} />
            )}
            {modalProps.type === "delete" && !errorMessage.message && (
              <DeleteNodeForm name={name} />
            )}
            {errorMessage.message && <span>{errorMessage.message}</span>}
          </div>
        )}

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
                onClick={handleFormSubmission}
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
