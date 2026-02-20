"use client";

import { useMemo, useState } from "react";
import UserHeader from "@/components/UserHeader";
import {
  IconArrowsSort,
  IconArrowNarrowDown,
  IconArrowNarrowUp,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react";
import { tableData } from "@/mock/tables";
import TransactionMessageModal from "@/components/modals/TransactionMessageModal";
import TransactionFilterModal from "@/components/modals/TransactionFilterModal";
import TransactionSuccessToast from "@/components/modals/TransactionSuccessToast";
import type { Transaction } from "@/types/tables";
import type {
  TransactionDirection,
  TransactionFilterValues,
  TransactionStatusView,
  UiTransaction,
} from "@/types/transactions";

const memberPhoneByName = new Map(
  tableData.members.map((member) => [member.fullName, member.phonenumber])
);

const initialFilters: TransactionFilterValues = {
  fromDate: "",
  toDate: "",
  type: "all",
  direction: "all",
};

const toPersianDigits = (value: string | number) =>
  String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);

const normalizeDigits = (value: string) =>
  value
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)));

const parseAmount = (value: string) =>
  Number(normalizeDigits(value).replace(/[^\d]/g, "")) || 0;

const formatAmount = (value: number) => toPersianDigits(value.toLocaleString("en-US"));

const statusConfig: Record<
  Transaction["status"],
  TransactionStatusView
> = {
  pending: {
    label: "در انتظار بررسی",
    textColor: "text-secondary-100",
    dotColor: "bg-secondary-70",
  },
  completed: {
    label: "تایید شده",
    textColor: "text-green-80",
    dotColor: "bg-green-60",
  },
  failed: {
    label: "نیاز به اصلاح",
    textColor: "text-red-80",
    dotColor: "bg-red-60",
  },
};

const typeLabel: Record<Transaction["type"], string> = {
  subscription: "پرداخت حق اشتراک",
  loan_payment: "پرداخت قسط",
  deposit: "واریز وجه",
  withdrawal: "برداشت وجه",
};

const directionLabel: Record<TransactionDirection, string> = {
  in: "واریز",
  out: "برداشت",
};

const createRowsFromMock = (): UiTransaction[] =>
  tableData.transactions.map((tx) => ({
    ...tx,
    phone: memberPhoneByName.get(tx.memberName || "") || "-",
    amountValue: parseAmount(tx.amount),
    direction: tx.type === "withdrawal" ? "out" : "in",
    receiptNo: `TX-${845100 + tx.id}`,
    paidAt: `${tx.date} - 10:00`,
  }));

