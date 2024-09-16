import axios from "axios";
import { format, formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale/ru";
import Cookies from "js-cookie";

export const token = Cookies.get("sessionToken");

export const instance = axios.create({
  baseURL: "http://localhost:4200/api",
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

export const formattedDate = (date: string) => 
  new Date(date) < new Date(Date.now() - 86400000 * 7)
    ? format(new Date(date), "dd MMMM yyyy", { locale: ru })
    : formatDistanceToNow(new Date(date), { locale: ru, addSuffix: true });
