import { IChildren } from "../../libs/interfaces";

export default function Td({
  children,
  className = "",
}: IChildren & { className?: string }) {
  return (
    <td
      className={`px-5 text-xs font-medium tracking-wider text-gray-700 uppercase md:px-1 ${className}`}
    >
      {children}
    </td>
  );
}
