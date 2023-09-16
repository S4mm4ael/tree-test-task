import React from "react";
import styles from "./style.module.css";

export function ErrorMessage({
  state,
  setErrorMessage,
}: {
  state: { message: string; show: boolean };
  setErrorMessage: React.Dispatch<
    React.SetStateAction<{ message: string; show: boolean }>
  >;
}) {
  let message = state.message;
  if (state.show) {
    message = "You have to delete all children nodes first";
  }

  return (
    <div
      className={` ${styles.ErrorMessage} ${
        state.show ? styles.ErrorMessage_active : ""
      }`}
    >
      <span>{message}</span>
      <button
        className={styles.ErrorMessage_btn}
        onClick={() => setErrorMessage({ message: "", show: false })}
        type="button"
      >
        <svg
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
          data-testid="CloseIcon"
        >
          <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
        </svg>
      </button>
    </div>
  );
}
