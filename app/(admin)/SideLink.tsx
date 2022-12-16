import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactElement } from "react";

interface Props {
  icon?: ReactElement;
  text: string;
  href: string;
  close: () => void;
}

const hrefWithAdminPrefix = (url: string) => {
  const pathname = usePathname();
  const prefix = pathname?.split("/")[1];

  const nweUrl = (url.startsWith("/") ? "" : "/") + url;

  return `/${prefix}${nweUrl}`;
};

export const SidebarLink = React.memo((props: Props) => {
  return (
    <Link
      href={hrefWithAdminPrefix(props.href)}
      className="flex items-center text-[17px] my-3 hover:text-blue-500 transition-all"
      onClick={props.close}
    >
      <span className="ml-3 text-xl">{props.icon}</span>
      <p className="ml-1">{props.text}</p>
    </Link>
  );
});
