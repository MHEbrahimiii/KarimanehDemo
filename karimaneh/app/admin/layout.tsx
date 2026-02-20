"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { isAdmin } from "@/lib/schemas";
import { SidebarProvider, SidebarHeader, SidebarLink, SidebarLogoutButton } from "@/components/sidebar/sidebar";
import Image from "next/image";
import {
  IconHome,
  IconUsers,
  IconCreditCard,
  IconClock,
  IconArrowsExchange,
  IconHistory,
  IconSettings,
} from "@tabler/icons-react";

const adminLinks = [
  { label: "پیشخوان", href: "/admin", icon: <IconHome className="text-white h-5 w-5" /> },
  { label: "اعضا", href: "/admin/members", icon: <IconUsers className="text-white h-5 w-5" /> },
  { label: "وام", href: "/admin/loans", icon: <IconCreditCard className="text-white h-5 w-5" /> },
  { label: "معوقات", href: "/admin/arrears", icon: <IconClock className="text-white h-5 w-5" /> },
  { label: "تراکنش", href: "/admin/transactions", icon: <IconArrowsExchange className="text-white h-5 w-5" /> },
  { label: "گزارش ها", href: "/admin/reports", icon: <IconHistory className="text-white h-5 w-5" /> },
  { label: "تنظیمات", href: "/admin/settings", icon: <IconSettings className="text-white h-5 w-5" /> },
] as const;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    if (!isAdmin(user.role)) {
      router.push("/user");
    }
  }, [user, router]);

  if (!user || !isAdmin(user.role)) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-[#F9F8F4]">
        <main className="flex-1 overflow-y-auto mr-[280px]">
          {children}
        </main>
        <div className="fixed right-0 top-0 h-screen bg-[#1E144E] text-white w-[280px] px-3 py-6 z-50 flex flex-col">
          <div className="flex flex-col">
            <SidebarHeader 
              title="صندوق قرض الحسنه کریمانه"
              logo={
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
              }
            />
            <div className="flex flex-col gap-1 mt-6">
              {adminLinks.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  href={link.href}
                  icon={link.icon}
                  label={link.label}
                  className="px-4 py-3 rounded-xl hover:bg-white/10 transition text-sm"
                />
              ))}
              <SidebarLogoutButton className="px-4 py-3 rounded-xl hover:bg-white/10 transition text-sm" />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}


