"use client";
import { toPersianDigits } from "@/utils/persianNumbers";
import DashboardBreadcrumb from "@/components/Breadcrumbs";
import { IconChevronRight, IconChevronLeft, IconPlus, IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import Image from "next/image";
import { images } from '@/public/images/images';
import Modal from "@/components/Modal"; 

interface Member {
  id: number;
  fullName: string;
  nationalCode: string;
  fatherName?: string;
  receivedLoans?: string;
  phonenumber: string;
  status: 'active' | 'inactive';
}

const COLUMNS = [
  { header: "نام و نام خانوادگی", accessor: "fullName" },
  { header: "کد ملی", accessor: "nationalCode" },
  { header: "نام پدر", accessor: "fatherName" },
  { header: "وام‌های دریافت شده", accessor: "receivedLoans" },
  { header: "شماره تلفن", accessor: "phonenumber" },
  { header: "عملیات", accessor: "actions" },
] as const;

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([
    { id: 1, fullName: "رضا زاهدی", nationalCode: "۰۰۱۱۹۱۵۷۵۷", fatherName: "علی", receivedLoans: "۷,۲۰۰,۰۰۰", phonenumber: "۰۹۱۲۳۴۵۶۷۸۹", status: "active" },
    { id: 2, fullName: "ایمان عباسی", nationalCode: "۰۰۱۱۹۱۵۷۵۷", fatherName: "رضا", receivedLoans: "۵,۱۰۰,۰۰۰", phonenumber: "۰۹۱۷۸۸۸۶۷۸۹", status: "active" },
    { id: 3, fullName: "کامران ساده", nationalCode: "۰۰۱۱۹۱۵۷۵۷", fatherName: "حسن", receivedLoans: "۵,۶۰۰,۰۰۰", phonenumber: "۰۹۱۴۵۵۵۵۷۸۹", status: "inactive" },
    { id: 4, fullName: "سینا زالی‌پور", nationalCode: "۰۰۱۱۹۱۵۷۵۷", fatherName: "اسماعیل", receivedLoans: "۷,۹۰۰,۰۰۰", phonenumber: "۰۹۱۲۳۵۵۴۸۴۷", status: "active" },
    { id: 5, fullName: "علی اکبری", nationalCode: "۰۰۱۱۹۱۵۷۵۷", fatherName: "ایلیا", receivedLoans: "۲,۲۰۰,۰۰۰", phonenumber: "۰۹۱۲۳۴۵۵۷۸۹", status: "active" },
    { id: 6, fullName: "راشا نامدار", nationalCode: "۰۰۱۱۹۱۵۷۵۷", fatherName: "یاور", receivedLoans: "۳,۲۰۰,۰۰۰", phonenumber: "۰۹۱۲۳۶۵۳۴۸۹", status: "inactive" },
  ]);

  const [activeModal, setActiveModal] = useState<'viewMember' | 'memberForm' | 'deactivate' | null>(null);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [currentTab, setCurrentTab] = useState<'all' | 'active'>('all');
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const openModal = (type: any, member: Member | null = null) => {
    setSelectedMember(member);
    setActiveModal(type);
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

  const filteredMembers = members.filter((member) => {
    const matchesSearch = member.fullName.includes(searchTerm) || member.nationalCode.includes(searchTerm);
    const matchesTab = currentTab === 'active' ? member.status === 'active' : true;
    return matchesSearch && matchesTab;
  });

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const paginatedMembers = filteredMembers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
            className="flex items-center justify-center gap-2 bg-primary-110 text-white px-4 py-2 rounded-lg text-sm shadow-md hover:bg-primary-100 transition-colors"
          >
            <IconPlus size={20} /> افزودن عضو جدید
          </button>
        </div>
        <div className="flex border-b border-border mb-6">
          {['all', 'active'].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-3 text-sm transition-all ${currentTab === tab ? 'border-b-2 border-primary-80 text-primary-80 font-bold' : 'text-muted-foreground'}`}
              onClick={() => { setCurrentTab(tab as any); setCurrentPage(1); }}
            >
              {tab === 'all' ? 'همه اعضا' : 'اعضای فعال'}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm text-right">
            <thead>
              <tr className="bg-muted border-b border-border">
                <th className="p-4 w-12 text-center text-muted-foreground">#</th>
                <th className="p-4 w-12 text-center"><input type="checkbox" className="rounded border-input" /></th>
                {COLUMNS.map((col) => <th key={col.header} className="p-4 text-muted-foreground font-bold">{col.header}</th>)}
              </tr>
            </thead>
            <tbody>
              {paginatedMembers.map((member, index) => (
                <tr key={member.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="p-4 text-muted-foreground text-center">{toPersianDigits(String(index + 1))}</td>
                  <td className="p-4 text-center"><input type="checkbox" className="rounded border-input" /></td>
                  
                  {COLUMNS.map((col) => (
                    <td key={col.accessor} className="p-4">
                      {col.accessor === 'actions' ? (
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
                      ) : (
                        <span className="font-medium text-foreground">
                          {col.accessor === 'receivedLoans' ? toPersianDigits(member[col.accessor] || "۰") + " ریال" : member[col.accessor as keyof Member]}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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