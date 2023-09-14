import React from "react";
import styles from "./styles.module.css";

export function DeleteNodeForm({ name }: { name: string }) {
  return <p>Do you want to delete {name}</p>;
}
