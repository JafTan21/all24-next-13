import { ReactElement, ReactNode } from "react";
import { ChangeEventHandler } from "react";
import { IChildren } from "../../libs/interfaces";

interface IInput {
  type?: "number" | "text" | "datetime-local" | "password" | "email";
  label?: string;
  name: string;
  value: string | number | undefined;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  required?: boolean;
  readonly?: boolean;
  children?: ReactElement;
  autoFocus?: boolean;
}

export default function Input(props: IInput) {
  return (
    <div className="my-2">
      <span className="text-gray-900 text-sm">{props.label}</span>
      <input
        value={props.value}
        onChange={props.onChange}
        type={props.type}
        step="any"
        name={props.name}
        required={props.required}
        readOnly={props.readonly}
        placeholder={props.label}
        className="w-full min-w-[100px] mt-1 text-sm bg-gray-200 text-gray-500 rounded-3xl px-4 py-2 appearance-none focus:outline-0"
      />
    </div>
  );
}

export function AdminInput(props: IInput) {
  return (
    <div className="my-3 text-left">
      <p className="text-gray-900">{props.label}</p>
      <input
        value={props.value}
        onChange={props.onChange}
        type={props.type}
        step="any"
        name={props.name}
        required={props.required}
        readOnly={props.readonly}
        placeholder={props.label}
        autoFocus={props.autoFocus}
        className="w-full min-w-[100px] text-sm border border-slate-200 rounded px-4 py-2 appearance-none focus:outline-0"
      />
    </div>
  );
}

export const AdminSelect = (
  props: IInput & {
    enableDefault?: boolean;
  } & IChildren
) => {
  return (
    <div className="my-2 text-left">
      <p className="text-gray-900">{props.label}</p>
      <select
        required={props.required}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
        className="block w-full  px-4 py-2 bg-transparent border border-slate-200 rounded appearance-none focus:outline-none"
      >
        <option value="" disabled={!props.enableDefault}>
          --- Select ---
        </option>
        {props.children}
      </select>
    </div>
  );
};
