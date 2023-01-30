import { AnimatePresence, motion as m } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IChildren } from "../libs/interfaces";

export default function useModal({
  title,
  onClose,
}: {
  title: string;
  onClose?: () => void;
}) {
  const [opened, openedSet] = useState(false);
  const isFirst = useRef(true);

  const openModal = () => {
    if (opened) return;

    openedSet(true);
    isFirst.current = false;
  };

  const closeModal = () => {
    if (!opened) return;

    openedSet(false);
  };

  useEffect(() => {
    if (isFirst.current) {
      return;
    }

    if (!opened) {
      if (typeof onClose == "function") onClose();
    }
  }, [opened]);

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
  bodyClassName = "px-3 pt-2 pb-4",
}: IChildren & {
  isOpened: boolean;
  openModal: () => void;

  closeModal: () => void;

  title: string;
  bodyClassName?: string;
}) => {
  return (
    <AnimatePresence>
      {isOpened && (
        <m.div
          initial={{ top: "-100%" }}
          animate={{ top: 0 }}
          exit={{ top: "-100%" }}
          transition={{ duration: 0.1 }}
          className="bg-gray-800/70 w-screen h-screen fixed top-0 left-0 z-[99] p-3 overflow-hidden"
          onClick={closeModal}
        >
          <div className="w-full h-full overflow-y-scroll">
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full rounded text-gray-800 shadow-lg bg-white mb-10"
            >
              <div className="bg-gray-200 p-3 flex justify-between items-center border-b">
                <span className="text-xl">{title}</span>
                <button onClick={closeModal} className="text-2xl">
                  <AiOutlineClose />
                </button>
              </div>
              <div className={bodyClassName}>{children}</div>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
};
