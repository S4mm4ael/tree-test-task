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
      axios.get(newNodeUrl, {
        params: {
          treeName: treeName,
          parentNodeId: parentNodeId,
          nodeName: nodeName,
        },
      });
      return true;
    } catch (error) {
      console.log(error);
    }
  }
  static async deleteTreeNode(treeName: string, nodeId: number) {
    const deleteNodeUrl = this.baseUrl + "api.user.tree.node.delete";
    try {
      axios.get(deleteNodeUrl, {
        params: {
          treeName: treeName,
          nodeId: nodeId,
        },
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
