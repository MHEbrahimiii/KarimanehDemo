import React from 'react'
import DashboardBreadcrumb from "@/components/Breadcrumbs";
function page() {
  return (
    <div className="p-6">
        <DashboardBreadcrumb current='وام‌های من'/>
        <div className="mt-6">
          <h1 className="text-2xl font-bold mb-4">وام‌های من</h1>
          <p className="text-gray-600">لیست وام‌های شما در اینجا نمایش داده می‌شود.</p>
        </div>
    </div>
  )
}

export default page
