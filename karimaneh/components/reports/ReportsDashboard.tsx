"use client";

import React from 'react';
import { toPersianDigits, formatNumber } from '@/lib/formatters';
import { IconChevronDown, IconArrowUp, IconArrowDown } from '@tabler/icons-react';
import TotalPaidLoansCard from './TotalPaidLoansCard';
import TotalDepositsCard from './TotalDepositsCard';
import LoanStatusChartCard from './LoanStatusChartCard';
import PaymentStatusChartCard from './PaymentStatusChartCard';

export default function ReportsDashboard() {
  return (
    <div className="mt-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TotalPaidLoansCard />
        <TotalDepositsCard />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LoanStatusChartCard />
        <PaymentStatusChartCard />
      </div>
    </div>
  );
}

