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
        <b>{name} </b>
        <button className={styles.TreeItem__btn} onClick={handleTreeShowing}>
          {showTree ? (
            <svg
              focusable="false"
              style={{ fill: "black" }}
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="ChevronRightIcon"
            >
              <path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
            </svg>
          ) : (
            <svg
              focusable="false"
              style={{ fill: "black" }}
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="ExpandMoreIcon"
            >
              <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
            </svg>
          )}
        </button>
        <button
          className={styles.TreeItem__btn}
          onClick={() => modalHandler("add", id, "")}
        >
          <svg
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="AddCircleOutlineOutlinedIcon"
          >
            <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
          </svg>
        </button>
        {id === 17298 ? (
          ""
        ) : (
          <>
            {" "}
            <button
              className={styles.TreeItem__btn}
              onClick={() => modalHandler("rename", id, name)}
            >
              <svg
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="EditOutlinedIcon"
              >
                <path d="m14.06 9.02.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"></path>
              </svg>
            </button>
            <button
              className={`${styles.TreeItem__btn} ${styles.TreeItem__btn_del}`}
              onClick={() => modalHandler("delete", id, name)}
            >
              <svg
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="DeleteForeverIcon"
              >
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12 1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"></path>
              </svg>
            </button>
          </>
        )}
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
