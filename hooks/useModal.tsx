import { AnimatePresence, motion as m } from "framer-motion";
import React, { memo, ReactElement, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IChildren } from "../libs/interfaces";

export default function useModal({ title }: { title: string }) {
  const [opened, openedSet] = useState(false);

  const openModal = () => openedSet(true);
  const closeModal = () => openedSet(false);

  return {
    openModal,
    closeModal,
    isOpened: opened,
    title,
  };
}

export const Modal = ({
  isOpened,
  openModal,
  closeModal,

  title,
  children,
}: IChildren & {
  isOpened: boolean;
  openModal: () => void;
  closeModal: () => void;

  title: string;
}) => {
  return (
    <AnimatePresence>
      {isOpened && (
        <m.div
          initial={{ top: "-100%" }}
          animate={{ top: 0 }}
          exit={{ top: "-100%" }}
          transition={{ duration: 0.1 }}
          className="bg-gray-800/70 w-screen h-screen fixed top-0 left-0 z-[99] p-3 overflow-scroll"
          onClick={closeModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full rounded text-gray-800 shadow-lg bg-white"
          >
            <div className="bg-gray-200 p-3 flex justify-between items-center border-b">
              <span className="text-xl">{title}</span>
              <button onClick={closeModal} className="text-2xl">
                <AiOutlineClose />
              </button>
            </div>
            <div className="px-3 pt-2 pb-4">{children}</div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
};
