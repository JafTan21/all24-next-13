import Link from "next/link";
import { ReactElement } from "react";

interface IMenuLink {
  text: string;
  icon: ReactElement;
  href: string;
  close: () => void;
}
export const SideLink = (props: IMenuLink) => {
  return (
    <Link
      onClick={props.close}
      href={props.href}
      className="flex items-center py-3  border-b hover:bg-gray-100 border-gray-200"
      style={{
        fontSize: "12px",
        color: "#072443",
        fontWeight: 700,
        lineHeight: 1.25,
        fontFamily: "Roboto,sans-serif",
      }}
    >
      <span className="px-3">{props.icon}</span>
      <span className="">{props.text}</span>
    </Link>
  );
};
