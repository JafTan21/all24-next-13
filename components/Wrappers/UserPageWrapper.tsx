"use client";

import { redirect } from "next/navigation";
import React from "react";
import useUser from "../../hooks/api/useUser";
import { IChildren } from "../../libs/interfaces";
import Loading from "../Html/Loading";
import ToastWrapper from "./ToastWrapper";

export default function UserPageWrapper({ children }: IChildren) {
  const { user, isLoading } = useUser();

  if (isLoading) return <Loading />;
  if (!user) {
    redirect("/login");
  }

  return <ToastWrapper>{children}</ToastWrapper>;
}
