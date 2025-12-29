"use client";
import React, { useState, useMemo } from "react";
import Modal from "@/components/Modal";
import DashboardBreadcrumb from "@/components/Breadcrumbs";
import Switcher7 from "@/components/ui/Switcher7";
import { toPersianDigits } from "@/lib/formatters";
import { IconChevronRight, IconChevronLeft, IconSearch, IconPlus, IconUsers } from "@tabler/icons-react";
import { tableData, Member } from "@/mock/tables";
import Image from "next/image";
import { images } from '@/public/images/images';

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>(tableData.members);
  const [activeModal, setActiveModal] = useState<'viewMember' | 'memberForm' | 'deactivate' | null>(null);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [currentTab, setCurrentTab] = useState<'all' | 'active'>('all');
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const openModal = (type: 'viewMember' | 'memberForm' | 'deactivate', member: Member | null = null) => {
    setSelectedMember(member);
    setActiveModal(type);
  };

  const handleToggleStatus = (id: number) => {
    setMembers(prev => prev.map(m => 
      m.id === id ? { ...m, status: m.status === 'active' ? 'inactive' : 'active' } : m
    ));
  };

  const handleDeactivate = (id: number) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, status: 'inactive' } : m));
    setActiveModal(null);
    if (currentTab === 'active') {
      setCurrentPage(1);
    }
  };

  const handleAddMember = (newMember: Member) => {
    setMembers(prev => [...prev, newMember]);
    setActiveModal(null);
    setCurrentPage(1);
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
    <div className="p-6 bg-background min-h-screen text-right" dir="rtl">
      <DashboardBreadcrumb current="اعضا" />

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
          <button 
            onClick={() => openModal('memberForm')} 
            className="flex items-center justify-center gap-2 bg-primary-80 text-white px-4 py-2 rounded-lg text-sm shadow-md hover:bg-primary-90 transition-colors"
          >
            <IconPlus size={20} /> افزودن عضو جدید
          </button>
        </div>
        <div className="flex border-b border-border mb-6">
          <button
            className={`px-6 py-3 text-sm flex items-center gap-2 transition-all ${currentTab === 'all' ? 'border-b-2 border-primary-80 text-primary-80 font-bold' : 'text-muted-foreground'}`}
            onClick={() => { setCurrentTab('all'); setCurrentPage(1); }}
          >
            <IconUsers size={18} /> همه اعضا
          </button>
          <button
            className={`px-6 py-3 text-sm flex items-center gap-2 transition-all ${currentTab === 'active' ? 'border-b-2 border-primary-80 text-primary-80 font-bold' : 'text-muted-foreground'}`}
            onClick={() => { setCurrentTab('active'); setCurrentPage(1); }}
          >
            <div className={`w-2 h-2 rounded-full ${currentTab === 'active' ? 'bg-primary-80' : 'bg-gray-300'}`}></div>
            اعضای فعال
          </button>
        </div>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm text-right">
            <thead>
              <tr className="bg-muted border-b border-border">
                <th className="p-4 w-12 text-center text-muted-foreground">#</th>
                <th className="p-4 w-12 text-center"><input type="checkbox" className="rounded border-input" /></th>
                <th className="p-4 text-muted-foreground font-bold">نام و نام خانوادگی</th>
                <th className="p-4 text-muted-foreground font-bold">کد ملی</th>
                <th className="p-4 text-muted-foreground font-bold">نام پدر</th>
                <th className="p-4 text-muted-foreground font-bold">وام‌های دریافت شده</th>
                <th className="p-4 text-muted-foreground font-bold">شماره تلفن</th>
                <th className="p-4 text-muted-foreground font-bold text-center">وضعیت</th>
                <th className="p-4 text-muted-foreground font-bold text-center">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {paginatedMembers.map((member, index) => (
                <tr key={member.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="p-4 text-muted-foreground text-center">
                    {toPersianDigits(String((currentPage - 1) * itemsPerPage + index + 1))}
                  </td>
                  <td className="p-4 text-center">
                    <input type="checkbox" className="rounded border-input" />
                  </td>
                  <td className="p-4 font-medium text-foreground">{member.fullName}</td>
                  <td className="p-4 text-foreground">{toPersianDigits(member.nationalCode)}</td>
                  <td className="p-4 text-foreground">{member.fatherName || '-'}</td>
                  <td className="p-4 font-medium text-foreground">
                    {member.receivedLoans ? toPersianDigits(member.receivedLoans) + " ریال" : "۰ ریال"}
                  </td>
                  <td className="p-4 text-foreground">{toPersianDigits(member.phonenumber)}</td>
                  <td className="p-4 text-center">
                    <Switcher7 checked={member.status === 'active'} onChange={() => handleToggleStatus(member.id)} />
                  </td>
                  <td className="p-4">
                    <div className="flex gap-3 items-center justify-center">
                      <div className="relative group">
                        <button 
                          onClick={() => openModal('viewMember', member)} 
                          className="hover:scale-110 transition-transform"
                        >
                          <Image src={images.info} alt="Info" width={22} height={22} />
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

                      {member.status === 'active' ? (
                        <div className="relative group">
                          <button 
                            onClick={() => openModal('deactivate', member)} 
                            className="hover:scale-110 transition-transform"
                          >
                            <Image src={images.Not} alt="Deactivate" width={22} height={22} />
                          </button>
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50">
                            <div className="flex flex-col items-center">
                              <span className="bg-[#333] text-white text-[10px] px-3 py-1.5 rounded-md whitespace-nowrap shadow-lg">
                                غیرفعال کردن عضو
                              </span>
                              <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-[#333]"></div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="relative group">
                          <Image 
                            src={images.is} 
                            alt="Inactive" 
                            width={22} 
                            height={22}
                            className="hover:scale-110 transition-transform"
                          />
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50">
                            <div className="flex flex-col items-center">
                              <span className="bg-[#333] text-white text-[10px] px-3 py-1.5 rounded-md whitespace-nowrap shadow-lg">
                                فعال کردن عضو
                              </span>
                              <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-[#333]"></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredMembers.length > 0 && (
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

        {filteredMembers.length > 0 && (
          <div className="mt-4 text-center">
            <span className="text-xs text-muted-foreground">
              نمایش {toPersianDigits(startItem)} تا {toPersianDigits(endItem)} از کل {toPersianDigits(totalItems)} عضو
            </span>
          </div>
        )}
      </div>

      <Modal 
        isOpen={activeModal !== null} 
        onClose={() => setActiveModal(null)} 
        modalId={activeModal || ''} 
        data={selectedMember} 
        onAction={
          activeModal === 'deactivate' 
            ? (member: Member) => handleDeactivate(member?.id || 0)
            : activeModal === 'memberForm'
            ? (member: Member) => handleAddMember(member)
            : undefined
        }
      />
    </div>
  );
}
