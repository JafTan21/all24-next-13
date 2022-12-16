"use client";

import React from "react";
import BackBox from "../../../../components/Html/BackBox";
import UserPageWrapper from "../../../../components/Wrappers/UserPageWrapper";
import InfoForm from "./InfoForm";
import PasswordChangeForm from "./PasswordChangeForm";

export default function Profile() {
  return (
    <UserPageWrapper>
      <BackBox title="Profile">
        <div className="flex flex-wrap">
          <InfoForm />
          <PasswordChangeForm />
        </div>
      </BackBox>
    </UserPageWrapper>
  );
}
