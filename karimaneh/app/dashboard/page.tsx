"use client";

import {
  Sidebar,
} from "@/components/sidebar/sidebar-context";
import SidebarHeader from "@/components/sidebar/sidebar-header";
import SidebarLink from "@/components/sidebar/sidebar-link";
import SidebarUser from "@/components/sidebar/sidebar-user";
import {
  IconHome,
  IconUsers,
  IconCreditCard,
  IconClock,
  IconArrowsExchange,
  IconHistory,
  IconMessageCircle,
  IconSettings,
  IconWallet,
  IconTicket,
} from "@tabler/icons-react";
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
import { useAuth } from "@/context/auth-context";

const links = [
  { label: "پیشخوان", href: "/dashboard", icon: <IconHome className="text-white h-5 w-5" /> },
  { label: "اعضا", href: "#", icon: <IconUsers className="text-white h-5 w-5" /> },
  { label: "وام", href: "#", icon: <IconCreditCard className="text-white h-5 w-5" /> },
  { label: "معوقات", href: "#", icon: <IconClock className="text-white h-5 w-5" /> },
  { label: "تراکنش", href: "#", icon: <IconArrowsExchange className="text-white h-5 w-5" /> },
  { label: "گزارش ها", href: "#", icon: <IconHistory className="text-white h-5 w-5" /> },
  { label: "پشتیبانی اعضا", href: "#", icon: <IconMessageCircle className="text-white h-5 w-5" /> },
  { label: "تنظیمات", href: "#", icon: <IconSettings className="text-white h-5 w-5" /> },
];

