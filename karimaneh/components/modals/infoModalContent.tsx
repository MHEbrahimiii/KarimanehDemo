'use client';
import React from 'react';
import { toPersianDigits } from "@/lib/formatters";
import Image from 'next/image';
import { images } from '@/public/images/images';
import { formatNumber } from '@/lib/formatters';
interface InfoModalContentProps {
  data?: {
    id: number;
    fullName: string;
    nationalCode: string;
    fatherName?: string;
    receivedLoans: string;
    status: 'active' | 'inactive';
    mobile?: string;
  } | null;
  onClose: () => void;
}

export default function InfoModalContent({ data, onClose }: InfoModalContentProps) {
  if (!data) return null;

  const member = data;
  const statusText = member.status === 'active' ? 'فعال' : 'غیرفعال';
  const statusColor = member.status === 'active' ? 'text-green-500' : 'text-red-500';

  const depositBalance = "100,000,000";
  const fundDebt = "20,000,000";

  return (
    <div className="w-full bg-[#f8f9fa] rounded-3xl overflow-hidden" dir="rtl">
      <div className="relative p-6 pb-2" dir='ltr' >

        <button onClick={onClose} className="absolute top-6 left-6 text-gray-800 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-4 w-full justify-end">
            <div className="flex-1 text-left pl-12 sm:pl-0">
                 <button className="px-4 py-1.5 border border-indigo-900 text-indigo-900 text-sm rounded-lg hover:bg-indigo-50 transition-colors font-medium">
                  ویرایش
                </button>
            </div>

            <div className="text-right flex flex-col items-end">
              <h3 className="text-xl font-bold text-gray-900 mb-1">{member.fullName}</h3>
              <span className="text-gray-400 text-xs mb-1">عضو صندوق</span>
              <div className={`flex items-center text-sm font-bold ${statusColor}`}>
                 <span className="text-xs ml-1">●</span> {statusText}
              </div>
            </div>
            
            <div className="relative shrink-0">
               <div className="w-20 h-20 rounded-full p-1 border-2 border-pink-200">
                  <Image 
                    className="rounded-full object-cover" 
                    width={80} 
                    height={80} 
                    alt='آواتار' 
                    src={images.Avatar}
                  />
               </div>
            </div>
          </div>
        </div>
      </div>


      <div className="bg-[#f3f4f6] mx-6 rounded-xl py-4 mt-4">
        <div className="flex justify-between items-center text-center divide-x divide-x-reverse divide-gray-300">
          
          <div className="flex-1 px-2">
            <p className="text-xs text-gray-500 font-bold mb-2">موجودی سپرده</p>
            <p className="font-bold text-gray-600 text-sm">
              {toPersianDigits(depositBalance)} <span className="text-[10px] font-light">ریال</span>
            </p>
          </div>
          <div className="flex-1 px-2">
            <p className="text-xs text-gray-500 font-bold mb-2">مجموع وام های دریافتی</p>
            <p className="font-bold text-gray-600 text-sm">
              {toPersianDigits(formatNumber(member.receivedLoans || "1000000000"))} <span className="text-[10px] font-light">ریال</span>
            </p>
          </div>
          <div className="flex-1 px-2">
            <p className="text-xs text-gray-500 font-bold mb-2">بدهی به صندوق</p>
            <p className="font-bold text-gray-600 text-sm">
              {toPersianDigits(fundDebt)} <span className="text-[10px] font-light">ریال</span>
            </p>
          </div>

        </div>
      </div>
      <div className="w-full h-px bg-gray-200 my-6"></div>
      <div className="px-6 space-y-5 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-bold">نام و نام خانوادگی:</span>
          <span className="text-gray-700">{member.fullName}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-bold">کد ملی:</span>
          <span className="text-gray-700 font-mono text-lg">{toPersianDigits(member.nationalCode)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-bold">شماره موبایل:</span>
          <span className="text-gray-700 font-mono text-lg tracking-wider">{toPersianDigits(member.mobile ?? '09123456789')}</span>
        </div>
      </div>
      <div className="w-full h-px bg-gray-200 my-6"></div>
      <div className="px-6 space-y-5 text-sm mb-8">
        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-bold">شماره حساب:</span>
          <span className="text-gray-700 font-mono text-lg tracking-wider">{toPersianDigits('0030220318574869')}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-bold">شماره شبا:</span>
          <span className="text-gray-700 font-mono text-sm">{toPersianDigits('IR-410170000003048241701')}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-bold">شماره کارت:</span>
          <span className="text-gray-700 font-mono text-lg tracking-wider">{toPersianDigits('6037-9917-2122-2323')}</span>
        </div>
      </div>
      <div className="p-6 pt-0 flex gap-4">
        <button className="flex-1 py-4 bg-[#241c5c] text-white font-bold rounded-xl hover:bg-[#1a1445] transition-colors text-lg shadow-lg shadow-indigo-900/20">
          ویرایش
        </button>
        <button
          onClick={onClose}
          className="flex-1 py-4 bg-[#f3f4f6] text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors text-lg"
        >
          بازگشت
        </button>
      </div>
    </div>
  );
}