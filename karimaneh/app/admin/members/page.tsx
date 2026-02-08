"use client";
import React, { useState, useMemo } from "react";
import Modal from "@/components/Modal";
import DashboardBreadcrumb from "@/components/Breadcrumbs";
import Switcher7 from "@/components/ui/Switcher7";
import MUIStatusChangeDialog from "@/components/modals/MUIStatusChangeDialog";
import { toPersianDigits } from "@/lib/formatters";
import { formatNumber } from "@/lib/formatters";

// --- ICONS ---
const Icons = {
  Search: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Plus: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7v14"/></svg>,
  Eye: () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>,
  ChevronRight: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>,
  ChevronLeft: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>,
  Users: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
};

interface Member {
  id: number;
  fullName: string;
  nationalCode: string;
  fatherName?: string;
  receivedLoans: string;
  status: 'active' | 'inactive';
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([
    { id: 1, fullName: "رضا زاهدی", nationalCode: "۰۰۱۱۹۱۵۷۵۷", fatherName: "علی", receivedLoans: "۷۲۰۰۰۰۰", status: "active" },
    { id: 2, fullName: "ایمان عباسی", nationalCode: "۰۰۱۱۹۱۵۷۵۷", fatherName: "رضا", receivedLoans: "۵۱۰۰۰۰۰", status: "active" },
    { id: 3, fullName: "کامران ساده", nationalCode: "۰۰۱۱۹۱۵۷۵۷", fatherName: "حسن", receivedLoans: "۵۶۰۰۰۰۰", status: "inactive" },
    { id: 4, fullName: "سینا زالی‌پور", nationalCode: "۰۰۱۱۹۱۵۷۵۷", fatherName: "اسماعیل", receivedLoans: "۷۹۰۰۰۰۰", status: "active" },
    { id: 5, fullName: "علی اکبری", nationalCode: "۰۰۱۱۹۱۵۷۵۷", fatherName: "ایلیا", receivedLoans: "۲۲۰۰۰۰۰", status: "active" },
    { id: 6, fullName: "راشا نامدار", nationalCode: "۰۰۱۱۹۱۵۷۵۷", fatherName: "یاور", receivedLoans: "۳۲۰۰۰۰۰", status: "inactive" },
    { id: 7, fullName: "محمد نبوی", nationalCode: "۰۰۱۱۹۱۵۷۵۷", fatherName: "مرتضی", receivedLoans: "۴۵۰۰۰۰۰", status: "active" },
    { id: 8, fullName: "سعید کریمی", nationalCode: "۰۰۱۱۹۱۵۷۵۷", fatherName: "جواد", receivedLoans: "۶۱۰۰۰۰۰", status: "active" },
    { id: 9, fullName: "حمید علوی", nationalCode: "۰۰۱۱۹۱۵۷۵۷", fatherName: "ناصر", receivedLoans: "۹۰۰۰۰۰۰", status: "inactive" },
    { id: 10, fullName: "پویا مهدوی", nationalCode: "۰۰۱۱۹۱۵۷۵۷", fatherName: "قاسم", receivedLoans: "۳۴۰۰۰۰۰", status: "active" },
  ]);

