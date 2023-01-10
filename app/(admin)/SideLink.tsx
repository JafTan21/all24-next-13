import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactElement } from "react";
import { getPrefix } from "../../utils/admin/adminHelpers";

interface Props {
  icon?: ReactElement;
  text: string;
  href: string;
  close: () => void;
}

export const hrefWithAdminPrefix = (url: string) => {
  const prefix = getPrefix();

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
