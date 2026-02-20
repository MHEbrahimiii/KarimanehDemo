"use client";

import { IconCalendar, IconX } from "@tabler/icons-react";
import type {
  TransactionFilterModalProps,
  TransactionFilterValues,
} from "@/types/transactions";

export default function TransactionFilterModal({
  open,
  value,
  onChange,
  onApply,
  onReset,
  onClose,
}: TransactionFilterModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1200] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-[420px] rounded-xl bg-card border border-border shadow-xl" dir="rtl">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-bold text-neutral-90">فیلتر تراکنش‌ها</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-neutral-60 hover:text-neutral-90 transition"
            aria-label="بستن"
          >
            <IconX size={20} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <label className="text-xs text-neutral-70 space-y-1">
              <span className="inline-flex items-center gap-1">
                <IconCalendar size={14} />
                از تاریخ
              </span>
              <input
                value={value.fromDate}
                onChange={(e) => onChange({ ...value, fromDate: e.target.value })}
                placeholder="1403/09/23"
                className="w-full rounded-lg border border-gray-40 bg-gray-20 px-3 py-2 text-sm outline-none"
              />
            </label>

            <label className="text-xs text-neutral-70 space-y-1">
              <span className="inline-flex items-center gap-1">
                <IconCalendar size={14} />
                تا تاریخ
              </span>
              <input
                value={value.toDate}
                onChange={(e) => onChange({ ...value, toDate: e.target.value })}
                placeholder="1403/10/23"
                className="w-full rounded-lg border border-gray-40 bg-gray-20 px-3 py-2 text-sm outline-none"
              />
            </label>
          </div>

          <label className="block text-xs text-neutral-70 space-y-1">
            <span>نوع تراکنش</span>
            <select
              value={value.type}
              onChange={(e) =>
                onChange({
                  ...value,
                  type: e.target.value as TransactionFilterValues["type"],
                })
              }
              className="w-full rounded-lg border border-gray-40 bg-gray-20 px-3 py-2 text-sm outline-none"
            >
              <option value="all">همه</option>
              <option value="subscription">حق اشتراک</option>
              <option value="loan_payment">پرداخت قسط</option>
              <option value="deposit">واریز وجه</option>
              <option value="withdrawal">برداشت وجه</option>
            </select>
          </label>

          <label className="block text-xs text-neutral-70 space-y-1">
            <span>نوع عملیات</span>
            <select
              value={value.direction}
              onChange={(e) =>
                onChange({
                  ...value,
                  direction: e.target.value as TransactionFilterValues["direction"],
                })
              }
              className="w-full rounded-lg border border-gray-40 bg-gray-20 px-3 py-2 text-sm outline-none"
            >
              <option value="all">همه</option>
              <option value="in">واریز</option>
              <option value="out">برداشت</option>
            </select>
          </label>
        </div>

        <div className="px-5 pb-5 flex gap-2">
          <button
            type="button"
            onClick={onApply}
            className="flex-1 rounded-lg bg-primary-100 text-white py-2.5 text-sm font-medium hover:bg-primary-90 transition"
          >
            اعمال فیلتر
          </button>
          <button
            type="button"
            onClick={onReset}
            className="flex-1 rounded-lg border border-primary-90 text-primary-90 py-2.5 text-sm font-medium hover:bg-primary-10 transition"
          >
            بازنشانی
          </button>
        </div>
      </div>
    </div>
  );
}
