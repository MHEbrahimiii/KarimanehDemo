export interface AccountItem {
  label: string;
  value: string;
  type: "account" | "card" | "iban";
}

export interface AccountsModalData {
  accountNumber?: string;
  cardNumber?: string;
  iban?: string;
  bankName?: string;
}
