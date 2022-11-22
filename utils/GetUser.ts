import axios from "axios";
import { cookies } from "next/headers";
import { cache } from "react";
import AppConfig, { URLs } from "../app.config";
import { IUser } from "../libs/Models/User";

const GetUser = async () => {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = URLs.backend;

  const token = cookies().get(AppConfig.user_token)?.value;
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  try {
    const user: IUser = (await axios.get("/user/user"))?.data?.user;
    return await user;
  } catch (err: any) {
    console.log(err.response.data);
    return undefined;
  }
};

export default GetUser;
