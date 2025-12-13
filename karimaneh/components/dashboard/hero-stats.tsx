import StatCard from "./stat-card";

export default function HeroStats({ data }: any) {
  if (!data || !data.heroStats) {
    return null;
  }

  return (
    <div className="col-span-3 grid grid-cols-3 gap-3">
      {data.heroStats.map((s: any, i: number) => (
        <StatCard key={i} {...s} />
      ))}
    </div>
  );
}
