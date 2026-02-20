interface StatCardProps {
  title: string;
  value: string;
}

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="bg-neutral-white p-4 rounded-xl border border-gray-30">
      <p className="text-xs text-gray-80">{title}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
}
