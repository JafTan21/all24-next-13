import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { Status } from "../../libs/Status";

interface Props {
  update: (state: any) => void;
}

const ActionButtons = (props: Props) => {
  return (
    <>
      <button
        onClick={(e) => {
          props.update({
            status: Status.Approved,
          });
        }}
        title="approve"
        className="bg-green-600 text-white p-2 rounded"
      >
        <TiTick fontSize={18} />
      </button>
      <button
        onClick={(e) => {
          props.update({
            status: Status.Rejected,
          });
        }}
        title="reject"
        className="ml-2 bg-red-600 text-white p-2 rounded"
      >
        <ImCross fontSize={18} />
      </button>
    </>
  );
};

export default ActionButtons;
