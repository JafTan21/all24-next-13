"use client";

import Link from "next/link";
import { useState } from "react";
import { AdminInput } from "../../../../components/Html/Input";
import { withAdminPrefix } from "../../../../utils/admin/adminHelpers";

export const GoToClub = () => {
  const [club_name, club_nameSet] = useState("");
  return (
    <div className="px-2 py-4 bg-green-400">
      <div className="">
        <AdminInput
          name="club_name"
          value={club_name}
          onChange={(e) => club_nameSet(e.target.value)}
          label="Club Name"
          type="text"
        />
      </div>
      <Link href={withAdminPrefix("manage-clubs?club_name=" + club_name)}>
        <button className="bg-blue-500 text-white p-2 rounded">
          Go to user
        </button>
      </Link>
    </div>
  );
};
