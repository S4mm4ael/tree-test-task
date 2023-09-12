import React, { useEffect, useState } from "react";
import "./App.css";
import PostService from "./API/PostService";
import { Tree } from "./Types/Tree.type";

function App() {
  const [tree, setTree] = useState<Tree>();
  const [newNodeName, setNewNodeName] = useState("");
  const [isCreated, setIsCreated] = useState(false);

  useEffect(() => {
    const treeData = PostService.getTree("test__tree");
    treeData.then((treeData) => {
      setTree(treeData);
      setIsCreated(false);
      console.log(treeData);
    });
  }, [isCreated]);

  return (
    <div className="App">
      ID: {tree && tree.id}
      <button
        onClick={() => {
          PostService.createTreeNode("test__tree", 17298, newNodeName);
          setIsCreated(true);
          setNewNodeName("");
        }}
      >
        add node
      </button>
      {newNodeName}
      <input
        type="text"
        name="newNode"
        id=""
        value={newNodeName}
        onChange={(e) => setNewNodeName(e.target.value)}
        autoComplete="false"
      />
    </div>
  );
}

export default App;
