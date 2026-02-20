import type { Transaction } from "@/types/tables";

export type TransactionDirection = "in" | "out";

export type UiTransaction = Transaction & {
  phone: string;
  amountValue: number;
  receiptNo: string;
  paidAt: string;
  direction: TransactionDirection;
};

export interface TransactionFilterValues {
  fromDate: string;
  toDate: string;
  type: "all" | Transaction["type"];
  direction: "all" | TransactionDirection;
}

export interface TransactionStatusView {
  label: string;
  textColor: string;
  dotColor: string;
}

export interface TransactionMessageModalProps {
  open: boolean;
  payer: string;
  onClose: () => void;
  onSubmit: () => void;
}

export interface TransactionFilterModalProps {
  open: boolean;
  value: TransactionFilterValues;
  onChange: (value: TransactionFilterValues) => void;
  onApply: () => void;
  onReset: () => void;
  onClose: () => void;
}

export interface TransactionSuccessToastProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}
