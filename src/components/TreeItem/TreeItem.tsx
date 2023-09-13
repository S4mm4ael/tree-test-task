import React, { useState } from "react";
import { TreeItemType } from "../../Types/TreeItemType.type";
import styles from "./styles.module.css";

export function TreeItem({ id, name, children, ...props }: TreeItemType) {
  const [showTree, setShowTree] = useState(false);

  function handleTreeShowing() {
    const treeStatus = showTree ? false : true;
    setShowTree(treeStatus);
  }
  return (
    <div className={styles.TreeItem}>
      <div className={styles.TreeItem__wrapper}>
        <b>
          Name:{name} ID: {id}
        </b>
        <button onClick={handleTreeShowing}>Show</button>
      </div>

      {children &&
        showTree &&
        children.map((item) => (
          <div key={item.id} className={styles.TreeItem__children}>
            <TreeItem id={item.id} name={item.name} children={item.children} />
          </div>
        ))}
    </div>
  );
}
