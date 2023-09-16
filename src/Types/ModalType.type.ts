export type ModalType = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalProps: { type: string; id: number; currentName: string };
  fetchTree: (treeName: string) => Promise<any>;
  errorMessage: { message: string; show: boolean };
  setErrorMessage: React.Dispatch<
    React.SetStateAction<{ message: string; show: boolean }>
  >;
};
