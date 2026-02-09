"use client";

import { useState } from "react";
import DashboardBreadcrumb from "@/components/Breadcrumbs";

const formatWithCommas = (value: string) =>
  value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const parseFormatted = (value: string) => value.replace(/,/g, "");

function NumberInputWithUnit({
  value,
  onChange,
  unit,
  min = 0,
  max = 999_999_999_999,
  step = 500000,
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  unit: string;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}) {
  const num = parseInt(parseFormatted(value), 10) || 0;
  const up = () => onChange(String(Math.min(max, num + step)));
  const down = () => onChange(String(Math.max(min, num - step)));
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    if (raw === "") {
      onChange("");
      return;
    }
    const n = parseInt(raw, 10);
    if (!isNaN(n)) onChange(String(Math.min(max, n)));
  };
  const displayValue = value ? formatWithCommas(value) : "";

  return (
    <div
      className={`flex items-center rounded-lg border border-gray-40 bg-gray-20 overflow-hidden ${className}`}
      dir="ltr"
    >
      <div className="flex flex-col border-l border-gray-40 bg-gray-30">
        <button
          type="button"
          onClick={up}
          className="p-1.5 text-neutral-70 hover:bg-neutral-20 transition"
          aria-label="افزایش"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={down}
          className="p-1.5 text-neutral-70 hover:bg-neutral-20 transition border-t border-gray-40"
          aria-label="کاهش"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>
      <input
        type="text"
        inputMode="numeric"
        value={displayValue}
        onChange={handleChange}
        className="flex-1 min-w-0 bg-transparent px-3 py-2.5 text-neutral-90 text-sm outline-none"
      />
      <span className="text-neutral-60 text-sm px-3 whitespace-nowrap">{unit}</span>
    </div>
  );
}

function FieldRow({
  label,
  description,
  children,
}: {
  label: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row gap-6 items-start">
      <div className="flex-1 min-w-0">
        <label className="font-bold text-neutral-90 text-sm block">{label}</label>
        <p className="text-neutral-50 text-xs leading-relaxed mt-0.5">{description}</p>
      </div>
      <div className="w-full max-w-[280px] shrink-0">{children}</div>
    </div>
  );
}

const collateralOptions = [
  "به ضمانت نیازی نیست !",
  "ضمانت نامه",
  "سند ملکی",
  "چک",
];

