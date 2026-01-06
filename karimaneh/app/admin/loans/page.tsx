"use client";
import { toPersianDigits } from "@/lib/formatters";
import DashboardBreadcrumb from "@/components/Breadcrumbs";
import { IconChevronRight, IconChevronLeft, IconSearch, IconArrowsSort, IconEye } from "@tabler/icons-react";
import { useState } from "react";
import { tableData, Loan } from "@/mock/tables";
import Modal from "@/components/Modal";

const LOAN_COLUMNS = [
  { header: "نام و نام خانوادگی", accessor: "fullName" },
  { header: "کد ملی", accessor: "nationalCode" },
  { header: "مبلغ درخواستی", accessor: "requestedAmount" },
  { header: "تاریخ درخواست", accessor: "requestDate" },
  { header: "موضوع وام", accessor: "loanSubject" },
  { header: "وضعیت", accessor: "status" },
  { header: "عملیات", accessor: "actions" },
] as const;

const getStatusColor = (status: Loan['status']) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-black-800 border-yellow-300';
    case 'paid':
      return 'bg-green-50 text-black-800  border-green-200';
    case 'rejected':
      return 'bg-red-50 text-black-800  border-red-200';
    case 'due':
      return 'bg-orange-100 text-black-800  border-orange-300';
    default:
      return 'bg-gray-100 text-black-800  border-gray-300';
  }
};

const getStatusText = (status: Loan['status']) => {
  switch (status) {
    case 'pending':
      return 'در انتظار بررسی';
    case 'paid':
      return 'پرداخت شده';
    case 'rejected':
      return 'رد شده';
    case 'due':
      return 'سررسید شده';
    default:
      return status;
  }
};

export default function LoansPage() {
  const [loans] = useState<Loan[]>(tableData.loans);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const itemsPerPage = 8;

  const filteredLoans = loans.filter((loan) => {
    const matchesSearch = 
      loan.fullName.includes(searchTerm) || 
      loan.nationalCode.includes(searchTerm) ||
      loan.loanSubject.includes(searchTerm);
    
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredLoans.length / itemsPerPage);
  const paginatedLoans = filteredLoans.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-6 bg-background min-h-screen text-right" dir="rtl">
      <DashboardBreadcrumb current="وام" />

      <div className="bg-card rounded-xl shadow-sm border border-border p-6 mt-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 right-3 flex items-center text-muted-foreground">
              <IconSearch size={18} />
            </span>
            <input
              type="text"
              placeholder="جستجو..."
              className="w-full pr-10 pl-4 py-2 border border-input rounded-lg outline-none text-sm bg-background text-foreground"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm text-right">
            <thead>
              <tr className="bg-muted border-b border-border">
                <th className="p-4 w-12 text-center text-muted-foreground">#</th>
                <th className="p-4 w-12 text-center"><input type="checkbox" className="rounded border-input" /></th>
                {LOAN_COLUMNS.map((col) => (
                  <th key={col.header} className="p-4 text-muted-foreground font-bold">
                    <div className="flex items-center gap-2">
                      {col.header}
                      {col.accessor === 'status' && (
                        <IconArrowsSort size={16} className="text-muted-foreground" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedLoans.map((loan, index) => (
                <tr 
                  key={loan.id} 
                  className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                >
                  <td className="p-4 text-muted-foreground text-center">
                    {toPersianDigits(String(index + 1))}
                  </td>
                  <td className="p-4 text-center">
                    <input type="checkbox" className="rounded border-input" />
                  </td>
                  
                  {LOAN_COLUMNS.map((col) => (
                    <td key={col.accessor} className="p-4">
                      {col.accessor === 'actions' ? (
                        <div className="flex gap-3 items-center justify-center">
                          <div className="relative group">
                            <button 
                              type="button"
                              className="p-2 hover:scale-110 transition-transform text-muted-foreground hover:text-foreground cursor-pointer rounded-md hover:bg-muted/50"
                              title="جزئیات"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setSelectedLoan(loan);
                                setActiveModal('loanDetails');
                              }}
                            >
                              <IconEye size={22} stroke={2} />
                            </button>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50">
                              <div className="flex flex-col items-center">
                                <span className="bg-[#333] text-white text-[10px] px-3 py-1.5 rounded-md whitespace-nowrap shadow-lg">
                                  جزئیات
                                </span>
                                <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-[#333]"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : col.accessor === 'status' ? (
                        <span className={`inline-flex items-center justify-center px-3 py-1 rounded-md text-xs font-medium border ${getStatusColor(loan.status)}`}>
                          {getStatusText(loan.status)}
                        </span>
                      ) : (
                        <span className="font-medium text-foreground">
                          {col.accessor === 'requestedAmount' 
                            ? toPersianDigits(loan[col.accessor]) + " ریال" 
                            : loan[col.accessor as keyof Loan]}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLoans.length > 0 && (
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors"
            >
              <IconChevronRight size={18} />
              قبلی
            </button>
            <div className="flex gap-2">
              {Array.from({ length: Math.min(10, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-4 py-2 border border-border rounded-lg ${
                      currentPage === pageNum 
                        ? 'bg-primary-80 text-white' 
                        : 'hover:bg-muted'
                    }`}
                  >
                    {toPersianDigits(String(pageNum))}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition-colors"
            >
              بعدی
              <IconChevronLeft size={18} />
            </button>
          </div>
        )}
      </div>

      <Modal 
        isOpen={activeModal === 'loanDetails'} 
        onClose={() => {
          setActiveModal(null);
          setSelectedLoan(null);
        }} 
        modalId="loanDetails" 
        data={selectedLoan}
        onAction={(actionData: any) => {
          if (actionData?.type === 'next') {
            console.log('Next step for loan:', actionData.data);
          } else if (actionData?.type === 'reject') {
            console.log('Reject loan:', actionData.data);
          }
        }}
      />
    </div>
  );
}
