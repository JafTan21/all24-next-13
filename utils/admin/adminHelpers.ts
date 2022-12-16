import { usePathname } from "next/navigation";

export const getPrefix = () => {
  return usePathname()?.split("/")[1];
};

export const withAdminPrefix = (link: string) => {
  return "/" + getPrefix() + (link.startsWith("/") ? "" : "/") + link;
};
