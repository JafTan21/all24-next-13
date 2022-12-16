"use client";

import ClubPageWrapper from "../../../components/Wrappers/ClubPageWrapper";
import useSearch from "../../../hooks/useSearch";

export default function Statement() {
  const { data, SearchBar, search } = useSearch<any>({
    url: "/club/filter-by-date",
    noPagination: true,
  });

  return (
    <ClubPageWrapper>
      <>
        <p className="mt-5 mb-3 text-2xl text-center text-gray-600">
          Filter By Date
        </p>

        {SearchBar}

        <p className="mt-5 mb-3 text-2xl text-center text-gray-900">
          Result of: {search.date}
        </p>

        {data && (
          <div className="flex flex-col bg-white shadow-md p-2 m-3">
            <span className="border-b p-1 shadow-sm">
              User Credit: {data.user_credit}
            </span>
            <span className="border-b p-1 shadow-sm">
              User Deposit: {data.user_deposit}
            </span>
            <span className="border-b p-1 shadow-sm">
              User Withdraw: {data.user_withdraw}
            </span>
            <span className="border-b p-1 shadow-sm">
              Club Withdraw: {data.club_withdraw}
            </span>
            <span className="border-b p-1 shadow-sm">
              User Commission: {data.user_commission}
            </span>
            <span className="border-b p-1 shadow-sm">
              User Profit: {data.user_profit}
            </span>
          </div>
        )}
      </>
    </ClubPageWrapper>
  );
}
