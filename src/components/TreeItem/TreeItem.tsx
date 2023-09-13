import React, { useState } from "react";
import { TreeItemType } from "../../Types/TreeItemType.type";
import styles from "./styles.module.css";

export function TreeItem({ id, name, children, modalHandler }: TreeItemType) {
  const [showTree, setShowTree] = useState(false);

  function handleTreeShowing() {
    const treeStatus = showTree ? false : true;
    setShowTree(treeStatus);
  }
  return (
    <div className={styles.TreeItem}>
      <div className={styles.TreeItem__wrapper}>
        Name: <b>{name} </b>
        ID: <b>{id}</b>
        <button onClick={handleTreeShowing}>Show</button>
        <button onClick={() => modalHandler("add")}>add</button>
        <button onClick={() => modalHandler("rename")}>rename</button>
        <button onClick={() => modalHandler("delete")}>delete</button>
      </div>

      {children &&
        showTree &&
        children.map((item) => (
          <div key={item.id} className={styles.TreeItem__children}>
            <TreeItem
              id={item.id}
              name={item.name}
              children={item.children}
              modalHandler={modalHandler}
            />
          </div>
        ))}
    </div>
  );
}