  const [activeModal, setActiveModal] = useState<'viewMember' | 'memberForm' | null>(null);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [currentTab, setCurrentTab] = useState<'all' | 'active'>('all');
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [lastChangedMemberId, setLastChangedMemberId] = useState<number | null>(null);
  const [previousStatus, setPreviousStatus] = useState<'active' | 'inactive' | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMemberId, setDialogMemberId] = useState<number | null>(null);

  const openModal = (type: 'viewMember' | 'memberForm', member: Member | null = null) => {
    setSelectedMember(member);
    setActiveModal(type);
  };

  const handleToggleStatus = (id: number) => {
    setDialogMemberId(id);
    setDialogOpen(true);
  };

  const handleConfirmStatusChange = () => {
    if (dialogMemberId === null) return;

    const member = members.find(m => m.id === dialogMemberId);
    if (!member) return;
    
    const newStatus = member.status === 'active' ? 'inactive' : 'active';
    
    setPreviousStatus(member.status);
    setLastChangedMemberId(dialogMemberId);
    
    setMembers(prev => prev.map(m => 
      m.id === dialogMemberId ? { ...m, status: newStatus } : m
    ));
  };

  const handleCancelStatusChange = () => {
    if (lastChangedMemberId !== null && previousStatus !== null) {
      setMembers(prev => prev.map(m => 
        m.id === lastChangedMemberId ? { ...m, status: previousStatus } : m
      ));
    }
  };

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesSearch = member.fullName.includes(searchTerm) || member.nationalCode.includes(searchTerm);
      const matchesTab = currentTab === 'active' ? member.status === 'active' : true;
      return matchesSearch && matchesTab;
    });
  }, [members, searchTerm, currentTab]);

  const totalItems = filteredMembers.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const paginatedMembers = filteredMembers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="p-6 bg-[#f8f9fa] min-h-screen text-right font-iranyekan" dir="rtl">
      <DashboardBreadcrumb current="اعضا" />

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
              <Icons.Search />
            </span>
            <input
              type="text"
              placeholder="جستجو..."
              className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-lg outline-none text-sm bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => openModal('memberForm')} 
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm shadow-md hover:bg-blue-700 transition-colors"
          >
            <Icons.Plus /> عضو جدید
          </button>
        </div>
        <div className="flex  mb-6">
          <button
            className={`px-6 py-3 text-sm flex items-center gap-2 transition-all ${currentTab === 'all' ? 'border-b-2 border-blue-600 text-blue-600 font-bold' : 'text-gray-500'}`}
            onClick={() => { setCurrentTab('all'); setCurrentPage(1); }}
          >
            <Icons.Users /> همه اعضا
          </button>
          <button
            className={`px-6 py-3 text-sm flex items-center gap-2 transition-all ${currentTab === 'active' ? 'border-b-2 border-blue-600 text-blue-600 font-bold' : 'text-gray-500'}`}
            onClick={() => { setCurrentTab('active'); setCurrentPage(1); }}
          >
            <div className={`w-2 h-2 rounded-full ${currentTab === 'active' ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            اعضای فعال
          </button>
        </div>
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full text-sm text-right">
            <thead>
              <tr className="bg-muted border-b border-border">
                <th className="p-4 w-12 text-center text-gray-500 font-bold">#</th>
                <th className="p-4 w-12 text-center"><input type="checkbox" className="rounded border-gray-300" /></th>
                <th className="p-4 text-gray-500 font-bold">نام و نام خانوادگی</th>
                <th className="p-4 text-gray-500 font-bold">کد ملی</th>
                <th className="p-4 text-gray-500 font-bold">نام پدر</th>
                <th className="p-4 text-gray-500 font-bold">موجودی</th>
                <th className="p-4 text-gray-500 font-bold text-center">وضعیت</th>
                <th className="p-4 text-gray-500 font-bold text-center">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {paginatedMembers.map((member, index) => (
                <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-gray-400 text-center font-bold">
                    {toPersianDigits((currentPage - 1) * itemsPerPage + index + 1)}
                  </td>
                  <td className="p-4 text-center"><input type="checkbox" className="rounded border-gray-300" /></td>
                  <td className="p-4 font-medium text-gray-800">{member.fullName}</td>
                  <td className="p-4 text-gray-600">{toPersianDigits(member.nationalCode)}</td>
                  <td className="p-4 text-gray-600">{member.fatherName}</td>
                  <td className="p-4 font-bold text-gray-700">{toPersianDigits(formatNumber(member.receivedLoans))}</td>
                  <td className="p-4 text-center">
                    <Switcher7 checked={member.status === 'active'} onChange={() => handleToggleStatus(member.id)} />
                  </td>
                  <td className="p-4">
                    <div className="flex gap-4 items-center justify-center">
                      {member.status   && (
                        <button onClick={() => openModal('viewMember', member)} className="hover:scale-110 transition-transform text-gray-600 hover:text-blue-600" title="بررسی جزئیات">
                          <Icons.Eye />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 mt-8 pt-4">
          
          {/* Right: Currency Text */}
          <div className="text-right">
            <span className="text-[12px] text-gray-500 font-bold  px-3 py-1.5 rounded-full">
              مبالغ به ریال است
            </span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-20 transition-colors"
            >
              <Icons.ChevronRight />
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all text-sm font-bold ${
                    currentPage === page 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'hover:bg-gray-100 text-gray-500'
                  }`}
                >
                  {toPersianDigits(page)}
                </button>
              ))}
            </div>
            
            <button 
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-20 transition-colors"
            >
              <Icons.ChevronLeft />
            </button>
          </div>

          <div className="text-left">
            <span className="text-xs text-gray-500 font-medium">
              نمایش {toPersianDigits(startItem)} تا {toPersianDigits(endItem)} از کل {toPersianDigits(totalItems)} عضو
            </span>
          </div>

        </div>
      </div>

      <Modal 
        isOpen={activeModal !== null} 
        onClose={() => setActiveModal(null)} 
        modalId={activeModal || 'memberForm'} 
        data={selectedMember} 
      />

      {dialogMemberId !== null && members.find(m => m.id === dialogMemberId) && (
        <MUIStatusChangeDialog
          open={dialogOpen}
          memberName={members.find(m => m.id === dialogMemberId)?.fullName || ''}
          currentStatus={members.find(m => m.id === dialogMemberId)?.status || 'active'}
          onConfirm={handleConfirmStatusChange}
          onClose={() => setDialogOpen(false)}
        />
      )}
    </div>
  );
}