"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { IconChevronDown } from "@tabler/icons-react";
import { toPersianDigits } from "@/lib/formatters";
import { loanStatusChartData } from "@/mock/reports";
export default function LoanStatusChartCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8">
      
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          نمودار وضعیت وام ها
        </h2>
        <div className="relative">
          <select className="appearance-none bg-white border border-gray-300 rounded-lg px-5 py-2.5 pl-10 text-sm md:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[140px]">
            <option>ماهانه</option>
            <option>شش ماهه</option>
            <option>سالانه</option>
          </select>
          <IconChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
      </div>
      <div className="flex items-center justify-center gap-8">
        <div className="flex flex-col gap-3">
          {loanStatusChartData.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-700">
                {item.name} ({toPersianDigits(item.value)}%)
              </span>
            </div>
          ))}
        </div>
        <div className="flex-1 max-w-[300px]">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={loanStatusChartData}
                cx="50%"
                cy="50%"
                innerRadius={90}
                outerRadius={130}
                paddingAngle={5}
                cornerRadius={10}
                dataKey="value"
              >
                {loanStatusChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

