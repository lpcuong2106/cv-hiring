import { formatStringToDate } from "./formatStringToDate";
import isBefore from "date-fns/isBefore";

export const formatTypeWorkJob = (type: string) => {
  switch (type) {
    case "full-time":
      return "Toàn thời gian";
    case "part-time":
      return "Bán thời gian";
    default:
      return "Chưa có thông tin";
  }
};

export const isExpiredDateHiring = (date: string) => {
  const dateFormat = formatStringToDate(date);
  if (isBefore(dateFormat, new Date())) {
    return true;
  }
  return false;
};
