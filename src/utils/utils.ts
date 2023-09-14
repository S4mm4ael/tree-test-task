import PostService from "../API/PostService";

export function fetchTree(treeName: string) {
  const treeData = PostService.getTree("test__tree");
  return treeData;
}

export async function createNode(
  treeName: string,
  parentNodeId: number,
  newNodeName: string
) {
  const response = await PostService.createTreeNode(
    treeName,
    parentNodeId,
    newNodeName
  );
  return response;
}

export async function deleteNode(treeName: string, nodeId: number) {
  const response = PostService.deleteTreeNode(treeName, nodeId);
  return response;
}

export function renameNode(
  treeName: string,
  renameNodeID: number,
  changedNodeName: string
) {
  const response = PostService.renameTreeNode(
    treeName,
    renameNodeID,
    changedNodeName
  );
  return response;
}
