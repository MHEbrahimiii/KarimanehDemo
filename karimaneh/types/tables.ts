export interface Member {
  id: number;
  fullName: string;
  nationalCode: string;
  fatherName?: string;
  receivedLoans: string;
  phonenumber: string;
  status: "active" | "inactive";
}

export type MonthlyBalance = {
  month: string;
  amount: number;
};

export type LoanStatus = {
  name: string;
  color: string;
  value: number;
};

export type PaymentStatus = {
  name: string;
  value: number;
  color: string;
};

export interface Loan {
  id: number;
  fullName: string;
  nationalCode: string;
  requestedAmount: string;
  requestDate: string;
  loanSubject: string;
  status: "pending" | "paid" | "rejected" | "due";
  guarantors?: string[];
  mobileNumber?: string;
  memberStatus?: string;
  debtAmount?: string;
}

export interface Transaction {
  id: number;
  type: "deposit" | "withdrawal" | "loan_payment" | "subscription";
  amount: string;
  date: string;
  description: string;
  memberName?: string;
  nationalCode?: string;
  status: "completed" | "pending" | "failed";
}

export interface Arrear {
  id: number;
  fullName: string;
  nationalCode: string;
  debtAmount: string;
  installmentCount: number;
  subscriptionCount: number;
  dueDate: string;
  status: "overdue" | "warning" | "critical";
}
