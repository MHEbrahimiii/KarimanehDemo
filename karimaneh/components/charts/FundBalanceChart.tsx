"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

import type { MonthlyBalance } from "@/types/tables"
import { formatYAxis } from "@/lib/formatters";

type Props = {
  data: MonthlyBalance[]
}

export default function FundBalanceChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,}
        }
        >
   
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickFormatter={formatYAxis}
        />
        <Tooltip 
        formatter={(value: number) => formatYAxis(value)}/>
        <Bar
          dataKey="amount"
          fill="#1E0E62"
          radius={[12, 12, 0, 0]}
          barSize={35}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
