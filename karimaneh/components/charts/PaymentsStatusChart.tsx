"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import type { PaymentStatus } from "@/types/tables"

type Props = {
  data: PaymentStatus[]
}

export default function PaymentsStatusChart({ data }: Props) {
  return (
    <div className="bg-white p-4 rounded-xl border">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={50}
            outerRadius={80}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
