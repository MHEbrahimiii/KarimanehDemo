import { loansStatusData, paymentsStatusData } from "@/mock/tables";
import type { DepositReportItem, PaidLoanReportItem } from "@/types/reports";

export const loanStatusChartData = loansStatusData;
export const paymentStatusChartData = paymentsStatusData;

export const depositReportData: DepositReportItem[] = [
  { period: "ماهانه", subscription: 140000000, loanInstallment: 24000000, total: 38000000, trend: "up" },
  { period: "شش ماهه", subscription: 400000000, loanInstallment: 200000000, total: 600000000, trend: "down" },
  { period: "سالانه", subscription: 800000000, loanInstallment: 1500000000, total: 2300000000, trend: "up" },
];

export const paidLoanReportData: PaidLoanReportItem[] = [
  { period: "ماهانه", totalPaid: 38000000 },
  { period: "شش ماهه", totalPaid: 600000000 },
  { period: "سالانه", totalPaid: 2300000000 },
];
