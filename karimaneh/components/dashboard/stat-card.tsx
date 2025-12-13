export default function StatCard({ title, value }: any) {
  return (
    <div className="bg-white p-4 rounded-xl border">
      <p className="text-xs text-gray-500">{title}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
}
