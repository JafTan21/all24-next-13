import Link from "next/link";
import { ReactElement } from "react";

interface IUserLink {
  href: string;
  text?: string;
  icon?: ReactElement;
  children?: ReactElement;
  className?: string;
  style?: object;
}

export const UserLinkButton = ({
  href,
  text,
  icon,
  children,
  className,
  style,
}: IUserLink) => {
  return (
    <Link
      href={href}
      className={`flex p-1 mx-1 font-bold text-white rounded-lg text-md px-3 py-2 ${className}`}
      style={style}
    >
      {icon}
      <span className=" capitalize m-auto">{text}</span>
      <>{children}</>
    </Link>
  );
};
