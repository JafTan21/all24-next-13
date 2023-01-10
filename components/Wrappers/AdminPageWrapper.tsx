"use client";

import { redirect } from "next/navigation";
import React from "react";
import useAdmin from "../../hooks/api/admin/useAdmin";
import { IChildren } from "../../libs/interfaces";
import { getPrefix } from "../../utils/admin/adminHelpers";
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

  // check admin role and prefix
  const prefix = getPrefix();

  return (
    <ToastWrapper>
      {title && <p className="text-xl p-2">{title}</p>}
      {children}
    </ToastWrapper>
  );
}
