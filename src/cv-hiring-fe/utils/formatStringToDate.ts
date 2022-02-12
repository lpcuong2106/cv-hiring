import parse from "date-fns/parse";

export const formatStringToDate = (string: string) => {
  return parse(string, "yyyy-MM-dd HH:m:s", new Date());
};
