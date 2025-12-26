"use client";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface DashboardBreadcrumbProps {
  current: string;
}

export default function DashboardBreadcrumb({
  current,
}: DashboardBreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList className="flex
      m-[20px]">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/dashboard" className="text-[21px]">پیشخوان</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-[21px]">{current}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
