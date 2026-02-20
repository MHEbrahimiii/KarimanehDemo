import type {
  Arrear,
  Loan,
  LoanStatus,
  Member,
  MonthlyBalance,
  PaymentStatus,
  Transaction,
} from "@/types/tables";

export const tableData = {
  members: [
    { id: 1, fullName: "رضا زاهدی", nationalCode: "۰۰۱۱۹۱۵۷۵۷", fatherName: "علی", receivedLoans: "۷,۲۰۰,۰۰۰", phonenumber: "۰۹۱۲۳۴۵۶۷۸۹", status: "active" as const },
    { id: 2, fullName: "ایمان عباسی", nationalCode: "۰۰۱۱۹۱۵۷۵۷", fatherName: "رضا", receivedLoans: "۵,۱۰۰,۰۰۰", phonenumber: "۰۹۱۷۸۸۸۶۷۸۹", status: "active" as const },
    { id: 3, fullName: "کامران ساده", nationalCode: "۰۰۱۱۹۱۵۷۵۷", fatherName: "حسن", receivedLoans: "۵,۶۰۰,۰۰۰", phonenumber: "۰۹۱۴۵۵۵۵۷۸۹", status: "inactive" as const },
    { id: 4, fullName: "سینا زالی‌پور", nationalCode: "۰۰۱۱۹۱۵۷۵۷", fatherName: "اسماعیل", receivedLoans: "۷,۹۰۰,۰۰۰", phonenumber: "۰۹۱۲۳۵۵۴۸۴۷", status: "active" as const },
    { id: 5, fullName: "علی اکبری", nationalCode: "۰۰۱۱۹۱۵۷۵۷", fatherName: "ایلیا", receivedLoans: "۲,۲۰۰,۰۰۰", phonenumber: "۰۹۱۲۳۴۵۵۷۸۹", status: "active" as const },
    { id: 6, fullName: "راشا نامدار", nationalCode: "۰۰۱۱۹۱۵۷۵۷", fatherName: "یاور", receivedLoans: "۳,۲۰۰,۰۰۰", phonenumber: "۰۹۱۲۳۶۵۳۴۸۹", status: "inactive" as const },
    { id: 7, fullName: "نیما شریفی", nationalCode: "۰۰۱۱۹۱۵۷۵۷", fatherName: "محمد", receivedLoans: "۴,۵۰۰,۰۰۰", phonenumber: "۰۹۱۲۳۴۵۶۷۸۹", status: "active" as const },
    { id: 8, fullName: "فرزاد امیری", nationalCode: "۰۰۱۱۹۱۵۷۵۷", fatherName: "حسین", receivedLoans: "۶,۳۰۰,۰۰۰", phonenumber: "۰۹۱۷۸۹۰۱۲۳۴", status: "active" as const },
    { id: 9, fullName: "آرمان سعادتی", nationalCode: "۰۰۱۱۹۱۵۷۵۷", fatherName: "رضا", receivedLoans: "۳,۸۰۰,۰۰۰", phonenumber: "۰۹۱۴۵۶۷۸۹۰۱", status: "active" as const },
    { id: 10, fullName: "کاوه رضایی", nationalCode: "۰۰۱۱۹۱۵۷۵۷", fatherName: "علی", receivedLoans: "۸,۱۰۰,۰۰۰", phonenumber: "۰۹۱۲۳۴۵۶۷۸۹", status: "active" as const },
  ] as Member[],

  loans: [
    { id: 1, fullName: "نیما شریفی", nationalCode: "۰۰۱۱۹۱۵۷۵۷", requestedAmount: "۱۰۰,۰۰۰,۰۰۰", requestDate: "۱۴۰۳/۰۹/۲۵", loanSubject: "خرید خانه", status: "pending" as const, guarantors: ["فرزاد امیری", "آرمان سعادتی"], mobileNumber: "۰۹۱۲۳۴۵۶۷۸۹", memberStatus: "بدون بدهی", debtAmount: "۰" },
    { id: 2, fullName: "رضا زاهدی", nationalCode: "۰۰۱۱۹۱۵۷۵۷", requestedAmount: "۵۰,۰۰۰,۰۰۰", requestDate: "۱۴۰۳/۰۹/۲۰", loanSubject: "خودرو", status: "pending" as const, guarantors: ["ایمان عباسی"], mobileNumber: "۰۹۱۲۳۴۵۶۷۸۹", memberStatus: "بدون بدهی", debtAmount: "۰" },
    { id: 3, fullName: "ایمان عباسی", nationalCode: "۰۰۱۱۹۱۵۷۵۷", requestedAmount: "۳۰,۰۰۰,۰۰۰", requestDate: "۱۴۰۳/۰۹/۱۵", loanSubject: "هزینه های پزشکی", status: "rejected" as const, guarantors: ["رضا زاهدی"], mobileNumber: "۰۹۱۷۸۸۸۶۷۸۹", memberStatus: "بدون بدهی", debtAmount: "۰" },
    { id: 4, fullName: "محمد رضایی", nationalCode: "۰۰۱۱۹۱۵۷۵۷", requestedAmount: "۴۵,۰۰۰,۰۰۰", requestDate: "۱۴۰۳/۰۹/۱۰", loanSubject: "تعمیرات", status: "pending" as const, guarantors: ["کاوه رضایی"], mobileNumber: "۰۹۱۲۳۴۵۶۷۸۹", memberStatus: "بدون بدهی", debtAmount: "۰" },
    { id: 5, fullName: "حسین احمدی", nationalCode: "۰۰۱۱۹۱۵۷۵۷", requestedAmount: "۶۵,۰۰۰,۰۰۰", requestDate: "۱۴۰۳/۰۹/۰۵", loanSubject: "وسایل منزل", status: "rejected" as const, guarantors: ["سینا زالی‌پور"], mobileNumber: "۰۹۱۷۸۹۰۱۲۳۴", memberStatus: "بدون بدهی", debtAmount: "۰" },
    { id: 6, fullName: "علی کریمی", nationalCode: "۰۰۱۱۹۱۵۷۵۷", requestedAmount: "۳۵,۰۰۰,۰۰۰", requestDate: "۱۴۰۳/۰۸/۲۸", loanSubject: "پزشکی", status: "pending" as const, guarantors: ["علی اکبری"], mobileNumber: "۰۹۱۴۵۶۷۸۹۰۱", memberStatus: "بدون بدهی", debtAmount: "۰" },
    { id: 7, fullName: "سینا زالی‌پور", nationalCode: "۰۰۱۱۹۱۵۷۵۷", requestedAmount: "۷۵,۰۰۰,۰۰۰", requestDate: "۱۴۰۳/۰۸/۱۰", loanSubject: "هزینه تحصیل", status: "paid" as const, guarantors: ["علی اکبری"], mobileNumber: "۰۹۱۲۳۵۵۴۸۴۷", memberStatus: "بدون بدهی", debtAmount: "۰" },
    { id: 8, fullName: "علی اکبری", nationalCode: "۰۰۱۱۹۱۵۷۵۷", requestedAmount: "۴۰,۰۰۰,۰۰۰", requestDate: "۱۴۰۳/۰۸/۰۵", loanSubject: "کسب و کار", status: "paid" as const, guarantors: ["سینا زالی‌پور"], mobileNumber: "۰۹۱۲۳۴۵۵۷۸۹", memberStatus: "بدون بدهی", debtAmount: "۰" },
    { id: 9, fullName: "راشا نامدار", nationalCode: "۰۰۱۱۹۱۵۷۵۷", requestedAmount: "۶۰,۰۰۰,۰۰۰", requestDate: "۱۴۰۳/۰۷/۲۰", loanSubject: "بازسازی منزل", status: "paid" as const, guarantors: ["کامران ساده"], mobileNumber: "۰۹۱۲۳۶۵۳۴۸۹", memberStatus: "بدون بدهی", debtAmount: "۰" },
    { id: 10, fullName: "کامران ساده", nationalCode: "۰۰۱۱۹۱۵۷۵۷", requestedAmount: "۲۵,۰۰۰,۰۰۰", requestDate: "۱۴۰۳/۰۷/۱۵", loanSubject: "اضطراری", status: "paid" as const, guarantors: ["راشا نامدار"], mobileNumber: "۰۹۱۴۵۵۵۵۷۸۹", memberStatus: "بدون بدهی", debtAmount: "۰" },
    { id: 11, fullName: "امیر حسینی", nationalCode: "۰۰۱۱۹۱۵۷۵۷", requestedAmount: "۵۵,۰۰۰,۰۰۰", requestDate: "۱۴۰۳/۰۷/۱۰", loanSubject: "خرید ماشین", status: "paid" as const, guarantors: ["فرزاد امیری"], mobileNumber: "۰۹۱۲۳۴۵۶۷۸۹", memberStatus: "بدون بدهی", debtAmount: "۰" },
    { id: 12, fullName: "مهدی نوری", nationalCode: "۰۰۱۱۹۱۵۷۵۷", requestedAmount: "۴۲,۰۰۰,۰۰۰", requestDate: "۱۴۰۳/۰۷/۰۵", loanSubject: "تحصیل", status: "paid" as const, guarantors: ["آرمان سعادتی"], mobileNumber: "۰۹۱۷۸۹۰۱۲۳۴", memberStatus: "بدون بدهی", debtAmount: "۰" },
    { id: 13, fullName: "حامد صادقی", nationalCode: "۰۰۱۱۹۱۵۷۵۷", requestedAmount: "۳۸,۰۰۰,۰۰۰", requestDate: "۱۴۰۳/۰۶/۲۵", loanSubject: "پزشکی", status: "paid" as const, guarantors: ["کاوه رضایی"], mobileNumber: "۰۹۱۴۵۶۷۸۹۰۱", memberStatus: "بدون بدهی", debtAmount: "۰" },
    { id: 14, fullName: "بابک مرادی", nationalCode: "۰۰۱۱۹۱۵۷۵۷", requestedAmount: "۷۰,۰۰۰,۰۰۰", requestDate: "۱۴۰۳/۰۶/۲۰", loanSubject: "خانه", status: "paid" as const, guarantors: ["نیما شریفی"], mobileNumber: "۰۹۱۲۳۴۵۶۷۸۹", memberStatus: "بدون بدهی", debtAmount: "۰" },
    { id: 15, fullName: "فرزاد امیری", nationalCode: "۰۰۱۱۹۱۵۷۵۷", requestedAmount: "۸۰,۰۰۰,۰۰۰", requestDate: "۱۴۰۳/۰۶/۱۰", loanSubject: "سفر", status: "rejected" as const, guarantors: ["آرمان سعادتی"], mobileNumber: "۰۹۱۷۸۹۰۱۲۳۴", memberStatus: "بدون بدهی", debtAmount: "۰" },
    { id: 16, fullName: "آرمان سعادتی", nationalCode: "۰۰۱۱۹۱۵۷۵۷", requestedAmount: "۹۰,۰۰۰,۰۰۰", requestDate: "۱۴۰۳/۰۶/۰۵", loanSubject: "تجمیع بدهی ها", status: "rejected" as const, guarantors: ["فرزاد امیری"], mobileNumber: "۰۹۱۴۵۶۷۸۹۰۱", memberStatus: "بدهکار", debtAmount: "۱۲,۰۰۰,۰۰۰" },
    { id: 17, fullName: "کاوه رضایی", nationalCode: "۰۰۱۱۹۱۵۷۵۷", requestedAmount: "۱۲۰,۰۰۰,۰۰۰", requestDate: "۱۴۰۳/۰۵/۲۰", loanSubject: "عروسی", status: "rejected" as const, guarantors: ["نیما شریفی"], mobileNumber: "۰۹۱۲۳۴۵۶۷۸۹", memberStatus: "بدون بدهی", debtAmount: "۰" },
    { id: 18, fullName: "دانیال محمدی", nationalCode: "۰۰۱۱۹۱۵۷۵۷", requestedAmount: "۹۵,۰۰۰,۰۰۰", requestDate: "۱۴۰۳/۰۵/۱۵", loanSubject: "سفر خارجی", status: "rejected" as const, guarantors: ["رضا زاهدی"], mobileNumber: "۰۹۱۷۸۹۰۱۲۳۴", memberStatus: "بدون بدهی", debtAmount: "۰" },
    { id: 19, fullName: "پوریا کاظمی", nationalCode: "۰۰۱۱۹۱۵۷۵۷", requestedAmount: "۱۱۰,۰۰۰,۰۰۰", requestDate: "۱۴۰۳/۰۵/۱۰", loanSubject: "خرید زمین", status: "rejected" as const, guarantors: ["ایمان عباسی"], mobileNumber: "۰۹۱۴۵۶۷۸۹۰۱", memberStatus: "بدهکار", debtAmount: "۲۰,۰۰۰,۰۰۰" },
    { id: 20, fullName: "نیما شریفی", nationalCode: "۰۰۱۱۹۱۵۷۵۷", requestedAmount: "۵۵,۰۰۰,۰۰۰", requestDate: "۱۴۰۳/۰۴/۱۵", loanSubject: "خرید خانه", status: "due" as const, guarantors: ["فرزاد امیری"], mobileNumber: "۰۹۱۲۳۴۵۶۷۸۹", memberStatus: "بدهکار", debtAmount: "۵۵,۰۰۰,۰۰۰" },
    { id: 21, fullName: "رضا زاهدی", nationalCode: "۰۰۱۱۹۱۵۷۵۷", requestedAmount: "۳۵,۰۰۰,۰۰۰", requestDate: "۱۴۰۳/۰۳/۱۰", loanSubject: "خودرو", status: "due" as const, guarantors: ["ایمان عباسی"], mobileNumber: "۰۹۱۲۳۴۵۶۷۸۹", memberStatus: "بدهکار", debtAmount: "۳۵,۰۰۰,۰۰۰" },
    { id: 22, fullName: "سعید رضوی", nationalCode: "۰۰۱۱۹۱۵۷۵۷", requestedAmount: "۴۸,۰۰۰,۰۰۰", requestDate: "۱۴۰۳/۰۳/۰۵", loanSubject: "تعمیرات", status: "due" as const, guarantors: ["حسین احمدی"], mobileNumber: "۰۹۱۷۸۹۰۱۲۳۴", memberStatus: "بدهکار", debtAmount: "۴۸,۰۰۰,۰۰۰" },
    { id: 23, fullName: "مجید فتحی", nationalCode: "۰۰۱۱۹۱۵۷۵۷", requestedAmount: "۶۲,۰۰۰,۰۰۰", requestDate: "۱۴۰۳/۰۲/۲۸", loanSubject: "پزشکی", status: "due" as const, guarantors: ["علی کریمی"], mobileNumber: "۰۹۱۴۵۶۷۸۹۰۱", memberStatus: "بدهکار", debtAmount: "۶۲,۰۰۰,۰۰۰" },
    { id: 24, fullName: "رضا موسوی", nationalCode: "۰۰۱۱۹۱۵۷۵۷", requestedAmount: "۳۳,۰۰۰,۰۰۰", requestDate: "۱۴۰۳/۰۲/۲۰", loanSubject: "تحصیل", status: "due" as const, guarantors: ["محمد رضایی"], mobileNumber: "۰۹۱۲۳۴۵۶۷۸۹", memberStatus: "بدهکار", debtAmount: "۳۳,۰۰۰,۰۰۰" },
    { id: 25, fullName: "حسن علیزاده", nationalCode: "۰۰۱۱۹۱۵۷۵۷", requestedAmount: "۵۸,۰۰۰,۰۰۰", requestDate: "۱۴۰۳/۰۲/۱۵", loanSubject: "کسب و کار", status: "due" as const, guarantors: ["امیر حسینی"], mobileNumber: "۰۹۱۷۸۹۰۱۲۳۴", memberStatus: "بدهکار", debtAmount: "۵۸,۰۰۰,۰۰۰" },
    { id: 26, fullName: "محمدرضا کریمی", nationalCode: "۰۰۱۱۹۱۵۷۵۷", requestedAmount: "۴۳,۰۰۰,۰۰۰", requestDate: "۱۴۰۳/۰۲/۱۰", loanSubject: "بازسازی", status: "due" as const, guarantors: ["مهدی نوری"], mobileNumber: "۰۹۱۴۵۶۷۸۹۰۱", memberStatus: "بدهکار", debtAmount: "۴۳,۰۰۰,۰۰۰" },
    { id: 27, fullName: "علی احمدی", nationalCode: "۰۰۱۱۹۱۵۷۵۷", requestedAmount: "۵۲,۰۰۰,۰۰۰", requestDate: "۱۴۰۳/۰۲/۰۵", loanSubject: "اضطراری", status: "due" as const, guarantors: ["حامد صادقی"], mobileNumber: "۰۹۱۲۳۴۵۶۷۸۹", memberStatus: "بدهکار", debtAmount: "۵۲,۰۰۰,۰۰۰" },
    { id: 28, fullName: "حسین رضایی", nationalCode: "۰۰۱۱۹۱۵۷۵۷", requestedAmount: "۳۹,۰۰۰,۰۰۰", requestDate: "۱۴۰۳/۰۱/۲۸", loanSubject: "خودرو", status: "due" as const, guarantors: ["بابک مرادی"], mobileNumber: "۰۹۱۷۸۹۰۱۲۳۴", memberStatus: "بدهکار", debtAmount: "۳۹,۰۰۰,۰۰۰" },
  ] as Loan[],

  transactions: [
    { id: 1, type: "deposit" as const, amount: "۲۰,۰۰۰,۰۰۰", date: "۱۴۰۳/۰۹/۲۵", description: "واریز حق اشتراک", memberName: "رضا زاهدی", nationalCode: "۰۰۱۱۹۱۵۷۵۷", status: "completed" as const },
    { id: 2, type: "withdrawal" as const, amount: "۱۰,۰۰۰,۰۰۰", date: "۱۴۰۳/۰۹/۲۴", description: "برداشت از حساب", memberName: "ایمان عباسی", nationalCode: "۰۰۱۱۹۱۵۷۵۷", status: "completed" as const },
    { id: 3, type: "loan_payment" as const, amount: "۵,۰۰۰,۰۰۰", date: "۱۴۰۳/۰۹/۲۳", description: "پرداخت قسط وام", memberName: "سینا زالی‌پور", nationalCode: "۰۰۱۱۹۱۵۷۵۷", status: "completed" as const },
    { id: 4, type: "subscription" as const, amount: "۲,۰۰۰,۰۰۰", date: "۱۴۰۳/۰۹/۲۲", description: "پرداخت حق اشتراک", memberName: "علی اکبری", nationalCode: "۰۰۱۱۹۱۵۷۵۷", status: "completed" as const },
    { id: 5, type: "deposit" as const, amount: "۱۵,۰۰۰,۰۰۰", date: "۱۴۰۳/۰۹/۲۱", description: "واریز وجه", memberName: "راشا نامدار", nationalCode: "۰۰۱۱۹۱۵۷۵۷", status: "pending" as const },
    { id: 6, type: "loan_payment" as const, amount: "۸,۰۰۰,۰۰۰", date: "۱۴۰۳/۰۹/۲۰", description: "پرداخت قسط وام", memberName: "کامران ساده", nationalCode: "۰۰۱۱۹۱۵۷۵۷", status: "completed" as const },
  ] as Transaction[],

  arrears: [
    { id: 1, fullName: "نیما شریفی", nationalCode: "۰۰۱۱۹۱۵۷۵۷", debtAmount: "۵۵,۰۰۰,۰۰۰", installmentCount: 3, subscriptionCount: 1, dueDate: "۱۴۰۳/۰۹/۲۰", status: "overdue" as const },
    { id: 2, fullName: "رضا زاهدی", nationalCode: "۰۰۱۱۹۱۵۷۵۷", debtAmount: "۳۵,۰۰۰,۰۰۰", installmentCount: 2, subscriptionCount: 0, dueDate: "۱۴۰۳/۰۹/۲۵", status: "warning" as const },
    { id: 3, fullName: "آرمان سعادتی", nationalCode: "۰۰۱۱۹۱۵۷۵۷", debtAmount: "۱۲,۰۰۰,۰۰۰", installmentCount: 1, subscriptionCount: 1, dueDate: "۱۴۰۳/۰۹/۳۰", status: "critical" as const },
    { id: 4, fullName: "فرزاد امیری", nationalCode: "۰۰۱۱۹۱۵۷۵۷", debtAmount: "۲۰,۰۰۰,۰۰۰", installmentCount: 1, subscriptionCount: 0, dueDate: "۱۴۰۳/۱۰/۰۵", status: "warning" as const },
  ] as Arrear[],
};

export const monthlyBalanceData: MonthlyBalance[] = [
  { month: "فروردین", amount: 32000 },
  { month: "اردیبهشت", amount: 36000 },
  { month: "خرداد", amount: 18000 },
  { month: "تیر", amount: 22000 },
  { month: "مرداد", amount: 45000 },
  { month: "شهریور", amount: 42000 },
  { month: "مهر", amount: 25000 },
  { month: "آبان", amount: 27000 },
  { month: "آذر", amount: 39000 },
  { month: "دی", amount: 43000 },
  { month: "بهمن", amount: 37000 },
  { month: "اسفند", amount: 31000 },
]

export const loansStatusData: LoanStatus[] = [
  { name: "وام های تایید شده", value: 40, color: "#1E0E62" },
  { name: "در انتظار بررسی", value: 35, color: "#F4B740" },
  { name: "رد شده", value: 25, color: "#7B61FF" },
]

export const paymentsStatusData: PaymentStatus[] = [
  { name: "حق اشتراک", value: 40, color: "#F4B740" },
  { name: "اقساط", value: 60, color: "#7B61FF" },
]
