import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip as RTooltip,
} from "recharts";
import { toPersianDigits } from "@/lib/formatters";

type BalanceSeries = {
  labels: string[];
  data: number[];
};

export default function BalanceLineChart({ balances }: { balances: BalanceSeries }) {
  const data = balances.labels.map((l: string, i: number) => ({
    name: l,
    value: balances.data[i],
  }));

  const maxValue = Math.max(...data.map((d) => d.value));
  const yAxisMax = Math.max(40, Math.ceil(maxValue / 10) * 10);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} >
        <CartesianGrid stroke="var(--gray-30)" vertical={false} />
        <XAxis 
          dataKey="name" 
          tick={{ fontSize: 9, fill: "var(--gray-80)" }}
          axisLine={false}
          tickLine={false}
          interval={0}
          angle={-45}
          textAnchor="end"
          height={50}
        />
        <YAxis 
          tick={{ fontSize: 10, fill: "var(--gray-80)" }}
          axisLine={false}
          tickLine={false}
          domain={[0, yAxisMax]}
          tickFormatter={(value) => toPersianDigits(value.toString())}
        />
        <RTooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="var(--primary-80)"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: "var(--primary-80)" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

