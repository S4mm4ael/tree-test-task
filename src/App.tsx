import React, { useEffect, useState } from "react";
import "./App.css";
import PostService from "./API/PostService";
import { Tree } from "./Types/Tree.type";

function App() {
  const [tree, setTree] = useState<Tree>();
  const [newNodeName, setNewNodeName] = useState("");
  const [changedNodeName, setChangedNodeName] = useState("");
  const [deleteNodeID, setDeleteNodeID] = useState(1);
  const [renameNodeID, setRenameNodeID] = useState(17358);

  async function fetchTree() {
    const treeData = PostService.getTree("test__tree");
    treeData.then((treeData) => {
      setTree(treeData);
    });
  }

  useEffect(() => {
    fetchTree();
  }, []);

  return (
    <div className="App">
      ID: {tree && tree.id}
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
          PostService.createTreeNode("test__tree", 17298, newNodeName).then(
            () => {
              fetchTree();
              setNewNodeName("");
            }
          );
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
          PostService.deleteTreeNode("test__tree", deleteNodeID).then(() => {
            fetchTree();
            setDeleteNodeID(0);
          });
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
          PostService.renameTreeNode(
            "test__tree",
            renameNodeID,
            changedNodeName
          ).then(() => {
            fetchTree();
            setChangedNodeName("");
          });
        }}
      >
        Rename node with ID {renameNodeID}
      </button>
    </div>
  );
}

export default App;
