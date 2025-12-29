import DashboardBreadcrumb from '@/components/Breadcrumbs'
import React from 'react'

function page() {
  return (
    <div className="p-6">
        <DashboardBreadcrumb current='پشتیبانی'/>
        <div className="mt-6">
          <h1 className="text-2xl font-bold mb-4">پشتیبانی</h1>
          <p className="text-gray-600">می‌توانید تیکت‌های پشتیبانی خود را در اینجا مشاهده و ایجاد کنید.</p>
        </div>
    </div>
  )
}

export default page
