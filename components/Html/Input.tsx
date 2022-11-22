import { ReactElement } from "react";
import { ChangeEventHandler } from "react";

interface IInput {
  type?: "number" | "text" | "password" | "email";
  label: string;
  name: string;
  value: string | number | undefined;
  onChange: ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  readonly?: boolean;
  children?: ReactElement;
}

export default function Input(props: IInput) {
  return (
    <div className="my-2">
      <span className="text-gray-900 text-sm">{props.label}</span>
      <input
        value={props.value}
        onChange={props.onChange}
        type={props.type}
        name={props.name}
        required={props.required}
        readOnly={props.readonly}
        placeholder={props.label}
        className="w-full mt-1 text-sm
            bg-gray-200 text-gray-500 rounded-3xl px-4 py-2 appearance-none focus:outline-0"
      />
    </div>
  );
}
