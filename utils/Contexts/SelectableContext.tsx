import React, { createContext, useState } from "react";

type ISelectable = { [id: number]: boolean };

export const SelectableContext = createContext<{
  selected: ISelectable;
  selectedSet: React.Dispatch<React.SetStateAction<ISelectable>>;
}>({
  selected: {},
  selectedSet: (s) => {},
});

export const useSelactableContext = () => {
  const [selected, selectedSet] = useState<ISelectable>({});

  return {
    selectedSet,
    selected,
    resetSelected: () => {
      selectedSet({});
    },
  };
};
