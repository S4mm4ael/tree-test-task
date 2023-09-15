import { useEffect, useState } from "react";
import "./App.css";
import { TreeItemType } from "./Types/TreeItemType.type";
import { TreeItem } from "./components/TreeItem";
import { fetchTree } from "./utils/utils";
import { Modal } from "./components/Modal/";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import { ErrorMessage } from "./components/ErrorMessage";

type modalPropsType = {
  type: string;
  id: number;
  currentName: string;
};

function App() {
  const [tree, setTree] = useState<TreeItemType>();
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    message: "",
    show: false,
  });
  const [modalProps, setModalProps] = useStateWithCallbackLazy<modalPropsType>({
    type: "",
    id: 17298,
    currentName: "",
  });

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
    setModalProps(
      {
        type: type,
        id: id,
        currentName: currentName,
      },
      () => {
        setShowModal(true);
      }
    );
  }

  useEffect(() => {
    const response = fetchTree("test__tree");
    response.then((data) => setTree(data));
  }, [showModal]);

  return (
    <div className="App">
      <ErrorMessage state={errorMessage} setErrorMessage={setErrorMessage} />
      <Modal
        visible={showModal}
        setVisible={setShowModal}
        modalProps={modalProps}
        fetchTree={fetchTree}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
      <div className="App__treeWrapper">{renderTree()}</div>
    </div>
  );
}
export default App;
