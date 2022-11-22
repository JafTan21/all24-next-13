import axios from "axios";
import useSWR from "swr";

export default function useTransactionMethods() {
  const { data: transactionMethods, error } = useSWR(
    "/user/TransactionMethod",
    (url) => {
      return axios.get(url).then((res) => res.data.methods);
    }
  );

  return {
    transactionMethods,
    error,
    isLoading: !transactionMethods && !error,
  };
}
