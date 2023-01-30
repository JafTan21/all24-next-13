import axios from "axios";
import SubmitButton from "../../../../../components/Html/SubmitButton";
import useForm from "../../../../../hooks/useForm";
import { adminSuccessNotification } from "../../../../../utils/helpers/NotificationHelper";

const SendSMS = ({ refresh }: { refresh: () => void }) => {
  const { state, onChange, onSubmit, isSubmitting } = useForm({
    initialState: {
      text: "",
    },
    resetOnResolve: true,
    shouldConfirmBeforeSubmitting: true,
    submit: (state) => {
      return new Promise((resolve, reject) => {
        axios
          .post(`/admin/send-text-message`, state)
          .then((res) => {
            adminSuccessNotification(res.data.message);
            resolve(res.data);
            refresh();
          })
          .catch(reject);
      });
    },
  });

  return (
    <form onSubmit={onSubmit} className="mt-5 bg-white p-3">
      <p className="text-xl text-gray-500">Send Text Message:</p>
      <textarea
        value={state.text}
        name={"text"}
        onChange={onChange}
        rows={5}
        required={true}
        className="w-full border border-gray-300 shadow rounded px-3 py-2 focus:outline-none"
      ></textarea>

      <SubmitButton
        classNames="flex justify-center items-center w-full h-10 font-bold transition duration-300 bg-green-600 rounded text-indigo-50 hover:bg-green-500"
        isSubmitting={isSubmitting}
        text="Send"
      />
    </form>
  );
};

export { SendSMS };
