'use client';
import React from 'react';
import { toPersianDigits } from "@/lib/formatters";
import Image from 'next/image';
import { images } from '@/public/images/images';
import { formatNumber } from "@/lib/formatters";

interface InfoModalContentProps {
  data?: {
    id: number;
    fullName: string;
    nationalCode: string;
    fatherName?: string;
    receivedLoans: string;
    status: 'active' | 'inactive';
  } | null;
  onClose: () => void;
}

export default function ArreaersModalContent({ data, onClose }: InfoModalContentProps) {
  if (!data) return null;

  const member = data;
  const statusText = member.status === 'active' ? '. فعال' : '. غیرفعال';
  const statusColor = member.status === 'active' ? 'text-green-700' : 'text-red-700';

  return (
    <div className="w-full" dir="rtl">
      <div className="relative bg-linear-to-r from-blue-50 to-blue-100 p-6 rounded-t-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-mono">{toPersianDigits(((member as any).mobile ?? '09123456789'))}</span>
            <div className="w-px h-6 bg-gray-200" />
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{member.fullName}</h3>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${statusColor}`}>
                {statusText}
              </div>
            </div>
          </div>
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold ml-4 shrink-0">
           <Image width={80} height={80} alt='آواتار' src={images.Avatar}></Image>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">درخواست وام</p>
            <p className="font-bold text-gray-700">-</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">وام های دریافتی</p>
            <p className="font-bold text-gray-700">۱</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">موجودی حساب</p>
            <p className="font-bold text-gray-700">{toPersianDigits(formatNumber(member.receivedLoans))}</p>
          </div>
        </div>
        <div dir="rtl" className="space-y-3 border-t border-gray-200 pt-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">نام و نام خانوادگی:</span>
            <span className="font-semibold text-gray-800">{member.fullName}</span>
          </div>
          {member.fatherName && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">نام پدر:</span>
              <span className="font-semibold text-gray-800">{member.fatherName}</span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">کد ملی:</span>
            <span className="font-semibold text-gray-800 font-mono">{toPersianDigits(member.nationalCode)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">شماره موبایل:</span>
            <span className="font-semibold text-gray-800 font-mono">{toPersianDigits(((member as any).mobile ?? '09123456789'))}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">شماره حساب:</span>
            <span className="font-semibold text-gray-800 font-mono">۰۱۲۳۴۵۶۷۸۹</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">شماره شبا:</span>
            <span className="font-semibold text-gray-800 font-mono text-xs">IR-FiolY########P#F#YI##</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">کد پستی:</span>
            <span className="font-semibold text-gray-800 font-mono">۹۸۷۰-۹۹۱۷-۲۱۲۲-۹۹۹۹</span>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 p-6 rounded-b-2xl flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 px-4 py-3 border-2 border-gray-800 text-gray-800 font-bold rounded-lg hover:bg-gray-100 transition-colors"
        >
          بازگشت
        </button>
        <button className="flex-1 px-4 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-900 transition-colors">
          ویرایش
        </button>
      </div>
    </div>
  );
}
