import React, { useContext } from "react";
import { Status } from "../../libs/Status";
import { SelectableContext } from "../../utils/Contexts/SelectableContext";

export default function SelectInput({
  id,
  status,
}: {
  id: number;
  status: number;
}) {
  const { selected, selectedSet } = useContext(SelectableContext);

  if (status != Status.Pending) return null;

  return (
    <input
      checked={selected[id]}
      onChange={(e) => {
        selectedSet((prev) => {
          return {
            ...prev,
            [id]: !selected[id],
          };
        });
      }}
      type="checkbox"
    />
  );
}
