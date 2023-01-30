import axios from "axios";
import useSWR from "swr";
import { IMultibet } from "../../../../../../libs/Models/Multibet";

export default function useMultibetData(
  answer_id: number,
  is_modal_opened: boolean
) {
  const { data, error } = useSWR(
    is_modal_opened ? "/admin/multibet/" + answer_id : null,
    (url) => {
      return axios
        .get("/admin/multibet", {
          params: {
            answer_id,
          },
        })
        .then((res) => res.data.data);
    }
  );

  const multibets: IMultibet[] = data;

  return {
    multibets,
    error,
    isLoading: !multibets && !error,
  };
}
