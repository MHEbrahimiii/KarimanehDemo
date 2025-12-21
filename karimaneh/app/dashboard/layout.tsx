"use client";

import { SidebarProvider } from "@/components/sidebar/sidebar";

export default function DashboardLayout({ children }: any) {
  return (
    <SidebarProvider>
      {children}
    </SidebarProvider>
  );
}
