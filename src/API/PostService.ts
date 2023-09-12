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
}
