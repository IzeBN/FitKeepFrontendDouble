import { tg } from "@/constants";

export const closeTG = () =>
  setTimeout(() => {
    tg.close();
  }, 200);