export default function DashboardPage() {
  const { user } = useAuth();
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
      color: ["#846DD8", "#FFC857", "#CCCCCC"][idx],
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
    <Sidebar open animate={false}>
      <div className="flex h-screen w-full bg-[#F9F8F4]">
        {/* MAIN */}
        <main className="flex-1 overflow-y-auto p-8 space-y-10 mr-[280px]">
          {/* HEADER */}
          <header className="flex items-center justify-between">
            <div className="text-right">
              <p className="text-sm text-gray-500">صندوق قرض الحسنه کریمانه</p>
              <h1 className="text-3xl font-bold text-gray-900">پیشخوان</h1>
            </div>
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600">
              اعلان‌ها
            </button>
          </header>

          {/* LOADING */}
          {loading ? (
            <div className="text-center py-20 text-gray-500">در حال بارگذاری...</div>
          ) : (
            <>
              {/* TOP SECTION: 6 cards on left, donut chart on right */}
              <section className="grid grid-cols-4 gap-3">
                {/* LEFT SIDE: 6 cards in 2 rows of 3 */}
                <div className="col-span-3 grid grid-cols-3 gap-3">
                  {/* ROW 1: 3 cards */}
                  {/* درخواست های وام جدید */}
                  <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-md bg-[#846DD8]/10 flex items-center justify-center">
                        <IconCreditCard className="w-4 h-4 text-[#846DD8]" />
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-500 leading-tight">درخواست های وام جدید</p>
                    <p className="text-lg font-bold text-[#A07800] leading-tight">۲</p>
                  </div>

                  {/* تعداد اعضای صندوق */}
                  <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-md bg-[#846DD8]/10 flex items-center justify-center">
                        <IconUsers className="w-4 h-4 text-[#846DD8]" />
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-500 leading-tight">تعداد اعضای صندوق</p>
                    <p className="text-lg font-bold text-[#A07800] leading-tight">۲۳</p>
                  </div>

                  {/* موجودی صندوق */}
                  <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-md bg-[#846DD8]/10 flex items-center justify-center">
                        <IconWallet className="w-4 h-4 text-[#846DD8]" />
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-500 leading-tight">موجودی صندوق</p>
                    <p className="text-lg font-bold text-[#A07800] leading-tight">ریال ۵۰۰,۰۰۰,۰۰۰</p>
                  </div>

                  {/* ROW 2: 3 cards */}
                  {/* آخرین واریزی */}
                  <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-md bg-[#846DD8]/10 flex items-center justify-center">
                        <IconWallet className="w-4 h-4 text-[#846DD8]" />
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-500 leading-tight">آخرین واریزی</p>
                    <p className="text-lg font-bold text-[#A07800] leading-tight">ریال ۲۰,۰۰۰,۰۰۰</p>
                  </div>

                  {/* معوقات */}
                  <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-md bg-[#846DD8]/10 flex items-center justify-center">
                        <IconClock className="w-4 h-4 text-[#846DD8]" />
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-500 leading-tight">معوقات</p>
                    <p className="text-lg font-bold text-[#A07800] leading-tight">ریال ۱۰۰,۰۰۰,۰۰۰</p>
                  </div>

                  {/* جدیدترین تیکت ها */}
                  <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-md bg-[#846DD8]/10 flex items-center justify-center">
                        <IconTicket className="w-4 h-4 text-[#846DD8]" />
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-500 leading-tight">جدیدترین تیکت ها</p>
                    <p className="text-lg font-bold text-[#A07800] leading-tight">۲</p>
                  </div>
                </div>

                {/* RIGHT SIDE: Donut Chart */}
                <div className="col-span-1 bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-[#4C2FB6]">وضعیت کلی وام ها</p>
                  </div>

                  {/* Chart and Legend side by side */}
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

                    <div className="space-y-2 text-[10px] text-gray-600 flex-1">
                      {data?.loansStatus?.labels?.map((lbl: string, idx: number) => {
                        const colors = ["#FFC857", "#846DD8", "#CCCCCC"];
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

                  {/* Filter buttons */}
                  <div className="flex items-center justify-center gap-1.5 mt-auto pt-3 border-t border-gray-100">
                    <button className="px-2 py-1 text-[10px] rounded-md text-gray-600 hover:bg-gray-50 transition">
                      ۲۴ ساعت
                    </button>
                    <button className="px-2 py-1 text-[10px] rounded-md text-gray-600 hover:bg-gray-50 transition">
                      ۷ روز
                    </button>
                    <button className="px-2 py-1 text-[10px] rounded-md text-gray-600 hover:bg-gray-50 transition">
                      ۳۰ روز
                    </button>
                    <button className="px-2 py-1 text-[10px] rounded-md bg-white text-gray-900 font-medium border border-gray-200 shadow-sm">
                      ۱۲ ماه
                    </button>
                  </div>
                </div>
              </section>

              {/* MIDDLE STRIP: LINE + BAR */}
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* LINE CHART */}
                <div className="bg-white p-5 rounded-[18px] border border-gray-200 shadow-sm h-[420px] flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-base font-semibold text-[#4C2FB6]">موجودی صندوق</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="px-2 py-1 bg-gray-100 rounded-md">ماه ۱۲</span>
                      <span className="px-2 py-1 bg-gray-100 rounded-md">روز ۳۰</span>
                      <span className="px-2 py-1 bg-gray-100 rounded-md">ساعت ۱۲</span>
                    </div>
                  </div>
                  <div className="flex-1 flex items-end">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={lineChartData}>
                        <CartesianGrid stroke="#F0F0F0" vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#9E9E9E" }} />
                        <YAxis tick={{ fontSize: 10, fill: "#9E9E9E" }} axisLine={false} />
                        <RTooltip />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#7C5CFF"
                          strokeWidth={3}
                          dot={false}
                          activeDot={{ r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* AREA CHART */}
                <div className="bg-white p-5 rounded-[18px] border border-gray-200 shadow-sm h-[420px] flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-base font-semibold text-[#4C2FB6]">آمار کلی صندوق</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="px-2 py-1 bg-gray-100 rounded-md">ماه ۱۲</span>
                      <span className="px-2 py-1 bg-gray-100 rounded-md">روز ۷</span>
                      <span className="px-2 py-1 bg-gray-100 rounded-md">ساعت ۱۲</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 text-center mb-4 text-sm text-gray-700">
                    <div>
                      <p className="text-xs text-gray-500">اعضای صندوق</p>
                      <p className="font-semibold">۳۰</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">درخواست ها</p>
                      <p className="font-semibold">۱۰۰</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">مبلغ سپرده</p>
                      <p className="font-semibold">ریال ۲۰,۰۰۰,۰۰۰</p>
                    </div>
                  </div>
                  <div className="flex-1 flex items-end">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={areaChartData}>
                        <defs>
                          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#E6DEFF" stopOpacity={1} />
                            <stop offset="100%" stopColor="#3A217A" stopOpacity={1} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" hide />
                        <YAxis hide />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="#4C2FB6"
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
        </main>

        {/* SIDEBAR (راست) */}
        <div className="fixed right-0 top-0 h-screen justify-between bg-[#1E144E] text-white w-[280px] px-3 py-6 z-50 flex flex-col">
          <div className="flex flex-col gap-6">
            <SidebarHeader title="صندوق قرض الحسنه کریمانه" />
            <div className="flex flex-col gap-1">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  className="px-4 py-3 rounded-xl hover:bg-white/10 transition text-sm"
                />
              ))}
            </div>
          </div>
          <SidebarUser
            name={user?.name || "علی رضایی"}
            role={user?.role || "مدیر صندوق"}
            avatar={
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold">
                {user?.name?.charAt(0) || "ع"}
              </div>
            }
          />
        </div>
      </div>
    </Sidebar>
  );
}
