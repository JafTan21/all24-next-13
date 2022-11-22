"use client";

import axios from "axios";
import React, { ReactElement, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import Input from "../components/Html/Input";
import ErrorHandler from "../utils/helpers/ErrorHandler";
import usePagination from "./usePagination";

interface ISearchProps {
  url: string;
}

export default function useSearch({ url }: ISearchProps) {
  const [search, searchSet] = useState({
    value: "",
    date: "",
  });
  const [timeout, timeoutSet] = useState<NodeJS.Timeout>();
  const [data, dataSet] = useState<any>();

  const [totalPageCount, totalPageCountSet] = useState(1);
  const { paginator, currentPage } = usePagination(totalPageCount);

  const fetchData = ({ value, date }: typeof search) => {
    axios
      .get(url, {
        params: {
          value,
          date,
          page: currentPage,
        },
      })
      .then((res) => {
        dataSet(res.data.data);
        totalPageCountSet(res.data.meta.last_page);
      })
      .catch(ErrorHandler);
  };

  const SearchBar = (
    <div>
      <div className="px-2">
        <span className="text-gray-500">Date</span>
        <input
          value={search.date}
          onChange={(e) => {
            searchSet((prev) => {
              return { ...prev, date: e.target.value };
            });
          }}
          type="date"
          className={
            "shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          }
        />
      </div>
      <div className="col-md-6 px-2">
        <span className="text-gray-500">Search:</span>
        <input
          value={search.value}
          onChange={(e) => {
            searchSet((prev) => {
              return { ...prev, value: e.target.value };
            });
          }}
          placeholder="Search..."
          type="text"
          className={
            "shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          }
        />
      </div>
    </div>
  );

  useEffect(() => {
    if (timeout) clearTimeout(timeout);

    timeoutSet(
      setTimeout(() => {
        fetchData(search);
      }, 700)
    );
  }, [search, currentPage]);

  return { SearchBar, data, paginator };
}
