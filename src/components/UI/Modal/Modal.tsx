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
        {modalType}
      </div>
    </div>
  );
}
