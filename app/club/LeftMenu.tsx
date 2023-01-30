"use client";

import React, { useState } from "react";

import { HiMenu, HiHome } from "react-icons/hi";
import { BsCurrencyDollar } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import { FaRegListAlt, FaUser, FaUserCog } from "react-icons/fa";

import { GrClose } from "react-icons/gr";

import { motion as m, AnimatePresence } from "framer-motion";
import { SideLink } from "../../components/user/MenuLink";
import Image from "next/image";
import Link from "next/link";

import AppConfig from "../../app.config";
import AppLogo from "../../assets/logo.png";
import useClub from "../../hooks/api/useClub";
import { BiLogOut } from "react-icons/bi";

export default function LeftMenu() {
  const [opened, openedSet] = useState(false);
  const open = () => openedSet(true);
  const close = () => openedSet(false);

  const { club } = useClub();

  return (
    <>
      <div className="flex justify-center items-center">
        <button className="ml-1 text-3xl text-white" onClick={open}>
          <HiMenu />
        </button>
        <Link href="/club">
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
              {club && <Menus close={close} />}
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
      <button onClick={close} className="ml-3">
        <GrClose />
      </button>
    </div>
  );
};

const Menus = ({ close }: { close: () => void }) => {
  const { club, logout } = useClub();

  return (
    <div className="">
      <SideLink
        close={close}
        href="/club"
        text="Home"
        icon={<HiHome fontSize={18} />}
      />

      <SideLink
        close={close}
        href="/club/profile"
        text="Profile"
        icon={<FaUser fontSize={18} />}
      />
      <SideLink
        close={close}
        href="/club/withdraw"
        text="Withdraw"
        icon={<GiMoneyStack fontSize={18} />}
      />
      <SideLink
        close={close}
        href="/club/statements/withdraw"
        text="Withdraw Statement"
        icon={<FaRegListAlt fontSize={18} />}
      />
      <SideLink
        close={close}
        href="/club/statements/all"
        text="All Transaction"
        icon={<BsCurrencyDollar fontSize={18} />}
      />
      <SideLink
        close={close}
        href="/club/users"
        text="All Users"
        icon={<FaUser fontSize={18} />}
      />
      <SideLink
        close={close}
        href="/club/bets"
        text="All Bets"
        icon={<FaUser fontSize={18} />}
      />
      <SideLink
        close={close}
        href="/club/filter-by-date"
        text="Date History"
        icon={<FaUser fontSize={18} />}
      />
      {club.is_super && (
        <SideLink
          close={close}
          href="/club/super-club-panel"
          text="Super Club Panel"
          icon={<FaUserCog fontSize={18} />}
        />
      )}

      <button
        onClick={logout}
        className="bg-red-500 text-white group flex rounded-md items-center w-full px-2 py-2 text-sm"
      >
        <span className="px-1">
          <BiLogOut />
        </span>
        <span>Logout</span>
      </button>
    </div>
  );
};
