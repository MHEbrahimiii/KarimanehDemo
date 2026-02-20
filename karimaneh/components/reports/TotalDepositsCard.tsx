"use client";

import React from 'react';
import { toPersianDigits, formatNumber } from '@/lib/formatters';
import { IconArrowUp, IconArrowDown } from '@tabler/icons-react';
import { depositReportData } from '@/mock/reports';

export default function TotalDepositsCard() {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-1">
                مجموع واریزی ها
            </h2>
            <p className="text-sm text-gray-500 mb-6">
                مجموع واریزی ها توسط اعضا به تفکیک دوره
            </p>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 border-b">
                            <th className="p-3 text-right text-gray-600 font-semibold">دوره</th>
                            <th className="p-3 text-right text-gray-600 font-semibold">حق اشتراک</th>
                            <th className="p-3 text-right text-gray-600 font-semibold">قسط وام</th>
                            <th className="p-3 text-right text-gray-600 font-semibold">مجموع</th>
                        </tr>
                    </thead>
                    <tbody>
                        {depositReportData.map((row, index) => (
                            <tr
                                key={index}
                                className={`border-b last:border-0 bg-white `}
                            >
                                <td className="p-3 text-gray-700">
                                    {row.period}
                                </td>
                                <td className="p-3 text-gray-700">
                                    {toPersianDigits(formatNumber(String(row.subscription)))}
                                </td>
                                <td className="p-3 text-gray-700">
                                    {toPersianDigits(formatNumber(String(row.loanInstallment)))}
                                </td>
                                <td className="p-3 text-gray-700 flex items-center gap-2">
                                    {row.trend === 'up' ? (
                                        <IconArrowUp className="text-green-500 w-4 h-4 flex-shrink-0" />
                                    ) : (
                                        <IconArrowDown className="text-red-500 w-4 h-4 flex-shrink-0" />
                                    )}
                                    <span>{toPersianDigits(formatNumber(String(row.total)))}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


