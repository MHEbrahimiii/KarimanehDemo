"use client";

import {
  IconHome,
  IconUsers,
  IconSettings,
} from "@tabler/icons-react";
import { SidebarBody } from "./sidebar-context";
import SidebarHeader from "./sidebar-header";
import SidebarLink from "./sidebar-link";
import SidebarUser from "./sidebar-user";
import { useAuth } from "@/context/auth-context";

const links = [
  { label: "پیشخوان", href: "/dashboard", icon: <IconHome className="w-5 h-5" /> },
  { label: "اعضا", href: "#", icon: <IconUsers className="w-5 h-5" /> },
  { label: "تنظیمات", href: "#", icon: <IconSettings className="w-5 h-5" /> },
];

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <SidebarBody>
      <SidebarHeader
        logo={
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white font-bold">
            💰
          </div>
        }
        title="صندوق کریمانه"
      />
      <nav className="flex flex-col gap-1 mt-4">
        {links.map((link) => (
          <SidebarLink key={link.label} link={link} />
        ))}
      </nav>
      <div className="mt-auto">
        <SidebarUser
          name={user?.name || "کاربر"}
          role={user?.role || "عضو"}
          avatar={
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white text-sm font-medium">
              {user?.name?.charAt(0) || "U"}
            </div>
          }
        />
      </div>
    </SidebarBody>
  );
}
