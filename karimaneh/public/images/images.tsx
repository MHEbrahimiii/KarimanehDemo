import { info, warn } from "console";
import { Search } from "lucide-react";

export const images = {
  landing: "/images/landing.png",
  icon: "/images/whiteicon.png",
  darkicon : "/images/darkblue.png",
  copy :"/images/copy.png",
  Notification : '/images/notification.png',
  Search : '/images/search.png',
  info : '/images/info.png',
  is : '/images/is.png',
  Not : '/images/Not.png',
  warning : '/images/warning.png',
};
export type ImageKey = keyof typeof images;