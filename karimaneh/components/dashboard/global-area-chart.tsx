import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
} from "recharts";

export default function GlobalAreaChart({ globalStats }: any) {
  // داده‌ها
  const data = globalStats.months.map((m: string, i: number) => ({
    name: m,
    value: globalStats.paid[i],
  }));

  // پالت رنگ (تیره → روشن)
  const COLORS = [
    "#2C1B6F",
    "#5B4BB7",
    "#9B8CFF",
    "#E6DEFF",
  ];

  return (
    <div className="bg-white p-4 rounded-xl border h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="1" y2="0">
              {data.map((_, i) => {
                const offset =
                  data.length === 1
                    ? "0%"
                    : `${(i / (data.length - 1)) * 100}%`;

                const colorIndex = Math.min(
                  Math.floor((i / data.length) * COLORS.length),
                  COLORS.length - 1
                );

                return (
                  <stop
                    key={i}
                    offset={offset}
                    stopColor={COLORS[colorIndex]}
                    stopOpacity={1}
                  />
                );
              })}
            </linearGradient>
          </defs>

          <XAxis dataKey="name" hide />

          <Area
            type="monotone"
            dataKey="value"
            stroke="#4C2FB6"
            strokeWidth={2}
            fill="url(#areaGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
