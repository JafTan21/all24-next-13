"use client";

import { AnimatePresence, motion as m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { ReactElement, useState } from "react";
import { AiFillDashboard } from "react-icons/ai";
import { HiMenu } from "react-icons/hi";
import AppConfig, { AdminConfig } from "../../app.config";
import AppLogo from "../../assets/logo.png";
import { SidebarLink } from "./SideLink";

import {
  AiFillBank,
  AiFillNotification,
  AiFillSetting,
  AiOutlineHistory,
} from "react-icons/ai";
import { BiGame, BiHistory, BiMoney, BiUserCircle } from "react-icons/bi";
import { BsCashCoin } from "react-icons/bs";
import { FaGamepad } from "react-icons/fa";
import { GrClose, GrMore } from "react-icons/gr";
import { ImSpinner9 } from "react-icons/im";
import { usePathname } from "next/navigation";
import Collapsible from "../../components/Html/Collapsible";
import { getPrefix } from "../../utils/admin/adminHelpers";

export default function LeftMenu() {
  const [opened, openedSet] = useState(false);
  const open = () => openedSet(true);
  const close = () => openedSet(false);

  const prefix = getPrefix();

  return (
    <>
      <div className="flex justify-center items-center">
        <button className="ml-1 text-3xl text-gray-500" onClick={open}>
          <HiMenu />
        </button>
        <Link href={`${prefix}/dashboard`} className="ml-2">
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
              className="w-2/3 h-screen bg-gray-800 text-gray-300 fixed top-0 left-0 overflow-scroll"
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
  return (
    <div className="flex justify-center items-center p-8 border-b">
      <p className="text-xl">Admin panel ({AppConfig.app_name})</p>
      <button onClick={close} className="ml-3 p-2 bg-white">
        <GrClose />
      </button>
    </div>
  );
};

const Menus = ({ close }: { close: () => void }) => {
  const prefix = "/" + getPrefix();

  return (
    <div>
      <ul
        className="nav nav-pills nav-sidebar flex-column"
        data-widget="treeview"
        role="menu"
        data-accordion="false"
      >
        {prefix == AdminConfig.SuperAdminPrefix && (
          <>
            <SidebarLink
              href="dashboard"
              text="Dashboard"
              icon={<AiFillDashboard />}
              close={close}
            />
            <SidebarLink
              href="admin-profits"
              text="Admin Profits"
              icon={<BsCashCoin />}
              close={close}
            />
            <SidebarLink
              href="daily-profits"
              text="Daily Profits"
              icon={<BsCashCoin />}
              close={close}
            />
            <SidebarLink
              href="notice"
              text="Notice"
              icon={<AiFillNotification />}
              close={close}
            />
          </>
        )}

        {(prefix == AdminConfig.TransactionAdminPrefix ||
          prefix == AdminConfig.SuperAdminPrefix) && (
          <>
            <Collapsible
              isClosed={true}
              time={100}
              trigger={
                <div className="mx-3 p-2 bg-blue-600 text-white rounded">
                  Transactions
                </div>
              }
            >
              <SidebarLink
                href="to-reseller-balance-transfers"
                text="User to Reseller Transfers"
                icon={<AiFillBank />}
                close={close}
              />
              <SidebarLink
                href="to-reseller-balance-transfers/history"
                text="Transfers History"
                icon={<AiFillBank />}
                close={close}
              />
              <SidebarLink
                href="deposits"
                text="User Deposits"
                icon={<BiMoney />}
                close={close}
              />
              <SidebarLink
                href="deposits/history"
                text="Deposits History"
                icon={<BiMoney />}
                close={close}
              />
              <SidebarLink
                href="withdraws"
                text="User Withdraws"
                icon={<AiFillBank />}
                close={close}
              />
              <SidebarLink
                href="withdraws/history"
                text="Withdraws History"
                icon={<AiFillBank />}
                close={close}
              />
              <SidebarLink
                href="club-withdraws"
                text="Club Withdraws"
                icon={<AiFillBank />}
                close={close}
              />
              <SidebarLink
                href="club-withdraws/history"
                text="Club Withdraws History"
                icon={<AiFillBank />}
                close={close}
              />
              <SidebarLink
                href="/user-to-user-balance-transfer/history"
                text="Balance Transfer History"
                icon={<AiFillBank />}
                close={close}
              />
              <SidebarLink
                href="user-to-user-balance-transfer"
                text="Balance Transfer"
                icon={<AiFillBank />}
                close={close}
              />
            </Collapsible>
          </>
        )}

        {(prefix == AdminConfig.SuperAdminPrefix ||
          prefix == AdminConfig.GameAdminPrefix ||
          prefix == AdminConfig.CustomGameAdminPrefix) && (
          <>
            <Collapsible
              isClosed={true}
              time={100}
              trigger={
                <div className="mx-3 mt-1 p-2 bg-blue-600 text-white rounded">
                  Game Control
                </div>
              }
            >
              <SidebarLink
                href="bet-control"
                text="Bet Control"
                icon={<FaGamepad />}
                close={close}
              />
              <SidebarLink
                href="bet-control?hidden=true"
                text="Hidden Bet Control"
                icon={<FaGamepad />}
                close={close}
              />
              <SidebarLink
                href="default/questions"
                text="Default questions"
                icon={<FaGamepad />}
                close={close}
              />
              <SidebarLink
                href="default/questions-answers"
                text="Default questions answers"
                icon={<FaGamepad />}
                close={close}
              />
              <SidebarLink
                href="history/bet"
                text="Bet History"
                icon={<BiHistory />}
                close={close}
              />
              <SidebarLink
                href="history/multibet"
                text="Multibet History"
                icon={<BiHistory />}
                close={close}
              />
              <SidebarLink
                href="history/closed-games"
                text="Closed Games"
                icon={<BiHistory />}
                close={close}
              />
              <SidebarLink
                href="history/closed-questions"
                text="Closed Questions"
                icon={<BiHistory />}
                close={close}
              />
              <SidebarLink
                href="history/closed-answers"
                text="Closed Answers"
                icon={<BiHistory />}
                close={close}
              />
              <SidebarLink
                href="history/bet-refunds"
                text="Bets Refunds"
                icon={<AiOutlineHistory />}
                close={close}
              />
              <SidebarLink
                href="history/spinner"
                text="Spinner History"
                icon={<ImSpinner9 />}
                close={close}
              />
              <SidebarLink
                href="history/more-games"
                text="More Games History"
                icon={<GrMore />}
                close={close}
              />
            </Collapsible>
          </>
        )}

        {prefix == AdminConfig.SuperAdminPrefix && (
          <>
            <Collapsible
              isClosed={true}
              time={100}
              trigger={
                <div className="mx-3 mt-1 p-2 bg-blue-600 text-white rounded">
                  Others
                </div>
              }
            >
              <SidebarLink
                href="manage-admins"
                text="Manage admins"
                icon={<BiUserCircle />}
                close={close}
              />
              <SidebarLink
                href="manage-users"
                text="Manage users"
                icon={<BiUserCircle />}
                close={close}
              />
              <SidebarLink
                href="manage-clubs"
                text="Manage clubs"
                icon={<BiUserCircle />}
                close={close}
              />
              <SidebarLink
                href="settings"
                text="Settings"
                icon={<AiFillSetting />}
                close={close}
              />
            </Collapsible>
          </>
        )}

        {/* <button className="mb-5 btn btn-danger" onClick={Logout}>
          logout
        </button> */}
      </ul>
    </div>
  );
};
