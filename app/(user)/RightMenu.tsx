"use client";

import React, { useState } from "react";

import { HiHome } from "react-icons/hi";
import { BsCurrencyDollar } from "react-icons/bs";
import { FaGamepad, FaRegListAlt, FaUser } from "react-icons/fa";

import { ImSpinner9 } from "react-icons/im";
import { GrClose } from "react-icons/gr";

import { motion as m, AnimatePresence } from "framer-motion";
import { SideLink } from "../../components/user/MenuLink";
import { UserLinkButton } from "../../components/user/UserLinkButton";
import useUser from "../../hooks/api/useUser";
import { BiLogOut } from "react-icons/bi";

export default function RightMenu() {
  const [opened, openedSet] = useState(false);
  const open = () => openedSet(true);
  const close = () => openedSet(false);

  return (
    <>
      <div className="flex justify-center items-center">
        <UserLinkButton
          href="/deposit"
          text="Deposit"
          className="bg-orange-600 text-gray-100"
        />
        <button className="mr-3 rounded-full p-1.5 bg-blue-600" onClick={open}>
          <FaUser fontSize={15} />
        </button>
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
              key="right-side-menu"
              initial={{ opacity: 0, right: "-100%" }}
              animate={{ opacity: 1, right: 0 }}
              exit={{ opacity: 0, right: "-100%" }}
              transition={{ duration: 0.3 }}
              className="w-2/3 h-screen bg-white fixed top-0 right-0"
            >
              <Topbar close={close} />
              <Menus close={close} />
            </m.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

const Topbar = ({ close }: { close: () => void }) => {
  const { user } = useUser();
  return (
    <div className="bg-gray-200 flex justify-center flex-col p-3">
      <button onClick={close} className="ml-3 my-4">
        <GrClose />
      </button>

      <div>
        <div className="flex justify-between items-center pb-1">
          <span className="flex items-center ml-2">
            <FaUser className="text-orange-500" />
            <span className="ml-1 text-gray-800">{user.username}</span>
          </span>
          <span className="text-green-600 pr-2">BDT ৳{user.balance}</span>
        </div>
        <button onClick={close} className="w-full">
          <UserLinkButton
            href="/deposit"
            text="Deposit"
            className="bg-orange-600  rounded-3xl text-sm px-2 py-2 text-gray-100"
          />
        </button>
      </div>
    </div>
  );
};

const Menus = ({ close }: { close: () => void }) => {
  const { logout } = useUser();
  return (
    <div>
      <SideLink
        close={close}
        href="/"
        text="Home"
        icon={<HiHome fontSize={18} />}
      />
      <SideLink
        close={close}
        href="/profile"
        text="Profile"
        icon={<FaUser fontSize={18} />}
      />
      <SideLink
        close={close}
        href="/statements/bet"
        text="Bet Statement"
        icon={<FaGamepad fontSize={18} />}
      />
      <SideLink
        close={close}
        href="/statements/multibet"
        text="Multibet Statement"
        icon={<FaGamepad fontSize={18} />}
      />
      <SideLink
        close={close}
        href="/statements/balance-transfer"
        text="Balance Transfers Statement"
        icon={<BsCurrencyDollar fontSize={18} />}
      />
      <SideLink
        close={close}
        href="/statements/to-reseller-only-balance-transfer"
        text="To Reseller Transfers Statement"
        icon={<BsCurrencyDollar fontSize={18} />}
      />
      <SideLink
        close={close}
        href="/statements/deposit"
        text="Deposit Statement"
        icon={<FaRegListAlt fontSize={18} />}
      />
      <SideLink
        close={close}
        href="/statements/withdraw"
        text="Withdraw Statement"
        icon={<FaRegListAlt fontSize={18} />}
      />
      <SideLink
        close={close}
        href="/statements/spinner"
        text="Spinner Statement"
        icon={<ImSpinner9 fontSize={18} />}
      />

      <button
        onClick={() => {
          logout();
          close();
        }}
        className={`bg-red-700 text-white  group flex rounded-md items-center w-full px-2 py-2 text-sm`}
      >
        <span className="px-1">
          <BiLogOut />
        </span>
        <span>Logout</span>
      </button>
    </div>
  );
};
