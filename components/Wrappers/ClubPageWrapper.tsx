import { redirect } from "next/navigation";
import React from "react";
import useClub from "../../hooks/api/useClub";
import { IChildren } from "../../libs/interfaces";
import Loading from "../Html/Loading";
import ToastWrapper from "./ToastWrapper";

export default function ClubPageWrapper({ children }: IChildren) {
  const { club, isLoading } = useClub();

  if (isLoading) return <Loading />;
  if (!club) {
    redirect("/");
  }

  return <ToastWrapper>{children}</ToastWrapper>;
}
