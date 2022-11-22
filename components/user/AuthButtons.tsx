import React from "react";
import useUser from "../../hooks/api/useUser";
import { UserLinkButton } from "./UserLinkButton";

export default function AuthButtons(props: { close?: () => void }) {
  const { user, isLoading } = useUser();

  if (user || isLoading) return null;

  return (
    <>
      <button onClick={props.close}>
        <UserLinkButton
          href="/login"
          text="Login"
          className="bg-lime-600 text-gray-50"
        />
      </button>
      <button onClick={props.close}>
        <UserLinkButton
          href="/register"
          text="Register"
          className="bg-orange-600 text-gray-100"
        />
      </button>
    </>
  );
}
