"use client";

import AuthButtons from "../../components/user/AuthButtons";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import React from "react";
import useUser from "../../hooks/api/useUser";
import LiveBalance from "./LiveBalance";

export default function Header() {
  const { user, isLoading } = useUser();

  return (
    <header className="bg-primary sticky top-0 z-50">
      <nav className="flex flex-wrap text-white items-center justify-between py-2">
        <LeftMenu />

        {user && <LiveBalance />}

        {!isLoading && (
          <>
            {user ? (
              <RightMenu />
            ) : (
              <div className="flex items-center">
                <AuthButtons />
              </div>
            )}
          </>
        )}
      </nav>
    </header>
  );
}
