"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { isAdmin } from "@/lib/schemas";

export default function DashboardRedirect() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    router.push(isAdmin(user.role) ? "/admin" : "/user");
  }, [user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-600">در حال انتقال...</p>
      </div>
    </div>
  );
}
