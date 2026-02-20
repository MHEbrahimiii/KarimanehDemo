"use client";

import React from "react";
import UserHeader from "@/components/UserHeader";
import ReportsTabs from "@/components/ReportsTabs";
import {
  monthlyBalanceData,
  loansStatusData,
  paymentsStatusData,
} from "@/mock/tables";

export default function ReportsPage() {
  return (
    <div className="p-6 min-h-screen text-right font-[vazir]" dir="rtl">
      <UserHeader />
      <h1 className="text-2xl font-bold text-gray-900 mb-6">تراکنشات</h1>
      <ReportsTabs
        monthlyData={monthlyBalanceData}
        loansStatus={loansStatusData}
        paymentsStatus={paymentsStatusData}
      />
    </div>
  );
}
