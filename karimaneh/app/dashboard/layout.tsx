"use client";

import { SidebarProvider } from "@/components/sidebar/sidebar-context";

export default function DashboardLayout({ children }: any) {
  return (
    <SidebarProvider>
      {children}
    </SidebarProvider>
  );
}
