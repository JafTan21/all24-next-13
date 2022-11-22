import { ReactNode } from "react";
import Header from "./Header";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <footer>footer</footer>
    </>
  );
}
