export type TreeItemType = {
  id: number;
  name: string;
  modalHandler: (type: string, id: number) => void;
  children: TreeItemType[] | [];
};
