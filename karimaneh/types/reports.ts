export interface LoanStatusChartItem {
  name: string;
  value: number;
  color: string;
}

export interface PaymentStatusChartItem {
  name: string;
  value: number;
  color: string;
}

export interface DepositReportItem {
  period: string;
  subscription: number;
  loanInstallment: number;
  total: number;
  trend: "up" | "down";
}

export interface PaidLoanReportItem {
  period: string;
  totalPaid: number;
}
