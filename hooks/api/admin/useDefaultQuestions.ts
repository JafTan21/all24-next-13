import axios from "axios";
import useSWR from "swr";
import { IDefaultQuestion } from "../../../libs/Models/DefaultQuestion";

export default function useDefaultQUestions() {
  const { data, error } = useSWR("/admin/DefaultQuestion", (url) => {
    return axios.get(url).then((res) => res.data.data);
  });

  const defaultQuestions: IDefaultQuestion[] = data;

  return {
    defaultQuestions,
    error,
    isLoading: !defaultQuestions && !error,
  };
}
