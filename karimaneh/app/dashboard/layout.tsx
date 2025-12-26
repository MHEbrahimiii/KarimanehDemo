"use client";

import { SidebarProvider, SidebarHeader, SidebarLink, SidebarUser } from "@/components/sidebar/sidebar";
import { useAuth } from "@/context/auth-context";
import {
  IconHome,
  IconUsers,
  IconCreditCard,
  IconClock,
  IconArrowsExchange,
  IconHistory,
  IconMessageCircle,
  IconSettings,
} from "@tabler/icons-react";

const links = [
  { label: "پیشخوان", href: "/dashboard", icon: <IconHome className="text-white h-5 w-5" /> },
  { label: "اعضا", href: "/dashboard/members", icon: <IconUsers className="text-white h-5 w-5" /> },
  { label: "وام", href: "/dashboard/loans ", icon: <IconCreditCard className="text-white h-5 w-5" /> },
  { label: "معوقات", href: "/dashboard/arrears", icon: <IconClock className="text-white h-5 w-5" /> },
  { label: "تراکنش", href: "/dashboard/transactions", icon: <IconArrowsExchange className="text-white h-5 w-5" /> },
  { label: "گزارش ها", href: "/dashboard/reports", icon: <IconHistory className="text-white h-5 w-5" /> },
  { label: "پشتیبانی اعضا", href: "/dashboard/support", icon: <IconMessageCircle className="text-white h-5 w-5" /> },
  { label: "تنظیمات", href: "/dashboard/settings", icon: <IconSettings className="text-white h-5 w-5" /> },
] as const;

export default function DashboardLayout({ children }: any) {
  const { user } = useAuth();

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-[#F9F8F4]">
        <main className="flex-1 overflow-y-auto mr-[280px]">
          {children}
        </main>
        <div className="fixed right-0 top-0 h-screen justify-between bg-[#1E144E] text-white w-[280px] px-3 py-6 z-50 flex flex-col">
          <div className="flex flex-col gap-6">
            <SidebarHeader title="صندوق قرض الحسنه کریمانه" />
            <div className="flex flex-col gap-1">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  href={link.href}
                  icon={link.icon}
                  label={link.label}
                  className="px-4 py-3 rounded-xl hover:bg-white/10 transition text-sm"
                />
              ))}
            </div>
          </div>
          <SidebarUser
            name={user?.name || "علی رضایی"}
            role={user?.role || "مدیر صندوق"}
            avatar={
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold">
                {user?.name?.charAt(0) || "ع"}
              </div>
            }
          />
        </div>
      </div>
    </SidebarProvider>
  );
}
