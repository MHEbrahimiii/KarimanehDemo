"use client";

import DashboardBreadcrumb from "@/components/Breadcrumbs";
import { IconPlus, IconEdit, IconTrash, IconSearch } from "@tabler/icons-react";
import { useState } from "react";

interface Member {
  id: number;
  nationalCode: string;
  name: string;
  fatherName: string;
  phone: string;
  depositsReceived: string;
}

const membersData: Member[] = [
  {
    id: 1,
    nationalCode: "۰۰۱۱۵۷۶۷",
    name: "نیما شریفی",
    fatherName: "نام پدر",
    phone: "۰۹۱۶۴۵۳۷۶",
    depositsReceived: "۷,۶۰۰,۰۰۰",
  },
  {
    id: 2,
    nationalCode: "+۶۰۲۰۲۰۸",
    name: "آروا حسینی",
    fatherName: "نام پدر",
    phone: "۰۹۱۹۷۶۴۳۲",
    depositsReceived: "۳,۸۰۰,۰۰۰",
  },
  {
    id: 3,
    nationalCode: "۲۶۲۲۵۷۱۸۰",
    name: "کاملان محمدیان",
    fatherName: "نام پدر",
    phone: "۰۹۱۲۶۲۹۴۲۲",
    depositsReceived: "۱۱,۵۰۰,۰۰۰",
  },
  {
    id: 4,
    nationalCode: "۰۳۷۷۲۷۳۳",
    name: "فرزاده عسکریه",
    fatherName: "نام پدر",
    phone: "۰۹۱۷۳۰۲۷۲۳",
    depositsReceived: "۵,۵۰۰,۰۰۰",
  },
  {
    id: 5,
    nationalCode: "۱۳۶۵۳۸۹۱",
    name: "سیما زادایی",
    fatherName: "نام پدر",
    phone: "۰۹۱۲۳۶۳۸۲۶",
    depositsReceived: "۹,۹۰۰,۰۰۰",
  },
  {
    id: 6,
    nationalCode: "۰۱۱۳۹۲۲۲",
    name: "امیر خالدی",
    fatherName: "نام پدر",
    phone: "۰۹۱۳۹۲۲۲۶",
    depositsReceived: "۱۲,۸۰۰,۰۰۰",
  },
  {
    id: 7,
    nationalCode: "۳۱۵۷۶۰۱۲",
    name: "علی اکبر زاده",
    fatherName: "نام پدر",
    phone: "۰۹۱۵۷۶۰۱۲",
    depositsReceived: "۶,۸۰۰,۰۰۰",
  },
  {
    id: 8,
    nationalCode: "۰۱۵۷۸۶۱۳۲",
    name: "مهدی شریفی",
    fatherName: "نام پدر",
    phone: "۰۹۱۵۷۸۶۱۳۲",
    depositsReceived: "۱۳,۱۰۰,۰۰۰",
  },
  {
    id: 9,
    nationalCode: "۰۱۱۷۸۶۱۷۲۴",
    name: "رضا مرادی",
    fatherName: "نام پدر",
    phone: "۰۹۱۱۷۸۶۱۷۲۴",
    depositsReceived: "۸,۶۰۰,۰۰۰",
  },
  {
    id: 10,
    nationalCode: "۰۱۱۸۹۱۶۳۵",
    name: "سامان یوسفی",
    fatherName: "نام پدر",
    phone: "۰۹۱۱۸۹۱۶۳۵",
    depositsReceived: "۴,۸۰۰,۰۰۰",
  },
];

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const itemsPerPage = 10;

  const filteredMembers = membersData.filter(
    (member) =>
      member.name.includes(searchTerm) ||
      member.nationalCode.includes(searchTerm) ||
      member.phone.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMembers = filteredMembers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedMembers(paginatedMembers.map((m) => m.id));
    } else {
      setSelectedMembers([]);
    }
  };

  const handleSelectMember = (id: number) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <DashboardBreadcrumb current="اعضا" />
      
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        
        <div className="p-4 border-b border-gray-200 flex items-center gap-3">
          <div className="flex-1 relative">
            <div className="flex justify-end">
            <input
              type="text"
              placeholder="جستجو"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-[240px] h-[32px] px-4 py-2 border border-gray-300 rounded-lg text-right focus:outline-none focus:border-blue-500"
            />
            <div className="flex items-center justify-between mb-6 mt-6">
        <button className="bg-blue-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold">
          <IconPlus size={18} />
          افزودن عضو جدید
        </button></div>
      </div>
            <IconSearch
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
          <span className="text-sm text-gray-500">نمایش ۱ تا ۱۰</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-right">
                  <input
                    type="checkbox"
                    checked={
                      selectedMembers.length === paginatedMembers.length &&
                      paginatedMembers.length > 0
                    }
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                  #
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                  نام و نام خانوادگی
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                  کد ملی
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                  نام پدر
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                  وام‌های دریافت شده
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                  شماره تلفن
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedMembers.map((member, idx) => (
                <tr
                  key={member.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedMembers.includes(member.id)}
                      onChange={() => handleSelectMember(member.id)}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {startIndex + idx + 1}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {member.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {member.nationalCode}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {member.fatherName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {member.depositsReceived}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {member.phone}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-blue-100 rounded text-blue-600 transition">
                        <IconEdit size={18} />
                      </button>
                      <button className="p-1 hover:bg-red-100 rounded text-red-600 transition">
                        <IconTrash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <span className="text-sm text-gray-500">
            صفحه {currentPage} از {totalPages}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              بعدی
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 text-sm rounded-lg ${
                  currentPage === page
                    ? "bg-blue-900 text-white"
                    : "border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              قبلی
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
