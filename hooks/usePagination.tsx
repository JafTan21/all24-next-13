import ReactPaginate from "react-paginate";
import { FcNext, FcPrevious } from "react-icons/fc";
import { useState } from "react";

interface Props {
  handlePageClick: (e: any) => void;
  pageCount: number;
}

const Paginate = ({ handlePageClick, pageCount }: Props) => {
  return (
    <ReactPaginate
      nextLabel={<FcNext />}
      previousLabel={<FcPrevious />}
      onPageChange={handlePageClick}
      pageCount={pageCount || 0}
      containerClassName={"flex mt-3 cursor-pointer"}
      previousClassName="flex justify-center items-center cursor-pointer"
      nextClassName="flex justify-center items-center"
      activeClassName="bg-blue-200"
      pageClassName="px-2 mx-0.5 border border-blue-400 cursor-pointer"
    />
  );
};

export default function usePagination(pageCount: number) {
  const [currentPage, currentPageSet] = useState<number>(1);

  const handlePageClick = (event: any) => {
    currentPageSet(event.selected + 1);
  };

  return {
    currentPage,
    // currentPageSet,
    // handlePageClick,
    paginator: (
      <Paginate pageCount={pageCount} handlePageClick={handlePageClick} />
    ),
  };
}
