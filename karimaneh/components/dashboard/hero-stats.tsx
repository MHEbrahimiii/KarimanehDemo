import StatCard from "./stat-card";

interface HeroStatsData {
  heroStats: Array<{
    title: string;
    value: string;
  }>;
}

export default function HeroStats({ data }: { data: HeroStatsData | null }) {
  if (!data || !data.heroStats) {
    return null;
  }

  return (
    <div className="col-span-3 grid grid-cols-3 gap-3">
      {data.heroStats.map((s, i) => (
        <StatCard key={i} {...s} />
      ))}
    </div>
  );
}
