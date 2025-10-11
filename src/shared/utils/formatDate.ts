import { format } from "date-fns";

export const formatToYMD = (date: Date | string) =>
  format(new Date(date), "yyyy-MM-dd");

export const formatScheduleDate = (
  isoDate: string,
  showTime: boolean = false
): string => {
  const date = new Date(isoDate);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const isToday =
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();

  const isTomorrow =
    date.getFullYear() === tomorrow.getFullYear() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getDate() === tomorrow.getDate();

  if (isToday) {
    return "Сегодня" + (showTime ? ` ${format(date, "HH:mm")}` : "");
  } else if (isTomorrow) {
    return "Завтра" + (showTime ? ` ${format(date, "HH:mm")}` : "");
  }

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
  };
  let formattedDate = date.toLocaleDateString("ru-RU", options);
  if (showTime) {
    formattedDate += ` ${format(date, "HH:mm")}`;
  }
  return formattedDate;
};
