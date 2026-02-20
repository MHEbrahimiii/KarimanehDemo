"use client";

import type { LoanStatus, PaymentStatus } from "@/types/tables";
import TotalDepositsCard from "@/components/reports/TotalDepositsCard";
import TotalPaidLoansCard from "@/components/reports/TotalPaidLoansCard";
import LoanStatusChartCard from "@/components/reports/LoanStatusChartCard";
import PaymentStatusChartCard from "@/components/reports/PaymentStatusChartCard";

type Props = {
  loansStatus: LoanStatus[];
  paymentsStatus: PaymentStatus[];
};

export default function TransactionsTab({
  loansStatus,
  paymentsStatus,
}: Props) {

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <TotalDepositsCard />
      <TotalPaidLoansCard />
      <LoanStatusChartCard />
      <PaymentStatusChartCard />
    </div>
  );
}
