import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function DonutChart({ loansStatus }: any) {
  const colors = ["#846DD8", "#FFC857", "#CCC"];

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
