'use client';
import React from 'react';
import { Loan } from '@/mock/tables';
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
                  data.guarantors.map((guarantor, index) => (
                    <div key={index}>
                      <button
                        className="text-sm text-blue-600 underline hover:text-blue-800 transition-colors"
                        onClick={() => {
                          console.log('View guarantor:', guarantor);
                        }}
                      >
                        {guarantor}
                      </button>
                    </div>
                  ))
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
