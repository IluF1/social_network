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

export const formattedDate = (date: string): string => {
  const parsedDate = new Date(date);

  // Check if the parsed date is valid
  if (isNaN(parsedDate.getTime())) {
    return 'Invalid date';
  }

  // If the date is older than 7 days
  const oneWeekAgo = Date.now() - 86400000 * 7; // 7 days in milliseconds
  if (parsedDate < new Date(oneWeekAgo)) {
    return format(parsedDate, 'dd MMMM yyyy', { locale: ru });
  }

  // If the date is within the last 7 days
  return formatDistanceToNow(parsedDate, { locale: ru, addSuffix: true });
};