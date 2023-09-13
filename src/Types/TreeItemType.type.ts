export type TreeItemType = {
  id: number;
  name: string;
  modalHandler: (type: string) => void;
  children: TreeItemType[] | [];
};
