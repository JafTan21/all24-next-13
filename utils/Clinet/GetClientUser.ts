import useSWR from "swr";

export function GetClientUser() {
  const user = useSWR("/user/user", (url) => {
    console.log(url);
  });
}
