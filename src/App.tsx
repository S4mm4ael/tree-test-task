import { createContext, useEffect, useState } from "react";
import "./App.css";
import { TreeItemType } from "./Types/TreeItemType.type";
import { TreeItem } from "./components/TreeItem";
import { createNode, deleteNode, fetchTree, renameNode } from "./utils/utils";
import { Modal } from "./components/UI/Modal/";

//const GlobalContext = createContext({ showModal: false });

function App() {
  const [tree, setTree] = useState<TreeItemType>();
  const [newNodeName, setNewNodeName] = useState("");
  const [changedNodeName, setChangedNodeName] = useState("");
  const [deleteNodeID, setDeleteNodeID] = useState(1);
  const [renameNodeID, setRenameNodeID] = useState(17340);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");

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
  function modalHandler(type: string) {
    setModalType(type);
    setShowModal(true);
  }
  useEffect(() => {
    const response = fetchTree("test__tree");
    response.then((data) => setTree(data));
  }, []);

  return (
    <div className="App">
      <Modal
        visible={showModal}
        setVisible={setShowModal}
        modalType={modalType}
      />
      <input
        type="text"
        name="newNode"
        id=""
        value={newNodeName}
        onChange={(e) => setNewNodeName(e.target.value)}
        placeholder="Add new node"
      />
      <button
        onClick={() => {
          createNode("test__tree", 17298, newNodeName)
            .then(() => fetchTree("test__tree"))
            .then((data) => setTree(data));
          setNewNodeName("");
        }}
      >
        add node {newNodeName}
      </button>
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
