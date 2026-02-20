"use client";

import React from 'react';
import { toPersianDigits, formatNumber } from '@/lib/formatters';

interface LoanData {
  period: string;
  totalPaid: number;
}

const loanData: LoanData[] = [
  { period: 'ماهانه', totalPaid: 38000000 },
  { period: 'شش ماهه', totalPaid: 600000000 },
  { period: 'سالانه', totalPaid: 2300000000 },
];

export default function TotalPaidLoansCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-1">
        مجموع وام های پرداخت شده
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        مجموع وام های پرداخت شده به تفکیک
      </p>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-3 text-right text-gray-600 font-semibold">دوره</th>
              <th className="p-3 text-right text-gray-600 font-semibold">مجموع وام های پرداخت شده</th>
            </tr>
          </thead>
          <tbody>
            {loanData.map((row, index) => (
              <tr
                key={index}
                className={`border-b last:border-0 bg-white ${index === loanData.length - 1 ? 'font-semibold' : ''}`}
              >
                <td className="p-3 text-gray-700">{row.period}</td>
                <td className="p-3 text-gray-700">
                  {toPersianDigits(formatNumber(String(row.totalPaid)))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

