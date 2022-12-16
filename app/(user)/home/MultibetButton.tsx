import { useContext, useState } from "react";
import { MultibetContext } from "./Multibet";
import MultibetModal from "./MultibetModal";

export default function MultibetButton() {
  const { betsForMultibet } = useContext(MultibetContext);
  const [show, showSet] = useState<boolean>(false);

  return betsForMultibet.length > 0 ? (
    <>
      <div className="fixed p-4 bottom-5 right-5">
        <button
          onClick={() => showSet(true)}
          className="px-3 py-1 text-gray-900 bg-green-500 rounded-md hover:shadow"
        >
          multibet ({betsForMultibet.length})
        </button>
      </div>
      <MultibetModal show={show} showSet={showSet} />{" "}
    </>
  ) : null;
}
