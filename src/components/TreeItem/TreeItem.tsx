import React from "react";
import { TreeItemType } from "../../Types/TreeItemType.type";
import styles from "./styles.module.css";

export function TreeItem({ id, name, children, ...props }: TreeItemType) {
  return <div className={styles.TreeItem}>{name}</div>;
}
