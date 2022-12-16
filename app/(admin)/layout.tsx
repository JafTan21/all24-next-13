"use client";

import { redirect, usePathname } from "next/navigation";
import React from "react";
import { AdminConfig } from "../../app.config";
import Loading from "../../components/Html/Loading";
import useAdmin from "../../hooks/api/admin/useAdmin";
import { IChildren } from "../../libs/interfaces";
import AdminHeader from "./Header";

export default function AdminLayout({ children }: IChildren) {
  const pathname = usePathname();
  const { isLoading, admin } = useAdmin();

  if (!AdminConfig.prefixes.some((prefix) => pathname?.startsWith(prefix))) {
    redirect("/");
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <AdminHeader />
      {children}
    </>
  );
}
