import "../app/globals.css";
import type { AppProps } from "next/app";
import axios from "axios";
import AppConfig, { URLs } from "../app.config";

axios.defaults.baseURL = URLs.backend;
axios.defaults.withCredentials = true;

export default function App({ Component, pageProps }: AppProps) {
  const token = "";
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  return <Component {...pageProps} />;
}
