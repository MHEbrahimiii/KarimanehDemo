import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

type LoansStatusData = {
  labels: string[];
  data: number[];
};

export default function DonutChart({ loansStatus }: { loansStatus: LoansStatusData }) {
  const colors = ["var(--primary-70)", "var(--secondary-60)", "var(--gray-60)"];

  return (
    <div className="bg-white p-4 rounded-xl border">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={loansStatus.labels.map((l: string, i: number) => ({
              name: l,
              value: loansStatus.data[i],
            }))}
            innerRadius={50}
            outerRadius={80}
            dataKey="value"
          >
            {colors.map((c, i) => (
              <Cell key={i} fill={c} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
