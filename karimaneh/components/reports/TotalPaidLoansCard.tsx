"use client";

import React from 'react';
import { toPersianDigits, formatNumber } from '@/lib/formatters';
import { paidLoanReportData } from '@/mock/reports';

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
            {paidLoanReportData.map((row, index) => (
              <tr
                key={index}
                className={`border-b last:border-0 bg-white ${index === paidLoanReportData.length - 1 ? 'font-semibold' : ''}`}
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


