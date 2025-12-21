import { AreaChart, Area, ResponsiveContainer } from "recharts";

export default function GlobalAreaChart({ globalStats }: any) {
  return (
    <div className="bg-white p-4 rounded-xl border h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={globalStats.months.map((m: string, i: number) => ({
            name: m,
            value: globalStats.paid[i],
          }))}
        >
          <Area
            dataKey="value"
            stroke="var(--primary-80)"
            fill="var(--primary-20)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
