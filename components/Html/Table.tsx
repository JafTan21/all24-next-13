import React, { ReactElement } from "react";
import { IChildren } from "../../libs/interfaces";

export default function Table({
  header,
  paginator,
  children,
}: IChildren & {
  header: ReactElement;
  paginator?: ReactElement;
}) {
  return (
    <div className="mx-2 overflow-scroll">
      <table className="min-w-full whitespace-nowrap text-center divide-y divide-gray-200 table-striped">
        <thead className="text-center bg-gray-100">{header}</thead>
        <tbody className="bg-white divide-y divide-gray-200 ">{children}</tbody>
      </table>
      <div className="my-3">{paginator}</div>
    </div>
  );
}

export const AdminTable = ({
  header,
  paginator,
  children,
  searchBar,
  beforeSearchBar,
  title,
}: IChildren & {
  header: ReactElement;
  searchBar?: ReactElement;
  paginator?: ReactElement;
  beforeSearchBar?: ReactElement;
  title?: string;
}) => {
  return (
    <div className="m-2">
      {title && <p className="text-2xl text-gray-700 mx-2">{title}</p>}
      <div className="bg-white px-2">
        {beforeSearchBar}
        {searchBar}
        <Table header={header} paginator={paginator}>
          {children}
        </Table>
      </div>
    </div>
  );
};
