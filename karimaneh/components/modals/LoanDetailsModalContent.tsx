'use client';
import React, { useState } from 'react';
import { Loan, tableData } from '@/mock/tables';
import { toPersianDigits } from '@/lib/formatters';

interface LoanDetailsModalContentProps {
  data?: Loan;
  onClose?: () => void;
  onNext?: () => void;
  onReject?: () => void;
}

const LoanDetailsModalContent: React.FC<LoanDetailsModalContentProps> = ({ 
  data, 
  onClose, 
  onNext, 
  onReject 
}) => {
  if (!data) return null;

  const [openPreview, setOpenPreview] = useState<number | null>(null);

  const findGuarantorDetails = (name: string) => {
    const member = tableData.members.find((m) => m.fullName === name);
    const loan = tableData.loans.find((l) => l.fullName === name);
    return {
      fullName: name,
      phonenumber: member?.phonenumber || loan?.mobileNumber || 'نامشخص',
      nationalCode: member?.nationalCode || loan?.nationalCode || '',
      memberStatus: loan?.memberStatus || 'نامشخص',
      debtAmount: loan?.debtAmount || '۰',
    };
  };

  const steps = [
    { label: 'مدیریت درخواست', active: true },
    { label: 'جزییات وام', active: false },
    { label: 'تایید پرداخت', active: false },
    { label: '', active: false },
  ];

  return (
    <div className="w-full" dir="rtl">
      <div className="mb-8">
        <div className="flex items-center gap-2">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                    step.active
                      ? 'bg-primary-80 text-white'
                      : ' text-gray-500'
                  }`}
                >
                  {step.label ? index + 1 : ''}
                </div>
                {step.label && (
                  <span className="text-xs mt-2 text-gray-600 text-center whitespace-nowrap">
                    {step.label}
                  </span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 flex-1 ${
                    step.active ? 'bg-primary-80' : 'bg-gray-200'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <h2 className="text-xl font-bold text-foreground mb-6">مدیریت درخواست وام</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className=" rounded-lg p-5 ">
          <h3 className="text-base font-semibold text-foreground mb-4">درخواست کننده</h3>
          <div className="space-y-3">
            <div>
              <span className="text-sm text-gray-600">نام و نام خانوادگی: </span>
              <span className="text-sm font-medium text-foreground">{data.fullName}</span>
            </div>
            <div>
              <span className="text-sm text-gray-600">کد ملی: </span>
              <span className="text-sm font-medium text-foreground">{data.nationalCode}</span>
            </div>
            <div>
              <span className="text-sm text-gray-600">شماره موبایل: </span>
              <span className="text-sm font-medium text-foreground">
                {data.mobileNumber || 'نامشخص'}
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-600">وضعیت عضو: </span>
              <span className={`text-sm font-medium ${
                data.memberStatus === 'بدون بدهی' 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}>
                {data.memberStatus || 'نامشخص'}
              </span>
            </div>
          </div>
        </div>

        <div className=" rounded-lg p-5  ">
          <h3 className="text-base font-semibold text-foreground mb-4">جزییات درخواست</h3>
          <div className="space-y-3">
            <div>
              <span className="text-sm text-gray-600">مبلغ درخواست: </span>
              <span className="text-sm font-medium text-red-600">
                {toPersianDigits(data.requestedAmount)} ریال
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-600">ضامنین: </span>
              <div className="mt-1 space-y-1">
                {data.guarantors && data.guarantors.length > 0 ? (
                  data.guarantors.map((guarantor, index) => {
                    const details = findGuarantorDetails(guarantor);
                    return (
                      <div key={index} className="relative">
                        <button
                          className="text-sm text-blue-600 underline hover:text-blue-800 transition-colors"
                          onMouseEnter={() => setOpenPreview(index)}
                          onMouseLeave={() => setOpenPreview((prev) => (prev === index ? null : prev))}
                          onClick={() => setOpenPreview((prev) => (prev === index ? null : index))}
                          aria-haspopup="true"
                          aria-expanded={openPreview === index}
                        >
                          {guarantor}
                        </button>

                        {openPreview === index && (
                          <div className="absolute z-30 right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 text-right" role="dialog">
                            <div className="text-xs text-gray-500 mb-1">کدملی: <span className="font-medium text-foreground">{details.nationalCode}</span></div>
                            <div className={`text-sm mb-1 ${details.memberStatus === 'بدون بدهی' ? 'text-green-600' : 'text-red-600'}`}>
                              وضعیت: <span className="font-medium">{details.memberStatus}</span>
                            </div>
                            <div className="text-sm text-foreground font-medium">مبلغ بدهی: {details.debtAmount} ریال</div>
                            <div className="absolute left-1/2 transform -translate-x-1/2 -top-2 w-3 h-3 bg-white rotate-45 shadow-sm" />
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <span className="text-sm text-gray-500">ضامنی ثبت نشده</span>
                )}
              </div>
            </div>
            <div>
              <span className="text-sm text-gray-600">تاریخ درخواست: </span>
              <span className="text-sm font-medium text-foreground">
                {toPersianDigits(data.requestDate)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 mt-6 pt-6 border-t border-gray-200">
        <button
          onClick={() => {
            onReject?.();
            onClose?.();
          }}
          className="px-6 py-2.5 border-2 border-red-500 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors"
        >
          رد
        </button>
        <button
          onClick={() => {
            onNext?.();
            onClose?.();
          }}
          className="px-6 py-2.5 bg-primary-80 text-white rounded-lg font-medium hover:bg-primary-90 transition-colors"
        >
          مرحله بعد
        </button>
      </div>
    </div>
  );
};

export default LoanDetailsModalContent;