export default function TransactionsPage() {
  const [rows, setRows] = useState<UiTransaction[]>(() => createRowsFromMock());
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedRow, setSelectedRow] = useState<UiTransaction | null>(null);
  const [messageOpen, setMessageOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const [draftFilters, setDraftFilters] = useState(initialFilters);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const matchesType = filters.type === "all" || row.type === filters.type;
      const matchesDirection =
        filters.direction === "all" || row.direction === filters.direction;
      const matchesFrom = !filters.fromDate || row.date >= filters.fromDate;
      const matchesTo = !filters.toDate || row.date <= filters.toDate;

      return matchesType && matchesDirection && matchesFrom && matchesTo;
    });
  }, [rows, filters]);

  const openMessageModal = (row: UiTransaction) => {
    setSelectedRow(row);
    setMessageOpen(true);
  };

  const approveTransaction = (id: number) => {
    setRows((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, status: "completed" as const } : row
      )
    );
    setToastMessage("پرداخت با موفقیت تایید شد.");
    setToastOpen(true);
  };

  const applyFilters = () => {
    setFilters(draftFilters);
    setFilterOpen(false);
  };

  const resetFilters = () => {
    setDraftFilters(initialFilters);
    setFilters(initialFilters);
    setFilterOpen(false);
  };

  return (
    <div className="p-6 min-h-screen bg-background text-right font-iranyekan" dir="rtl">
      <UserHeader />

      <section className="bg-card rounded-2xl border border-border shadow-sm">
        <div className="p-6 pb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="text-right">
            <h1 className="text-2xl font-bold text-neutral-90">تراکنش‌ها</h1>
            <p className="text-sm text-neutral-60 mt-1">پیگیری و مدیریت واریزی‌ها و برداشت‌ها</p>
          </div>

          <button
            type="button"
            onClick={() => {
              setDraftFilters(filters);
              setFilterOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border text-sm text-neutral-80 hover:bg-gray-20 transition"
          >
            جستجوی پیشرفته
          </button>
        </div>

        <div className="px-6 pb-6">
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[880px] text-sm">
              <thead>
                <tr className="bg-gray-20 border-b border-border text-neutral-70">
                  <th className="p-3 text-center w-16">#</th>
                  <th className="p-3">
                    <div className="flex items-center justify-center gap-1">
                      <IconArrowsSort size={14} />
                      واریز کننده
                    </div>
                  </th>
                  <th className="p-3">
                    <div className="flex items-center justify-center gap-1">
                      <IconArrowsSort size={14} />
                      نوع تراکنش
                    </div>
                  </th>
                  <th className="p-3">
                    <div className="flex items-center justify-center gap-1">
                      <IconArrowsSort size={14} />
                      مبلغ
                    </div>
                  </th>
                  <th className="p-3">
                    <div className="flex items-center justify-center gap-1">
                      <IconArrowsSort size={14} />
                      وضعیت
                    </div>
                  </th>
                  <th className="p-3">
                    <div className="flex items-center justify-center gap-1">
                      <IconArrowsSort size={14} />
                      تاریخ
                    </div>
                  </th>
                  <th className="p-3 text-center w-16"> </th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {filteredRows.map((row) => {
                  const status = statusConfig[row.status];
                  const isExpanded = expandedId === row.id;

                  return (
                    <TransactionRowItem
                      key={row.id}
                      row={row}
                      status={status}
                      isExpanded={isExpanded}
                      onToggle={() =>
                        setExpandedId((prev) => (prev === row.id ? null : row.id))
                      }
                      onSendMessage={() => openMessageModal(row)}
                      onApprove={() => approveTransaction(row.id)}
                    />
                  );
                })}

                {filteredRows.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-neutral-60">
                      نتیجه‌ای با این فیلتر پیدا نشد.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-neutral-50 mt-4">مبالغ به ریال است.</p>
        </div>
      </section>

      <TransactionMessageModal
        open={messageOpen}
        payer={selectedRow?.memberName || ""}
        onClose={() => setMessageOpen(false)}
        onSubmit={() => {
          setMessageOpen(false);
          setToastMessage("پیام با موفقیت ارسال شد.");
          setToastOpen(true);
        }}
      />

      <TransactionFilterModal
        open={filterOpen}
        value={draftFilters}
        onChange={setDraftFilters}
        onApply={applyFilters}
        onReset={resetFilters}
        onClose={() => setFilterOpen(false)}
      />

      <TransactionSuccessToast
        isOpen={toastOpen}
        message={toastMessage}
        onClose={() => setToastOpen(false)}
      />
    </div>
  );
}

function TransactionRowItem({
  row,
  status,
  isExpanded,
  onToggle,
  onSendMessage,
  onApprove,
}: {
  row: UiTransaction;
  status: TransactionStatusView;
  isExpanded: boolean;
  onToggle: () => void;
  onSendMessage: () => void;
  onApprove: () => void;
}) {
  return (
    <>
      <tr className="border-b border-border hover:bg-gray-10 transition-colors">
        <td className="p-3 text-center text-neutral-60">{toPersianDigits(row.id)}</td>
        <td className="p-3 text-center text-neutral-90 font-medium">
          {row.memberName || "نامشخص"}
        </td>
        <td className="p-3 text-center text-neutral-80">{typeLabel[row.type]}</td>
        <td className="p-3">
          <div className="flex items-center justify-center gap-2 font-semibold">
            {row.direction === "in" ? (
              <IconArrowNarrowUp className="text-green-60" size={18} />
            ) : (
              <IconArrowNarrowDown className="text-red-60" size={18} />
            )}
            <span className={row.direction === "in" ? "text-green-70" : "text-red-70"}>
              {formatAmount(row.amountValue)}
            </span>
          </div>
        </td>
        <td className="p-3">
          <div className="flex items-center justify-center gap-2">
            <span className={`h-1.5 w-1.5 rounded-full ${status.dotColor}`} />
            <span className={`text-xs font-medium ${status.textColor}`}>{status.label}</span>
          </div>
        </td>
        <td className="p-3 text-center text-neutral-70">{toPersianDigits(row.date)}</td>
        <td className="p-3 text-center">
          <button
            type="button"
            onClick={onToggle}
            className="text-neutral-60 hover:text-neutral-90 transition"
            aria-label="نمایش جزئیات"
          >
            {isExpanded ? <IconChevronUp size={20} /> : <IconChevronDown size={20} />}
          </button>
        </td>
      </tr>

      {isExpanded && (
        <tr className="border-b border-border bg-gray-10">
          <td colSpan={7} className="p-4">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-4 items-start">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 text-sm">
                <p className="text-neutral-60">پرداخت کننده:</p>
                <p className="text-neutral-90 font-medium col-span-1 sm:col-span-2">
                  {row.memberName || "نامشخص"}
                </p>

                <p className="text-neutral-60">تاریخ پرداخت:</p>
                <p className="text-neutral-90 col-span-1 sm:col-span-2">
                  {toPersianDigits(row.paidAt)}
                </p>

                <p className="text-neutral-60">نوع تراکنش:</p>
                <p className="text-neutral-90 col-span-1 sm:col-span-2">{typeLabel[row.type]}</p>

                <p className="text-neutral-60">نوع عملیات:</p>
                <p className="text-neutral-90 col-span-1 sm:col-span-2">
                  {directionLabel[row.direction]}
                </p>

                <p className="text-neutral-60">شماره رسید:</p>
                <p className="text-neutral-90 col-span-1 sm:col-span-2" dir="ltr">
                  {row.receiptNo}
                </p>

                <p className="text-neutral-60">تلفن پرداخت کننده:</p>
                <p className="text-neutral-90 col-span-1 sm:col-span-2">
                  {row.phone === "-" ? row.phone : toPersianDigits(row.phone)}
                </p>
              </div>

              <div className="justify-self-end w-full max-w-[260px]">
                <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
                  <p className="text-xs text-neutral-60 mb-1">مبلغ ثبت شده</p>
                  <p className="text-lg font-bold text-green-70">
                    {formatAmount(row.amountValue)}
                    <span className="text-sm font-medium text-neutral-50 mr-1">ریال</span>
                  </p>
                  <div className="h-px bg-border my-3" />
                  <p className="text-xs text-neutral-60 leading-6">
                    در صورت نیاز به بررسی بیشتر، با پرداخت‌کننده تماس بگیرید یا پیام ارسال کنید.
                  </p>
                </div>
              </div>
            </div>

            {row.status === "pending" && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={onApprove}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary-100 px-4 py-2 text-sm text-white hover:bg-primary-90 transition"
                >
                  تایید واریزی
                </button>
                <button
                  type="button"
                  onClick={onSendMessage}
                  className="inline-flex items-center gap-2 rounded-lg border border-primary-90 px-4 py-2 text-sm text-primary-90 hover:bg-primary-10 transition"
                >
                  ارسال پیام
                </button>
              </div>
            )}
          </td>
        </tr>
      )}
    </>
  );
}
