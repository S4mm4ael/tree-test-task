import axios from "axios";

export default class PostService {
  static baseUrl = "https://test.vmarmysh.com/";

  static async getTree(treeName: string) {
    const treeUrl = this.baseUrl + "api.user.tree.get";
    try {
      const response = await axios.get(treeUrl, {
        params: {
          treeName: treeName,
        },
      });
      console.log("Get tree", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  static async createTreeNode(
    treeName: string,
    parentNodeId: number,
    nodeName: string
  ) {
    const newNodeUrl = this.baseUrl + "api.user.tree.node.create";
    try {
      const response = await axios.get(newNodeUrl, {
        params: {
          treeName: treeName,
          parentNodeId: parentNodeId,
          nodeName: nodeName,
        },
      });
      console.log("Create node");
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  static async deleteTreeNode(treeName: string, nodeId: number) {
    const deleteNodeUrl = this.baseUrl + "api.user.tree.node.delete";
    try {
      const response = await axios.get(deleteNodeUrl, {
        params: {
          treeName: treeName,
          nodeId: nodeId,
        },
      });
      console.log("deleteTreeNode");
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  static async renameTreeNode(
    treeName: string,
    nodeId: number,
    newNodeName: string
  ) {
    const newNodeUrl = this.baseUrl + "api.user.tree.node.rename";
    try {
      const response = await axios.get(newNodeUrl, {
        params: {
          treeName: treeName,
          nodeId: nodeId,
          newNodeName: newNodeName,
        },
      });
      console.log("renameTreeNode");
      console.log("test__tree", nodeId, newNodeName);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
