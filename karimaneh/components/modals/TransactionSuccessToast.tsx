"use client";

import { useEffect } from "react";
import { IconCheck } from "@tabler/icons-react";
import type { TransactionSuccessToastProps } from "@/types/transactions";

export default function TransactionSuccessToast({
  isOpen,
  message,
  onClose,
}: TransactionSuccessToastProps) {
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(onClose, 2400);
    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-8 left-8 z-[1300] rounded-xl border border-green-30 bg-white shadow-lg px-4 py-3 flex items-center gap-3 min-w-[260px]">
      <div className="w-9 h-9 rounded-full bg-green-20 flex items-center justify-center text-green-80">
        <IconCheck size={20} />
      </div>
      <p className="text-sm font-medium text-neutral-90">{message}</p>
    </div>
  );
}
