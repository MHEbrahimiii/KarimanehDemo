import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

export default function BalanceLineChart({ balances }: any) {
  return (
    <div className="bg-white p-4 rounded-xl border h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={balances.labels.map((l: string, i: number) => ({
            name: l,
            value: balances.data[i],
          }))}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Line dataKey="value" stroke="#7C5CFF" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
