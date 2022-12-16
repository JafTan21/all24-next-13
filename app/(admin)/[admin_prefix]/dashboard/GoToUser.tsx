"use client";

import Link from "next/link";
import { useState } from "react";
import { AdminInput } from "../../../../components/Html/Input";
import { withAdminPrefix } from "../../../../utils/admin/adminHelpers";

export const GoToUser = () => {
  const [username, usernameSet] = useState("");
  return (
    <div className="px-2 py-4 bg-yellow-400">
      <div className="">
        <AdminInput
          name="username"
          value={username}
          onChange={(e) => usernameSet(e.target.value)}
          label="Username"
          type="text"
        />
      </div>
      <Link href={withAdminPrefix("manage-users?username=" + username)}>
        <button className="bg-green-500 text-white p-2 rounded">
          Go to user
        </button>
      </Link>
    </div>
  );
};
