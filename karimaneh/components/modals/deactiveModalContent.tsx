"use client";
import { IconAlertTriangle } from "@tabler/icons-react";
interface Props {
  data?: { fullName?: string };
  onConfirm: () => void;
  onClose: () => void;
}
export default function DeactivateMemberContent({ data, onConfirm, onClose }: Props) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 bg-red-10 rounded-full flex items-center justify-center mb-5">
        <div className="w-12 h-12 bg-red-20 rounded-full flex items-center justify-center text-destructive">
          <IconAlertTriangle size={28} stroke={2} />
        </div>
      </div>

      <h3 className="text-[19px] font-bold text-foreground mb-3">
        غیر فعال‌سازی کاربر
      </h3>
      
      <p className="text-muted-foreground text-[14px] leading-7 mb-8">
        آیا از غیرفعال‌سازی <span className="text-foreground font-bold italic">&quot;{data?.fullName}&quot;</span> اطمینان دارید؟
      </p>
      <div className="flex gap-3 w-full">
        <button
          onClick={onConfirm}
          className="flex-1 py-3 bg-destructive hover:bg-red-70 text-white rounded-xl font-bold transition-all text-[15px]"
        >
          غیر فعال‌سازی
        </button>
        <button
          onClick={onClose}
          className="flex-1 py-3 border border-input text-foreground rounded-xl font-bold hover:bg-muted transition-all text-[15px]"
        >
          انصراف
        </button>
      </div>
      <div className="mt-8 flex items-center gap-2 text-muted-foreground text-[12px] select-none">
        <input 
          type="checkbox" 
          id="dontShow" 
          className="w-4 h-4 rounded border-input accent-destructive cursor-pointer" 
        />
        <label htmlFor="dontShow" className="cursor-pointer">دوباره نمایش نده!</label>
      </div>
    </div>
  );
}
