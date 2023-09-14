import { useState } from "react";
import { CreateNodeForm } from "../Forms";
import styles from "./styles.module.css";
import { createNode } from "../../../utils/utils";

export function Modal({
  visible,
  setVisible,
  modalProps,
  fetchTree,
}: {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalProps: { type: string; id: number };
  fetchTree: (treeName: string) => Promise<any>;
}) {
  const [name, setName] = useState("");
  const classes = [styles.ModalRegular];
  if (visible) {
    classes.push(styles.ModalRegular_active);
  }

  function handleFromSubmission() {
    if (modalProps.type === "add") {
      createNode("test__tree", modalProps.id, name);
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
            className={`${styles.ModalRegular__btn} ${styles.ModalRegular__btn_submit}`}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
}
