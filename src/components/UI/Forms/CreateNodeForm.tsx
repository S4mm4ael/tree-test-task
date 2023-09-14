import React from "react";
import styles from "./styles.module.css";

export function CreateNodeForm() {
  return (
    <form className={styles.Form}>
      <input
        type="text"
        className={styles.Form__input}
        placeholder="Node name"
      />
    </form>
  );
}
