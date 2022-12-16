"use client";

import useClub from "../../hooks/api/useClub";
import LeftMenu from "./LeftMenu";

export default function Header() {
  const { club, isLoading } = useClub();

  if (isLoading) return null;

  return (
    <header className="bg-primary sticky top-0 z-50">
      <nav className="flex flex-wrap text-white items-center  py-2">
        <LeftMenu />
        <p className="mx-2"> ({club.name})</p>
      </nav>
    </header>
  );
}
