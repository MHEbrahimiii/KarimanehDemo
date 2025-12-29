"use client";

import { useEffect, useMemo, useState } from "react";
import { getDashboardMock } from "@/services/dashboard";
import { useAuth } from "@/context/auth-context";
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
} from "recharts";
import { IconCreditCard, IconUsers, IconWallet, IconClock, IconTicket, IconBell } from "@tabler/icons-react";
import { toPersianDigits } from "@/lib/formatters";
import GlobalAreaChart from "@/components/dashboard/global-area-chart";
import BalanceLineChart from "@/components/dashboard/balance-line-chart";

const getPersianDate = () => {
  const now = new Date();
  const weekdays = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
  const dayOfWeek = weekdays[now.getDay()];
  

  const day = now.getDate();
  const monthNames = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

  const month = monthNames[now.getMonth()];
  
  return `${dayOfWeek} - ${toPersianDigits(day)} ${month}`;
};

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
      color: ["var(--primary-70)", "var(--secondary-60)", "var(--gray-60)"][idx],
    }));
  }, [data]);



  return (
    <div className="p-8 space-y-10">
      <header className="flex items-center gap-4 bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold">
            {(user?.name?.charAt(0) || "ک")}
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{user?.name || "کاوه رضایی"}</p>
            <p className="text-xs text-gray-500">{user?.role || "مدیر صندوق"}</p>
          </div>
        </div>
        <div className="flex-1 text-left">
          <p className="text-sm text-gray-700 font-medium">{getPersianDate()}</p>
        </div>
        <button className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
          <IconBell className="w-5 h-5" />
        </button>
      </header>

      <div className="text-right mb-6">
        <h1 className="text-3xl font-bold text-gray-900">پیشخوان</h1>
      </div>

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
                    <p className="text-lg font-bold text-secondary-100 leading-tight">
                      {data?.heroStats?.[2]?.value || "۰ نفر"}
                    </p>
                  </div>

                  <div className="bg-neutral-white p-3 rounded-lg border border-gray-30 shadow-sm flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-md bg-[#846DD8]/10 flex items-center justify-center">
                        <IconUsers className="w-4 h-4 text-[#846DD8]" />
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-500 leading-tight">تعداد اعضای صندوق</p>
                    <p className="text-lg font-bold text-[#A07800] leading-tight">
                      {data?.heroStats?.[1]?.value || "۰ نفر"}
                    </p>
                  </div>

                  <div className="bg-neutral-white p-3 rounded-lg border border-gray-30 shadow-sm flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-md bg-[#846DD8]/10 flex items-center justify-center">
                        <IconWallet className="w-4 h-4 text-[#846DD8]" />
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-500 leading-tight">موجودی صندوق</p>
                    <p className="text-lg font-bold text-[#A07800] leading-tight">
                      {data?.heroStats?.[0]?.value || "ریال ۰"}
                    </p>
                  </div>

                  <div className="bg-neutral-white p-3 rounded-lg border border-gray-30 shadow-sm flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-md bg-[#846DD8]/10 flex items-center justify-center">
                        <IconWallet className="w-4 h-4 text-[#846DD8]" />
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-500 leading-tight">آخرین واریزی</p>
                    <p className="text-lg font-bold text-[#A07800] leading-tight">
                      {data?.heroStats?.[3]?.value || "ریال ۰"}
                    </p>
                  </div>

                  <div className="bg-neutral-white p-3 rounded-lg border border-gray-30 shadow-sm flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-md bg-[#846DD8]/10 flex items-center justify-center">
                        <IconClock className="w-4 h-4 text-[#846DD8]" />
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-500 leading-tight">معوقات</p>
                    <p className="text-lg font-bold text-[#A07800] leading-tight">
                      {data?.heroStats?.[4]?.value || "ریال ۰"}
                    </p>
                  </div>

                  <div className="bg-neutral-white p-3 rounded-lg border border-gray-30 shadow-sm flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-md bg-[#846DD8]/10 flex items-center justify-center">
                        <IconTicket className="w-4 h-4 text-[#846DD8]" />
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-500 leading-tight">جدیدترین تیکت ها</p>
                    <p className="text-lg font-bold text-secondary-100 leading-tight">
                      {data?.tickets?.count || "۰"}
                    </p>
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
                        const colors = ["var(--primary-70)", "var(--secondary-60)", "var(--gray-60)"];
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
                    <button className="px-2 py-1 text-[10px] rounded-md text-gray-600 hover:bg-gray-100 transition">
                      ۲۴ ساعت
                    </button>
                    <button className="px-2 py-1 text-[10px] rounded-md text-gray-600 hover:bg-gray-100 transition">
                      ۷ روز
                    </button>
                    <button className="px-2 py-1 text-[10px] rounded-md text-gray-600 hover:bg-gray-100 transition">
                      ۳۰ روز
                    </button>
                    <button className="px-2 py-1 text-[10px] rounded-md bg-gray-200 text-gray-700 font-medium border border-gray-300 shadow-sm">
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
                      <button className="px-2 py-1 rounded-md bg-gray-200 text-gray-700 font-medium border border-gray-300 shadow-sm">
                        ۱۲ ماه
                      </button>
                      <button className="px-2 py-1 rounded-md text-gray-600 hover:bg-gray-100 transition">
                        ۳۰ روز
                      </button>
                      <button className="px-2 py-1 rounded-md text-gray-600 hover:bg-gray-100 transition">
                        ۷ روز
                      </button>
                      <button className="px-2 py-1 rounded-md text-gray-600 hover:bg-gray-100 transition">
                        ۲۴ ساعت
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 w-full min-h-0">
                    {data?.balances && (
                      <BalanceLineChart balances={data.balances} />
                    )}
                  </div>
                </div>

                <div className="bg-neutral-white p-5 rounded-[18px] border border-gray-30 shadow-sm h-[420px] flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-base font-semibold text-primary-80">وام های پرداختی</p>
                    <div className="flex items-center gap-2 text-xs text-gray-80">
                      <button className="px-2 py-1 rounded-md bg-gray-200 text-gray-700 font-medium border border-gray-300 shadow-sm">
                        ۱۲ ماه
                      </button>
                      <button className="px-2 py-1 rounded-md text-gray-600 hover:bg-gray-100 transition">
                        ۳۰ روز
                      </button>
                      <button className="px-2 py-1 rounded-md text-gray-600 hover:bg-gray-100 transition">
                        ۷ روز
                      </button>
                      <button className="px-2 py-1 rounded-md text-gray-600 hover:bg-gray-100 transition">
                        ۲۴ ساعت
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 w-full min-h-0">
                    {data?.paidLoans && (
                      <GlobalAreaChart paidLoans={data.paidLoans} />
                    )}
                  </div>
                </div>
              </section>
            </>
          )}
    </div>
  );
}
