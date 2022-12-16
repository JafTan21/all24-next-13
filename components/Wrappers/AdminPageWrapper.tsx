"use client";

import { redirect } from "next/navigation";
import React from "react";
import useAdmin from "../../hooks/api/admin/useAdmin";
import { IChildren } from "../../libs/interfaces";
import ToastWrapper from "./ToastWrapper";

export default function AdminPageWrapper({
  children,
  title,
}: IChildren & {
  title?: string;
}) {
  const { admin } = useAdmin();

  if (!admin) {
    redirect("/home");
  }

  return (
    <ToastWrapper>
      {title && <p className="text-xl p-2">{title}</p>}
      {children}
    </ToastWrapper>
  );
}
