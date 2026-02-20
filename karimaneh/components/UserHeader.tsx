"use client";

import { useAuth } from "@/context/auth-context";
import { toShamsiDate } from "@/lib/formatters";
import { IconBell } from "@tabler/icons-react";

export default function UserHeader() {
  const { user } = useAuth();

  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white rounded-xl border border-gray-200 p-4 mb-6">
      <div className="flex items-center gap-3 flex-1">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold flex-shrink-0">
          {(user?.name?.charAt(0) || "ک")}
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">{user?.name || "کاوه رضایی"}</p>
          <p className="text-xs text-gray-500">{user?.role || "مدیر صندوق"}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
        <div className="text-left sm:text-right">
          <p className="text-sm text-gray-700 font-medium">{toShamsiDate(new Date())}</p>
        </div>
        <button className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition flex-shrink-0">
          <IconBell className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}

