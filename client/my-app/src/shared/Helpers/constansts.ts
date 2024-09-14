import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("sessionToken");

export const instance = axios.create({
  baseURL: "http://localhost:4200/api",
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});
