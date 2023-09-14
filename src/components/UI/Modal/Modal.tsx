import { CreateNodeForm } from "../Forms";
import styles from "./styles.module.css";

export function Modal({
  visible,
  setVisible,
  modalType,
}: {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalType: string;
}) {
  const classes = [styles.ModalRegular];
  if (visible) {
    classes.push(styles.ModalRegular_active);
  }

  return (
    <div className={classes.join(" ")} onClick={() => setVisible(false)}>
      <div
        className={styles.ModalRegular__content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.ModalRegular__header}>
          <h6>{modalType}</h6>
        </div>
        <div className={styles.ModalRegular__form}>
          {modalType === "add" && <CreateNodeForm />}
        </div>
        <div className={styles.ModalRegular__footer}>
          <button className={styles.ModalRegular__btn}>CANCEL</button>
          <button
            className={`${styles.ModalRegular__btn} ${styles.ModalRegular__btn_submit}`}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
}
