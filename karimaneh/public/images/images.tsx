import { Avatar } from "@mui/material";
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
  eye : '/images/eye.png',
  ActiveUser : '/images/ActiveUser.png',
  User : '/images/User.png',
  Avatar : '/images/Avatar.png',
  Timer : '/images/Timer.png',
  Timer2 : '/images/Timer2.png',
  calender : '/images/calender.png',
  info2 : '/images/info2.png',
  Note : '/images/Note.png',
};
export type ImageKey = keyof typeof images;