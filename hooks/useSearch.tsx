"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import ErrorHandler from "../utils/helpers/ErrorHandler";
import usePagination from "./usePagination";
import queryString from "query-string";

interface ISearchProps {
  url: string;
  params?: { [key: string | number]: string | boolean | number | undefined };
  noPagination?: boolean;

  isUserManagePage?: boolean;
  isClubManagePage?: boolean;
}

export default function useSearch<T = any[]>({
  url,
  params,
  noPagination,

  isUserManagePage,
  isClubManagePage,
}: ISearchProps) {
  const [search, searchSet] = useState({
    value: "",
    date: "",
  });
  const [timeout, timeoutSet] = useState<NodeJS.Timeout>();
  const [data, dataSet] = useState<T>();

  const [totalPageCount, totalPageCountSet] = useState(1);
  const { paginator, currentPage } = usePagination(totalPageCount);

  const getSearchValue = () => {
    if (isUserManagePage) {
      const { username } = queryString.parse(location.search);
      if (username && typeof username == "string") return username;
    }

    if (isClubManagePage) {
      const { club_name } = queryString.parse(location.search);
      if (club_name && typeof club_name == "string") return club_name;
    }

    return search.value;
  };

  const fetchData = ({ value, date }: typeof search) => {
    if (!location) {
      console.error("No Window found on useSearch:fetchData()");
      return;
    }

    axios
      .get(url, {
        params: {
          ...params,
          search_value: getSearchValue(),
          search_date: date,
          page: currentPage,
        },
      })
      .then((res) => {
        dataSet(res.data.data || res.data);
        if (!noPagination)
          totalPageCountSet(res.data.last_page || res.data.meta.last_page);
      })
      .catch(ErrorHandler);
  };

  const fetchDataWithParams = (newParams: typeof params) => {
    if (!window) {
      console.error("No Window found on useSearch:fetchDataWithParams()");
      return;
    }

    axios
      .get(url, {
        params: {
          ...params,
          ...newParams,
          search_value: getSearchValue(),
          search_date: search.date,
          page: currentPage,
        },
      })
      .then((res) => {
        dataSet(res.data.data || res.data);
        if (!noPagination)
          totalPageCountSet(res.data.last_page || res.data.meta.last_page);
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
  }, [search.value, search.date, currentPage]);

  return {
    SearchBar,
    data,
    paginator,
    search,
    fetchDataWithParams,
    refresh: () => {
      fetchData(search);
    },
  };
}
