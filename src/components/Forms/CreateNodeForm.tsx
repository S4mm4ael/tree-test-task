import React from "react";
import styles from "./styles.module.css";

export function CreateNodeForm({
  value,
  setValue,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <form className={styles.Form} onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        className={styles.Form__input}
        placeholder="Node name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}
