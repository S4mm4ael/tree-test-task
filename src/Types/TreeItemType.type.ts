export type TreeItemType = {
  id: number;
  name: string;
  modalHandler: (type: string, id: number, currentName: string) => void;
  children: TreeItemType[] | [];
};
