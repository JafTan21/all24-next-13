"use client";

import React from "react";
import StatusText from "../../../../../../components/Html/StatusText";
import { AdminTable } from "../../../../../../components/Html/Table";
import Td from "../../../../../../components/Html/Td";
import AdminPageWrapper from "../../../../../../components/Wrappers/AdminPageWrapper";
import useSearch from "../../../../../../hooks/useSearch";
import { IMultibet } from "../../../../../../libs/Models/Multibet";
import { MultibetRowMaker, MultibetTableHeader } from "./MultibetComponents";

export default function Statement() {
  const { SearchBar, data, paginator } = useSearch<IMultibet[]>({
    url: "/admin/multibet",
  });

  return (
    <AdminPageWrapper>
      <AdminTable
        paginator={paginator}
        header={<MultibetTableHeader />}
        title="Multibets History"
        searchBar={SearchBar}
      >
        {data &&
          data.map((row: any) => <MultibetRowMaker row={row} key={row.id} />)}
      </AdminTable>
    </AdminPageWrapper>
  );
}