export default function AdminSettingsPage() {
  const [minLoan, setMinLoan] = useState("10000000");
  const [maxLoan, setMaxLoan] = useState("100000000");
  const [subscriptionFee, setSubscriptionFee] = useState("2500000");
  const [installments, setInstallments] = useState("2");
  const [simultaneousLoans, setSimultaneousLoans] = useState("2");
  const [collateral, setCollateral] = useState(collateralOptions[0]);
  const [sheba, setSheba] = useState("IR011286400000004102002044758016");
  const [accountNumber, setAccountNumber] = useState("0302-5003-0213-2305");
  const [cardNumber, setCardNumber] = useState("6037-9982-0465-2222");
  const [noOverdueRequired, setNoOverdueRequired] = useState(false);

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <DashboardBreadcrumb current="تنظیمات" />
      <div className="mx-5 mb-8">
        <div className="bg-card rounded-2xl shadow-sm border border-border p-8 ">
          <h1 className="text-xl font-bold text-neutral-90 mb-8">تنظیمات</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-12">
            {/* ستون راست: وام و اشتراک */}
            <div className="space-y-8">
              <FieldRow
                label="حداقل مبلغ وام"
                description="کمترین مبلغی که اعضا میتوانند برای دریافت وام درخواست دهند."
              >
                <NumberInputWithUnit
                  value={minLoan}
                  onChange={setMinLoan}
                  unit="ریال"
                />
              </FieldRow>
              <FieldRow
                label="حداکثر مبلغ وام"
                description="بیشترین مبلغی که اعضا میتوانند برای دریافت وام درخواست دهند."
              >
                <NumberInputWithUnit
                  value={maxLoan}
                  onChange={setMaxLoan}
                  unit="ریال"
                />
              </FieldRow>
              <FieldRow
                label="مبلغ حق اشتراک"
                description="مبلغی که هرماه اعضا برای سپرده خود به صندوق باید واریز کنند."
              >
                <NumberInputWithUnit
                  value={subscriptionFee}
                  onChange={setSubscriptionFee}
                  unit="ریال"
                />
              </FieldRow>
              <FieldRow
                label="تعداد اقساط"
                description="تعیین تعداد اقساط وام گیرندگان"
              >
                <NumberInputWithUnit
                  value={installments}
                  onChange={setInstallments}
                  unit="ماه"
                  max={120}
                />
              </FieldRow>
              <FieldRow
                label="ضمانت مورد نیاز برای وام"
                description="ضمانت(هایی) که وام گیرنده باید به صندوق ارائه دهد."
              >
                <select
                  value={collateral}
                  onChange={(e) => setCollateral(e.target.value)}
                  className="w-full rounded-lg border border-gray-40 bg-gray-20 px-3 py-2.5 text-neutral-90 text-sm outline-none appearance-none cursor-pointer bg-no-repeat bg-[length:1rem] pl-9 pr-3 bg-[left_0.75rem_center] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364646a%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')]"
                >
                  {collateralOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </FieldRow>
            </div>

            {/* ستون چپ: اطلاعات حساب صندوق */}
            <div className="space-y-8">
              <FieldRow
                label="شماره شبا صندوق"
                description="شماره شبا صندوق جهت واریزی اعضا"
              >
                <input
                  type="text"
                  value={sheba}
                  onChange={(e) => setSheba(e.target.value)}
                  className="w-full rounded-lg border border-gray-40 bg-gray-20 px-3 py-2.5 text-neutral-90 text-sm outline-none font-mono"
                  dir="ltr"
                />
              </FieldRow>
              <FieldRow
                label="شماره حساب صندوق"
                description="شماره حساب صندوق جهت واریزی اعضا"
              >
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full rounded-lg border border-gray-40 bg-gray-20 px-3 py-2.5 text-neutral-90 text-sm outline-none font-mono"
                  dir="ltr"
                />
              </FieldRow>
              <FieldRow
                label="شماره کارت صندوق"
                description="شماره کارت صندوق جهت واریزی اعضا"
              >
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full rounded-lg border border-gray-40 bg-gray-20 px-3 py-2.5 text-neutral-90 text-sm outline-none font-mono"
                  dir="ltr"
                />
              </FieldRow>
              <FieldRow
                label="وام همزمان"
                description="تعیین تعداد وام همزمان وام گیرندگان"
              >
                <NumberInputWithUnit
                  value={simultaneousLoans}
                  onChange={setSimultaneousLoans}
                  unit="ماه"
                  max={24}
                />
              </FieldRow>
              <div className="flex flex-row gap-6 items-center">
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-neutral-90">
                    نداشتن بدهی معوق برای درخواست وام
                  </span>
                </div>
                <div className="w-full max-w-[280px] shrink-0">
                  <label className="relative inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full border border-gray-40 bg-gray-30 transition-colors peer-checked:bg-gray-30">
                    <input
                      type="checkbox"
                      checked={noOverdueRequired}
                      onChange={(e) => setNoOverdueRequired(e.target.checked)}
                      className="peer sr-only"
                    />
                    <span className="absolute top-1 h-6 w-6 rounded-full bg-neutral-white shadow-sm transition-all right-1 peer-checked:left-1 peer-checked:right-auto" />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* دکمه ویرایش */}
          <div className="mt-2 pt-2 border-t border-neutral-20 flex justify-end">
            <button
              type="button"
              className="px-6 py-2.5 rounded-lg bg-primary text-neutral-white text-sm font-medium hover:bg-primary-90 transition"
            >
              ویرایش
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
