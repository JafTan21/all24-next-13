"use client";

import React, { useState } from "react";

import { HiMenu, HiHome } from "react-icons/hi";
import { BsCurrencyDollar } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import { FaMoneyBillAlt } from "react-icons/fa";

import { ImSpinner9 } from "react-icons/im";
import { GrClose } from "react-icons/gr";

import { motion as m, AnimatePresence } from "framer-motion";
import { SideLink } from "../../components/user/MenuLink";
import AuthButtons from "../../components/user/AuthButtons";
import Image from "next/image";
import Link from "next/link";

import AppConfig from "../../app.config";
import AppLogo from "../../assets/logo.png";
import useUser from "../../hooks/api/useUser";

export default function LeftMenu() {
  const [opened, openedSet] = useState(false);
  const open = () => openedSet(true);
  const close = () => openedSet(false);

  const { user } = useUser();

  return (
    <>
      <div className="flex justify-center items-center">
        <button className="ml-1 text-3xl text-white" onClick={open}>
          <HiMenu />
        </button>
        <Link href="/">
          <Image
            style={{
              maxWidth: "120px",
            }}
            src={AppLogo}
            alt={AppConfig.app_name}
          />
        </Link>
      </div>

      <AnimatePresence>
        {opened && (
          <>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-gray-600/80 w-screen h-screen fixed right-0 top-0"
              onClick={close}
            ></m.div>
            <m.div
              key="left-side-menu"
              initial={{ opacity: 0, left: "-100%" }}
              animate={{ opacity: 1, left: 0 }}
              exit={{ opacity: 0, left: "-100%" }}
              transition={{ duration: 0.3 }}
              className="w-2/3 h-screen bg-white fixed top-0 left-0"
            >
              <Topbar close={close} />
              {user && <Menus close={close} />}
            </m.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

const Topbar = ({ close }: { close: () => void }) => {
  return (
    <div className="bg-gray-200 flex justify-center p-8">
      <AuthButtons close={close} />
      <button onClick={close} className="ml-3">
        <GrClose />
      </button>
    </div>
  );
};

const Menus = ({ close }: { close: () => void }) => {
  return (
    <div className="">
      <SideLink
        close={close}
        href="/home"
        text="Home"
        icon={<HiHome fontSize={18} />}
      />
      <SideLink
        close={close}
        href="/spinner#spinner"
        text="Spinner Game"
        icon={<ImSpinner9 fontSize={18} />}
      />
      <SideLink
        close={close}
        href="/transfer"
        text="Balance Transfer"
        icon={<FaMoneyBillAlt fontSize={18} />}
      />
      <SideLink
        close={close}
        href="/transfer-to-reseller"
        text="Transfer to reseller"
        icon={<FaMoneyBillAlt fontSize={18} />}
      />
      <SideLink
        close={close}
        href="/deposit"
        text="Deposit"
        icon={<BsCurrencyDollar fontSize={18} />}
      />
      <SideLink
        close={close}
        href="/withdraw"
        text="Withdraw"
        icon={<GiMoneyStack fontSize={18} />}
      />
      <SideLink
        close={close}
        href="/sponsor-earnings"
        text="Sponsor Earnings"
        icon={<BsCurrencyDollar fontSize={18} />}
      />
      <SideLink
        close={close}
        href="/all-transaction"
        text="All Transaction"
        icon={<BsCurrencyDollar fontSize={18} />}
      />
    </div>
  );
};
