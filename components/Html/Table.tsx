import React, { ReactElement } from "react";
import { IChildren } from "../../libs/interfaces";

export default function Table({
  header,
  paginator,
  children,
}: IChildren & {
  header: ReactElement;
  paginator: ReactElement;
}) {
  return (
    <div className="mx-2 mt-5 w-screen-full md:mx-auto md:w-4/5 ">
      <div className="flex flex-col">
        <div className="overflow-x-auto shadow-md sm:rounded-lg overflow-scroll">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table className="min-w-full whitespace-nowrap text-center divide-y divide-gray-200 table-fixed ">
                <thead className="text-center bg-gray-100">{header}</thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {children}
                </tbody>
              </table>
            </div>
            <div className="my-3">{paginator}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
