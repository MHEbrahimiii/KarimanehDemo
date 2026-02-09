"use client";
import React, { useState, useMemo } from "react";
import Modal from "@/components/Modal";
import DashboardBreadcrumb from "@/components/Breadcrumbs";
import { toPersianDigits } from "@/lib/formatters";
import { images } from "@/public/images/images";
import { tableData, Arrear } from "@/mock/tables"; 
import { IconSearch } from "@tabler/icons-react";
// import tables from "@/mock/tables"
import { formatNumber } from "@/lib/formatters";
// Using shared Modal component to render the send-message modal (registered as 'arrearsMSG')

const Icons = {
  Search: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Info: () => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>,
  ChevronRight: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>,
  ChevronLeft: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>,
};

export default function ArrearsPage() {
  const [arrearsList] = useState<Arrear[]>(tableData.arrears);
  const [activeModal, setActiveModal] = useState<'viewMember' | null>(null);
  const [noteModal, setNoteModal] = useState<Arrear | null>(null);
  const [selectedArrear, setSelectedArrear] = useState<Arrear | null>(null);
  const [currentTab, setCurrentTab] = useState<'all' | 'loan' | 'subscription'>('all');
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const openModal = (arrear: Arrear) => {
    setSelectedArrear(arrear);
    setActiveModal('viewMember');
  };

  const openNoteModal = (arrear: Arrear) => {
    setNoteModal(arrear);
  };

  const closeNoteModal = () => {
    setNoteModal(null);
  };


  const filteredArrears = useMemo(() => {
    return arrearsList.filter((item) => {
      const matchesSearch = item.fullName.includes(searchTerm) || item.nationalCode.includes(searchTerm);
      
      let matchesTab = true;
      if (currentTab === 'loan') matchesTab = item.installmentCount > 0;
      if (currentTab === 'subscription') matchesTab = item.subscriptionCount > 0;

      return matchesSearch && matchesTab;
    });
  }, [arrearsList, searchTerm, currentTab]);

  // منطق صفحه‌بندی
  const totalItems = filteredArrears.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const paginatedData = filteredArrears.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="p-6 bg-[#f8f9fa] min-h-screen text-right font-iranyekan" dir="rtl">
      <DashboardBreadcrumb current="معوقات" />
      <div className="bg-white rounded-xl shadow-sm p-6">
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
        <div className="flex mb-6 border-b border-gray-100">
          <button
            className={`px-6 py-3 text-sm flex items-center gap-2 transition-all ${currentTab === 'all' ? 'border-b-2 border-blue-600 text-blue-600 font-bold' : 'text-gray-500'}`}
            onClick={() => { setCurrentTab('all'); setCurrentPage(1); }}
          >
            <img src={images.Timer} alt="" className="w-4 h-4" /> همه معوقات
          </button>
          <button
            className={`px-6 py-3 text-sm flex items-center gap-2 transition-all ${currentTab === 'loan' ? 'border-b-2 border-blue-600 text-blue-600 font-bold' : 'text-gray-500'}`}
            onClick={() => { setCurrentTab('loan'); setCurrentPage(1); }}
          >
            <img src={images.Timer2} alt="" className="w-4 h-4" /> اقساط معوق
          </button>
          <button
            className={`px-6 py-3 text-sm flex items-center gap-2 transition-all ${currentTab === 'subscription' ? 'border-b-2 border-blue-600 text-blue-600 font-bold' : 'text-gray-500'}`}
            onClick={() => { setCurrentTab('subscription'); setCurrentPage(1); }}
          >
            <img src={images.calender } alt="" className="w-4 h-4" /> حق اشتراک‌های معوق
          </button>
        </div>
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full text-sm text-right">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 w-12 text-center text-gray-500 font-bold">#</th>
                <th className="p-4 text-gray-500 font-bold">نام و نام خانوادگی</th>
                <th className="p-4 text-gray-500 font-bold">کد ملی</th>
                <th className="p-4 text-gray-500 font-bold">مبلغ بدهی</th>
                <th className="p-4 text-gray-500 font-bold">نوع بدهی</th>
                {currentTab === 'loan' && <th className="p-4 text-gray-500 font-bold text-center">تاریخ سر رسید</th>}
                <th className="p-4 text-gray-500 font-bold text-center">تعداد اقساط معوق</th>
                <th className="p-4 text-gray-500 font-bold text-center">عملیات</th>
              </tr> 
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors border-b border-gray-50">
                  <td className="p-4 text-gray-400 text-center font-bold">
                    {toPersianDigits((currentPage - 1) * itemsPerPage + index + 1)}
                  </td>
                  <td className="p-4 font-medium text-gray-800">{item.fullName}</td>
                  <td className="p-4 text-gray-600">{toPersianDigits(item.nationalCode)}</td>
                  <td className="p-4 font-bold text-red-600">
                    {toPersianDigits(formatNumber(item.debtAmount))}
                  </td>
                  <td className="p-4 text-gray-600 text-xs">
                    {item.installmentCount > 0 && "قسط وام "}
                    {item.subscriptionCount > 0 && item.installmentCount > 0 && " و "}
                    {item.subscriptionCount > 0 && "حق اشتراک"}
                  </td>
                  {currentTab === 'loan' && (
                    <td className="p-4 text-center text-gray-600">
                      {toPersianDigits(item.dueDate)}
                    </td>
                  )}
                  <td className="p-4 text-center font-bold text-gray-700">
                    {toPersianDigits(item.installmentCount)}
                  </td>
                  <td className="p-4 text-center max-w-xs flex items-center justify-center gap-4">
                    <button 
                      onClick={() => openModal(item)} 
                      className="hover:scale-110 transition-transform inline-block"
                      title="مشاهده جزئیات"
                    >
                     <img src={images.info2} alt="جزئیات" className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => openNoteModal(item)} 
                      className="hover:scale-110 transition-transform inline-block"
                      title="ارسال پیام"
                    >
                     <img src={images.Note} alt="ارسال پیام" className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 mt-8 pt-4">
          <div className="text-right">
            <span className="text-[12px] text-gray-500 font-bold">مبالغ به ریال است</span>
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
                    currentPage === page ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-gray-100 text-gray-500'
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

          <div className="text-left text-xs text-gray-500 font-medium">
            نمایش {toPersianDigits(startItem)} تا {toPersianDigits(endItem)} از {toPersianDigits(totalItems)} مورد
          </div>
        </div>
      </div>

      <Modal 
        isOpen={activeModal !== null} 
        onClose={() => setActiveModal(null)} 
        modalId="viewMember" 
        data={selectedArrear} 
      />

      <Modal
        isOpen={noteModal !== null}
        onClose={closeNoteModal}
        modalId="arrearsMSG"
        data={noteModal}
        onAction={() => {
          console.log('Message sent to:', noteModal?.fullName);
        }}
      />
    </div>
  );
}