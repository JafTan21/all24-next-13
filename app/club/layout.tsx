"use client";

import { redirect } from "next/navigation";
import React from "react";
import Loading from "../../components/Html/Loading";
import useClub from "../../hooks/api/useClub";
import { IChildren } from "../../libs/interfaces";
import Header from "./Header";

export default function ClubLayout({ children }: IChildren) {
  const { isLoading, club } = useClub();

  if (isLoading) {
    return <Loading />;
  }

  if (!club) {
    redirect("/");
  }

  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
