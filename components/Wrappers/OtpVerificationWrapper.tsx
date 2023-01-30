import moment from "moment";
import { useEffect, useState } from "react";
import { IChildren } from "../../libs/interfaces";
import SubmitButton from "../Html/SubmitButton";

export default function OtpVerificationWrapper({
  children,
  form_step,
  onSubmit,
  user_number,
  onChange,
  otp,
  resend,
  isSubmitting,
  end,
}: {
  form_step: number;
  user_number?: string;
  otp: string;
  isSubmitting: boolean;
  end: moment.Moment | undefined;

  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  resend: () => void;
} & IChildren) {
  if (form_step == 2) {
    return (
      <form onSubmit={onSubmit}>
        <div className="flex align-center justify-between flex-col mb-3">
          <p className="text-gray-500">
            OTP sent to:
            <span className="ml-1">{user_number || <i>your number</i>}</span>
          </p>

          {end && <TimeLeft end={end} />}
        </div>

        <div>
          <input
            className="border-2 px-2 py-2 rounded focus:outline-0 border-gray-200"
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={onChange}
            name="otp"
          />
          <button
            type="button"
            onClick={resend}
            className="m-1 bg-blue-500 p-2 text-white rounded"
          >
            Resend
          </button>
        </div>
        <SubmitButton isSubmitting={isSubmitting} text="Login" />
      </form>
    );
  }

  return <>{children}</>;
}

const TimeLeft = ({ end }: { end: moment.Moment }) => {
  const [left, leftSet] = useState<number>(0);

  useEffect(() => {
    const int = setInterval(() => {
      leftSet((prev) => (prev >= 0 ? end.diff(moment(), "seconds") : 0));

      if (left < 0) clearInterval(int);
    }, 1000);

    return () => {
      clearInterval(int);
    };
  }, [end]);

  return (
    <p className="text-gray-400">
      Code will expire in:
      {left > 0 ? moment.utc(left * 1000).format("mm:ss") : 0}
    </p>
  );
};
