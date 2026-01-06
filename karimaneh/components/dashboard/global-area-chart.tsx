import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { toPersianDigits } from "@/lib/formatters";

export default function GlobalAreaChart({ paidLoans }: any) {
  const data = paidLoans.months.map((m: string, i: number) => ({
    name: m,
    value: paidLoans.data[i],
  }));

  const COLORS = [
    "#2C1B6F",
    "#5B4BB7",
    "#9B8CFF",
    "#E6DEFF",
  ];

  const gradientId = "paidLoansGradient";
  const numSegments = data.length;

  const gradientStops = data.flatMap((_: any, i: number) => {
    const startOffset = (i / numSegments) * 100;
    const endOffset = ((i + 1) / numSegments) * 100;
    
    const colorIndex = Math.min(
      Math.floor((i / Math.max(numSegments - 1, 1)) * (COLORS.length - 1)),
      COLORS.length - 1
    );
    const color = COLORS[colorIndex];

    return [
      <stop
        key={`start-${i}`}
        offset={`${startOffset}%`}
        stopColor={color}
        stopOpacity={1}
      />,
      <stop
        key={`end-${i}`}
        offset={`${endOffset}%`}
        stopColor={color}
        stopOpacity={1}
      />,
    ];
  });

  const yAxisMax = 60;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            {gradientStops}
          </linearGradient>
        </defs>

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
          ticks={[0, 10, 30, 35, 50]}
          tickFormatter={(value) => toPersianDigits(value.toString())}
        />

        <Area
          type="monotone"
          dataKey="value"
          stroke="var(--primary-80)"
          strokeWidth={2}
          fill={`url(#${gradientId})`}
          dot={false}
          activeDot={{ r: 4, fill: "var(--primary-80)" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
