"use client";

import { useEffect, useMemo, useState } from "react";
import { getDashboardMock } from "@/services/dashboard";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as RTooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
import { IconCreditCard, IconUsers, IconWallet, IconClock, IconTicket } from "@tabler/icons-react";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    getDashboardMock().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  const donutChartData = useMemo(() => {
    if (!data) return [];
    return data.loansStatus.labels.map((label: string, idx: number) => ({
      name: label,
      value: data.loansStatus.data[idx],
      color: ["var(--primary-70)", "var(--secondary-60)", "var(--gray-60)"][idx],
    }));
  }, [data]);

  const lineChartData = useMemo(() => {
    if (!data) return [];
    return data.balances.labels.map((label: string, idx: number) => ({
      name: label,
      value: data.balances.data[idx],
    }));
  }, [data]);

  const areaChartData = useMemo(() => {
    if (!data) return [];
    return data.globalStats.paid.map((value: number, idx: number) => ({
      name: data.globalStats.months[idx] || `p${idx}`,
      value,
    }));
  }, [data]);

  return (
    <div className="p-8 space-y-10">
      <header className="flex items-center justify-between">
        <div className="text-right">
          <p className="text-sm text-gray-500">صندوق قرض الحسنه کریمانه</p>
          <h1 className="text-3xl font-bold text-gray-900">پیشخوان</h1>
        </div>
        <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600">
          اعلان‌ها
        </button>
          </header>

          {loading ? (
            <div className="text-center py-20 text-gray-80">در حال بارگذاری...</div>
          ) : (
            <>
              <section className="grid grid-cols-4 gap-3">
                <div className="col-span-3 grid grid-cols-3 gap-3">
                  <div className="bg-neutral-white p-3 rounded-lg border border-gray-30 shadow-sm flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-md bg-primary-70/10 flex items-center justify-center">
                        <IconCreditCard className="w-4 h-4 text-primary-70" />
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-80 leading-tight">درخواست های وام جدید</p>
                    <p className="text-lg font-bold text-secondary-100 leading-tight">۲</p>
                  </div>

                  <div className="bg-neutral-white p-3 rounded-lg border border-gray-30 shadow-sm flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-md bg-[#846DD8]/10 flex items-center justify-center">
                        <IconUsers className="w-4 h-4 text-[#846DD8]" />
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-500 leading-tight">تعداد اعضای صندوق</p>
                    <p className="text-lg font-bold text-[#A07800] leading-tight">۲۳</p>
                  </div>

                  <div className="bg-neutral-white p-3 rounded-lg border border-gray-30 shadow-sm flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-md bg-[#846DD8]/10 flex items-center justify-center">
                        <IconWallet className="w-4 h-4 text-[#846DD8]" />
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-500 leading-tight">موجودی صندوق</p>
                    <p className="text-lg font-bold text-[#A07800] leading-tight">ریال ۵۰۰,۰۰۰,۰۰۰</p>
                  </div>

                  <div className="bg-neutral-white p-3 rounded-lg border border-gray-30 shadow-sm flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-md bg-[#846DD8]/10 flex items-center justify-center">
                        <IconWallet className="w-4 h-4 text-[#846DD8]" />
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-500 leading-tight">آخرین واریزی</p>
                    <p className="text-lg font-bold text-[#A07800] leading-tight">ریال ۲۰,۰۰۰,۰۰۰</p>
                  </div>

                  <div className="bg-neutral-white p-3 rounded-lg border border-gray-30 shadow-sm flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-md bg-[#846DD8]/10 flex items-center justify-center">
                        <IconClock className="w-4 h-4 text-[#846DD8]" />
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-500 leading-tight">معوقات</p>
                    <p className="text-lg font-bold text-[#A07800] leading-tight">ریال ۱۰۰,۰۰۰,۰۰۰</p>
                  </div>

                  <div className="bg-neutral-white p-3 rounded-lg border border-gray-30 shadow-sm flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-md bg-[#846DD8]/10 flex items-center justify-center">
                        <IconTicket className="w-4 h-4 text-[#846DD8]" />
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-500 leading-tight">جدیدترین تیکت ها</p>
                    <p className="text-lg font-bold text-secondary-100 leading-tight">۲</p>
                  </div>
                </div>

                <div className="col-span-1 bg-neutral-white p-4 rounded-xl border border-gray-30 shadow-sm flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-primary-80">وضعیت کلی وام ها</p>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-32 w-32 flex-shrink-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={donutChartData}
                            dataKey="value"
                            nameKey="name"
                            innerRadius="60%"
                            outerRadius="90%"
                            paddingAngle={2}
                            startAngle={90}
                            endAngle={-270}
                          >
                            {donutChartData.map((entry: { color: string }, idx: number) => (
                              <Cell key={idx} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="space-y-2 text-[10px] text-gray-80 flex-1">
                      {data?.loansStatus?.labels?.map((lbl: string, idx: number) => {
                        const colors = ["var(--secondary-60)", "var(--primary-70)", "var(--gray-60)"];
                        return (
                          <div key={lbl} className="flex items-center gap-1.5">
                            <span
                              className="w-2.5 h-2.5 rounded-full inline-block flex-shrink-0"
                              style={{ backgroundColor: colors[idx] }}
                            />
                            <span className="text-right leading-tight">{lbl}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 mt-auto pt-3 border-t border-gray-20">
                    <button className="px-2 py-1 text-[10px] rounded-md text-gray-80 hover:bg-gray-20 transition">
                      ۲۴ ساعت
                    </button>
                    <button className="px-2 py-1 text-[10px] rounded-md text-gray-80 hover:bg-gray-20 transition">
                      ۷ روز
                    </button>
                    <button className="px-2 py-1 text-[10px] rounded-md text-gray-80 hover:bg-gray-20 transition">
                      ۳۰ روز
                    </button>
                    <button className="px-2 py-1 text-[10px] rounded-md bg-neutral-white text-neutral-100 font-medium border border-gray-30 shadow-sm">
                      ۱۲ ماه
                    </button>
                  </div>
                </div>
              </section>

              <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="bg-neutral-white p-5 rounded-[18px] border border-gray-30 shadow-sm h-[420px] flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-base font-semibold text-primary-80">موجودی صندوق</p>
                    <div className="flex items-center gap-2 text-xs text-gray-80">
                      <span className="px-2 py-1 bg-gray-20 rounded-md">ماه ۱۲</span>
                      <span className="px-2 py-1 bg-gray-20 rounded-md">روز ۳۰</span>
                      <span className="px-2 py-1 bg-gray-20 rounded-md">ساعت ۱۲</span>
                    </div>
                  </div>
                  <div className="flex-1 flex items-end">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={lineChartData}>
                        <CartesianGrid stroke="var(--gray-30)" vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 10, fill: "var(--gray-80)" }} />
                        <YAxis tick={{ fontSize: 10, fill: "var(--gray-80)" }} axisLine={false} />
                        <RTooltip />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="var(--primary-60)"
                          strokeWidth={3}
                          dot={false}
                          activeDot={{ r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-neutral-white p-5 rounded-[18px] border border-gray-30 shadow-sm h-[420px] flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-base font-semibold text-primary-80">آمار کلی صندوق</p>
                    <div className="flex items-center gap-2 text-xs text-gray-80">
                      <span className="px-2 py-1 bg-gray-20 rounded-md">ماه ۱۲</span>
                      <span className="px-2 py-1 bg-gray-20 rounded-md">روز ۷</span>
                      <span className="px-2 py-1 bg-gray-20 rounded-md">ساعت ۱۲</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 text-center mb-4 text-sm text-neutral-70">
                    <div>
                      <p className="text-xs text-gray-80">اعضای صندوق</p>
                      <p className="font-semibold">۳۰</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-80">درخواست ها</p>
                      <p className="font-semibold">۱۰۰</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-80">مبلغ سپرده</p>
                      <p className="font-semibold">ریال ۲۰,۰۰۰,۰۰۰</p>
                    </div>
                  </div>
                  <div className="flex-1 flex items-end">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={areaChartData}>
                        <defs>
                          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--primary-20)" stopOpacity={1} />
                            <stop offset="100%" stopColor="var(--primary-90)" stopOpacity={1} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" hide />
                        <YAxis hide />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="var(--primary-80)"
                          strokeWidth={1}
                          fill="url(#areaGradient)"
                          dot={false}
                          activeDot={{ r: 4 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </section>
            </>
          )}
    </div>
  );
}
