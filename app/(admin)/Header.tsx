import React from "react";
import useAdmin from "../../hooks/api/admin/useAdmin";
import LeftMenu from "./LeftMenu";

export default function AdminHeader() {
  const { admin } = useAdmin();

  if (!admin) return null;

  return (
    <header className="bg-white sticky top-0 z-50">
      <nav className="flex flex-wrap text-white items-center justify-between py-4">
        <LeftMenu />
      </nav>
    </header>
  );
}
