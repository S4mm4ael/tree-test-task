import React from "react";
import styles from "./styles.module.css";

export function RenameNodeForm({
  value,
  setValue,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <form className={styles.Form}>
      <input
        type="text"
        className={styles.Form__input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}
