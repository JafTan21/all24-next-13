import Image, { StaticImageData } from "next/image";
import React, { Children, ReactElement, ReactNode, useState } from "react";

import ReactCollapsible from "react-collapsible";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

export default function Collapsible({
  text,
  icon,
  children,
  time,
  trigger,
  className,
}: {
  text?: string;
  icon?: string | StaticImageData;
  trigger?: ReactElement;
  children: ReactNode;
  className?: string;
  time?: number;
}) {
  const classes = `bg-white rounded border-gray-800 flex flex-col ${className}`;
  const [opened, openedSet] = useState(true);

  return (
    <ReactCollapsible
      openedClassName={classes}
      className={classes}
      transitionTime={time || Children.count(children) * 50}
      open
      onOpen={() => openedSet(true)}
      onClose={() => openedSet(false)}
      trigger={
        trigger || (
          <div className="flex items-center p-2 text-white bg-primary border rounded-md">
            {opened ? <BsChevronDown /> : <BsChevronUp />}
            <span className="mx-2 font-bold ">{text}</span>
            {icon && (
              <Image
                alt="icon"
                src={icon}
                className="inline-block w-16 mr-2 rounded"
              />
            )}
          </div>
        )
      }
    >
      {children}
    </ReactCollapsible>
  );
}
