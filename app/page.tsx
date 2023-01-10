import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default function Home() {
  redirect("/home");

  return (
    <div>
      <Link href={"/homes"}>Home</Link>
    </div>
  );
}
