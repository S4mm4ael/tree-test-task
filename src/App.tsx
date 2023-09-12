import React, { useEffect, useState } from "react";
import "./App.css";
import PostService from "./API/PostService";
import { Tree } from "./Types/Tree.type";

function App() {
  const [tree, setTree] = useState<Tree>();

  useEffect(() => {
    const treeData = PostService.getTree("test__tree");
    treeData.then((treeData) => {
      setTree(treeData);
      console.log(treeData);
    });
  }, []);

  return <div className="App">{tree && tree.id}</div>;
}

export default App;
