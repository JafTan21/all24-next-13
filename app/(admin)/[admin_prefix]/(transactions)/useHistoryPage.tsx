"use client";

import React, { ReactElement } from "react";
import Collapsible from "../../../../components/Html/Collapsible";
import { AdminTable } from "../../../../components/Html/Table";
import AdminPageWrapper from "../../../../components/Wrappers/AdminPageWrapper";
import useSearch from "../../../../hooks/useSearch";
import { Status } from "../../../../libs/Status";

export default function useHistoryPage({
  url,
  title,
  header,
  Maker,
}: {
  url: string;
  title: string;
  header: ReactElement;
  Maker: ({ row }: { row: any }) => ReactElement;
}) {
  const { SearchBar, data } = useSearch({
    url,
    noPagination: true,
  });

  const page = (
    <AdminPageWrapper title={title}>
      <div className="overflow-scroll w-screen">
        {SearchBar}
        {data && (
          <>
            <span className="mx-2">
              Total accept:
              <b className="text-green-500">
                {Object.entries(data).reduce((a, b) => {
                  return a + b[1].approved_amount;
                }, 0)}{" "}
              </b>
            </span>
            <span className="mx-2">
              Total reject:
              <b className="text-red-500">
                {Object.entries(data).reduce((a, b) => {
                  return a + b[1].rejected_amount;
                }, 0)}
              </b>
            </span>

            {Object.entries(data).map(([key, value]) => {
              return (
                <Collapsible
                  key={key}
                  trigger={
                    <div className="bg-blue-500 p-2 rounded text-white m-1 cursor-pointer">
                      {key}: (Approved: {value.approved_amount}) (Rejected:{" "}
                      {value.rejected_amount})
                    </div>
                  }
                  isClosed={true}
                  className="bg-white mx-2 my-3"
                >
                  <span className="text-green-500">Approved</span>
                  <AdminTable header={header}>
                    {value.data
                      .filter((row: any) => row.status == Status.Approved)
                      .map((row: any) => (
                        <Maker row={row} key={`maker-${row.id}`} />
                      ))}
                  </AdminTable>

                  <span className="text-red-500">Rejected</span>
                  <AdminTable header={header}>
                    {value.data
                      .filter((row: any) => row.status == Status.Rejected)
                      .map((row: any) => (
                        <Maker row={row} key={`maker-${row.id}`} />
                      ))}
                  </AdminTable>
                </Collapsible>
              );
            })}
          </>
        )}
      </div>
    </AdminPageWrapper>
  );

  return { page };
}
