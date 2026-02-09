'use client';
import React, { useState } from 'react';

interface SendMessageModalProps {
  data?: {
    id: number;
    fullName: string;
    nationalCode: string;
  } | null;
  onClose: () => void;
  onSubmit?: () => void;
}

const defaultMessage = `عضو محترم صندوق قرض‌الحسنه،
با سلام
با توجه به عدم پرداخت قسط وام شما در تاریخ مقرر، لطفاً در اسرع وقت نسبت به تسویه یا هماهنگی جهت پرداخت اقدام فرمایید.
با تشکر از همکاری شما`;

export default function SendMessageModalContent({ data, onClose, onSubmit }: SendMessageModalProps) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState(defaultMessage);
  const [isEditingMessage, setIsEditingMessage] = useState(false);
  

  const receiverName = data?.fullName || 'کاربر';

  return (
    <div className="w-full" dir="rtl">

      <div className="relative bg-linear-to-r from-blue-50 to-blue-100 p-6 rounded-t-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">

            <div className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">ارسال پیام</h3>
              <p className="text-xs text-gray-500">ارسال اعلان به عضو صندوق</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 space-y-6">
        <div className="flex items-center gap-3">
          <label className="text-gray-700 font-bold whitespace-nowrap w-24 text-left ml-2 text-sm">
            گیرنده/گیرندگان:
          </label>
          <div className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-800 text-right font-medium text-sm">
            {receiverName}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-gray-700 font-bold whitespace-nowrap w-24 text-left ml-2 text-sm">
            موضوع:
          </label>
          <div className="relative w-full">
            <select 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-600 text-sm appearance-none outline-none focus:border-blue-500 transition-colors cursor-pointer"
            >
              <option value="" disabled hidden>انتخاب کنید</option>
              <option value="warning">تاخیر در پرداخت قسط</option>
              <option value="info">تاخیر در پرداخت حق اشتراک</option>
              <option value="correction">اصلاح واریزی</option>
            </select>
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
        </div>
        <div className="relative mt-2 pt-2">
            <span className="absolute -top-2 right-3 bg-white px-2 text-xs text-gray-500 z-10">
                متن پیام
            </span>
            {!isEditingMessage ? (
              <div 
                onClick={() => setIsEditingMessage(true)}
                className="border border-gray-200 rounded-lg p-4 text-sm leading-7 text-gray-700 text-right min-h-[140px] bg-white cursor-pointer hover:bg-gray-50 transition-colors"
              >
                {message.split('\n').map((line, index) => (
                  <p key={index} className={index === 0 ? "font-bold" : "text-gray-600"}>
                    {line}
                  </p>
                ))}
              </div>
            ) : (
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onBlur={() => setIsEditingMessage(false)}
                className="w-full border border-blue-500 rounded-lg p-4 text-sm leading-7 text-gray-700 text-right min-h-[140px] bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                autoFocus
              />
            )}
        </div>

      </div>
      <div className="bg-gray-50 p-6 rounded-b-2xl flex gap-3">
        <button
            onClick={() => {
                if(onSubmit) onSubmit();
                onClose();
            }}
            className="flex-1 px-4 py-3 bg-[#1e1b4b] text-white font-bold rounded-lg hover:bg-[#151238] transition-colors shadow-lg shadow-indigo-900/10"
        >
          ارسال پیام
        </button>
        <button
          onClick={onClose}
          className="flex-1 px-4 py-3 border-2 border-gray-800 text-gray-800 font-bold rounded-lg hover:bg-gray-100 transition-colors"
        >
          بازگشت
        </button>
      </div>
    </div>
  );
}