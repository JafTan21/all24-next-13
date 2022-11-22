import Link from "next/link";
import React from "react";

export default function Home() {
  // UserStorage.set(
  //   AppConfig.user_token,
  //   "3|DBu8WsYDGtrpJ1xlzB1yPIO71kE2MQr7jtFDgZIT"
  // );

  return (
    <div>
      Home
      <Link href={"/login"}>Login</Link>
    </div>
  );
}
