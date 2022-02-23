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

export const formatStatusWorkJob = (type: number) => {
  switch (type) {
    case 1:
      return {
        status: "Ứng tuyển",
        color: "orange",
      };
    case 2:
      return {
        status: "Phỏng vấn",
        color: "warning",
      };
    case 3:
      return {
        status: "Đậu việc làm",
        color: "green",
      };
    case 4:
      return {
        status: "Từ chối việc làm",
        color: "red",
      };
    case 5:
      return {
        status: "Hủy ứng tuyển",
        color: "default",
      };
    default:
      return {
        status: "Chưa có thông tin",
        color: "default",
      };
  }
};

export const isExpiredDateHiring = (date: string) => {
  const dateFormat = formatStringToDate(date);
  if (isBefore(dateFormat, new Date())) {
    return true;
  }
  return false;
};
