"use client";
import { IconAlertTriangle } from "@tabler/icons-react";
interface Props {
  data: any;
  onConfirm: () => void;
  onClose: () => void;
}
export default function DeactivateMemberContent({ data, onConfirm, onClose }: Props) {
  return (
    <div className="flex flex-col items-center text-center font-[vazir]">
      <div className="w-16 h-16 bg-[#fff1f2] rounded-full flex items-center justify-center mb-5">
        <div className="w-12 h-12 bg-[#ffe4e6] rounded-full flex items-center justify-center text-[#e11d48]">
          <IconAlertTriangle size={28} stroke={2} />
        </div>
      </div>

      <h3 className="text-[19px] font-bold text-gray-800 mb-3">
        غیر فعال‌سازی کاربر
      </h3>
      
      <p className="text-gray-500 text-[14px] leading-7 mb-8">
        آیا از غیرفعال‌سازی <span className="text-gray-800 font-bold italic">"{data?.fullName}"</span> اطمینان دارید؟
      </p>
      <div className="flex gap-3 w-full">
        <button
          onClick={onConfirm}
          className="flex-1 py-3 bg-[#e11d48] hover:bg-[#be123c] text-white rounded-xl font-bold transition-all text-[15px]"
        >
          غیر فعال‌سازی
        </button>
        <button
          onClick={onClose}
          className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-all text-[15px]"
        >
          انصراف
        </button>
      </div>
      <div className="mt-8 flex items-center gap-2 text-gray-400 text-[12px] select-none">
        <input 
          type="checkbox" 
          id="dontShow" 
          className="w-4 h-4 rounded border-gray-300 accent-[#e11d48] cursor-pointer" 
        />
        <label htmlFor="dontShow" className="cursor-pointer">دوباره نمایش نده!</label>
      </div>
    </div>
  );
}