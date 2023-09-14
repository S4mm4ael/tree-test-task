import { useEffect, useRef, useState } from "react";
import "./App.css";
import { TreeItemType } from "./Types/TreeItemType.type";
import { TreeItem } from "./components/TreeItem";
import { deleteNode, fetchTree, renameNode } from "./utils/utils";
import { Modal } from "./components/Modal/";

function App() {
  const [tree, setTree] = useState<TreeItemType>();
  const [changedNodeName, setChangedNodeName] = useState("");
  const [deleteNodeID, setDeleteNodeID] = useState(1);
  const [renameNodeID, setRenameNodeID] = useState(17340);
  const [showModal, setShowModal] = useState(false);
  const [modalProps, setModalProps] = useState({
    type: "add",
    id: 17298,
    currentName: "test__tree",
  });
  const initialRender = useRef(true);

  function renderTree() {
    if (tree?.children) {
      return (
        <TreeItem
          key={tree.id}
          id={tree.id}
          name={tree.name}
          children={tree.children}
          modalHandler={modalHandler}
        />
      );
    }
    return <span>There is no Tree</span>;
  }
  function modalHandler(type: string, id: number, currentName: string) {
    setModalProps({
      type: type,
      id: id,
      currentName: currentName,
    });
    console.log(type, id, currentName);
    setShowModal(true);
  }
  // useEffect(() => {
  //   if (!initialRender.current) {
  //     console.log(modalProps);
  //     setShowModal(true);
  //   } else {
  //     initialRender.current = false;
  //   }
  // }, [modalProps]);
  useEffect(() => {
    if (showModal === false) {
      const response = fetchTree("test__tree");
      response.then((data) => setTree(data));
    }
  }, [showModal]);

  return (
    <div className="App">
      <Modal
        visible={showModal}
        setVisible={setShowModal}
        modalProps={modalProps}
        fetchTree={fetchTree}
      />
      <input
        type="number"
        name="deleteNode"
        id=""
        value={deleteNodeID}
        onChange={(e) => setDeleteNodeID(+e.target.value)}
        placeholder="Enter delete node ID"
      />
      <button
        onClick={() => {
          deleteNode("test__tree", deleteNodeID)
            .then(() => fetchTree("test__tree"))
            .then((data) => setTree(data));
          setDeleteNodeID(0);
        }}
      >
        Delete node with ID {deleteNodeID}
      </button>
      <input
        type="text"
        name="changeNode"
        id=""
        value={changedNodeName}
        onChange={(e) => setChangedNodeName(e.target.value)}
        placeholder="Enter new name"
      />
      <button
        onClick={() => {
          renameNode("test__tree", renameNodeID, changedNodeName)
            .then(() => fetchTree("test__tree"))
            .then((data) => setTree(data));
          setChangedNodeName("");
        }}
      >
        Rename node with ID {renameNodeID}
      </button>
      <div className="App__treeWrapper">{renderTree()}</div>
    </div>
  );
}

export default App;
