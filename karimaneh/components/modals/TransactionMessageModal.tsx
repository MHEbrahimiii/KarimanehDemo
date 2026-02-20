"use client";

import { useState } from "react";
import { IconSend, IconX } from "@tabler/icons-react";
import type { TransactionMessageModalProps } from "@/types/transactions";

const defaultBody =
  "عضو محترم صندوق قرض‌الحسنه،\nبا سلام\nبا توجه به ابهام در واریزی، لطفا در اسرع وقت نسبت به ارسال تصویر پرداخت اقدام فرمایید.\nبا تشکر از همکاری شما";

export default function TransactionMessageModal({
  open,
  payer,
  onClose,
  onSubmit,
}: TransactionMessageModalProps) {
  const [subject, setSubject] = useState("پیگیری تراکنش");
  const [body, setBody] = useState(defaultBody);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1200] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="w-full max-w-[520px] rounded-xl bg-card border border-border shadow-xl"
        dir="rtl"
      >
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-bold text-neutral-90">ارسال پیام</h2>
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
          <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] items-center gap-3">
            <label className="text-sm font-medium text-neutral-80">گیرنده:</label>
            <input
              value={payer || "نامشخص"}
              readOnly
              className="w-full rounded-lg border border-gray-40 bg-gray-20 px-3 py-2.5 text-sm outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] items-center gap-3">
            <label className="text-sm font-medium text-neutral-80">موضوع:</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-lg border border-gray-40 bg-gray-20 px-3 py-2.5 text-sm outline-none"
            >
              <option value="پیگیری تراکنش">پیگیری تراکنش</option>
              <option value="نیاز به اصلاح اطلاعات">نیاز به اصلاح اطلاعات</option>
              <option value="تایید واریزی">تایید واریزی</option>
            </select>
          </div>

          <textarea
            rows={5}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full rounded-lg border border-gray-40 bg-gray-20 px-3 py-2.5 text-sm leading-7 outline-none"
          />
        </div>

        <div className="px-5 pb-5 flex items-center gap-2">
          <button
            type="button"
            onClick={onSubmit}
            className="flex-1 rounded-lg bg-primary-100 text-white py-2.5 text-sm font-medium hover:bg-primary-90 transition inline-flex items-center justify-center gap-2"
          >
            <IconSend size={16} />
            ارسال پیام
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-primary-90 text-primary-90 py-2.5 text-sm font-medium hover:bg-primary-10 transition"
          >
            بازگشت
          </button>
        </div>
      </div>
    </div>
  );
}
