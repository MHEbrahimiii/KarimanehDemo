"use client"

import { useState } from "react"
import PerformanceTab from "./PerformanceTab"
import TransactionsTab from "./TransactionsTab"
import type { MonthlyBalance, LoanStatus, PaymentStatus } from "@/types/tables"

// props for the tabs container
interface Props {
  monthlyData: MonthlyBalance[]
  loansStatus: LoanStatus[]
  paymentsStatus: PaymentStatus[]
}

export default function ReportsTabs({
  monthlyData,
  loansStatus,
  paymentsStatus,
}: Props) {
  const [activeTab, setActiveTab] = useState<"performance" | "transactions">(
    "performance"
  )

  const tabButton = (
    label: string,
    tab: "performance" | "transactions"
  ) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`py-2 px-4 transition-colors duration-150 ${
        activeTab === tab
          ? "border-b-2 border-blue-500 font-semibold"
          : "text-gray-600 hover:text-gray-800"
      }`}
    >
      {label}
    </button>
  )

  return (
    <div>
      <div className="flex gap-8 border-b">
        {tabButton("گزارش عملکرد صندوق", "performance")}
        {tabButton("گزارش تراکنشات", "transactions")}
      </div>

      <div className="mt-6">
        {activeTab === "performance" && (
          <PerformanceTab data={monthlyData} />
        )}

        {activeTab === "transactions" && (
          <TransactionsTab
            loansStatus={loansStatus}
            paymentsStatus={paymentsStatus}
          />
        )}
      </div>
    </div>
  )
}
