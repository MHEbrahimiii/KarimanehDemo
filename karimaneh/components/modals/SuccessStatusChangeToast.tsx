'use client';
import React, { useEffect } from 'react';

interface SuccessStatusChangeToastProps {
  isOpen: boolean;
  memberName: string;
  newStatus: 'active' | 'inactive';
  onClose: () => void;
  onCancel?: () => void;
}

export default function SuccessStatusChangeToast({ isOpen, memberName, newStatus, onClose, onCancel }: SuccessStatusChangeToastProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  
  const statusText = newStatus === 'active' ? 'فعال' : 'غیرفعال';
  const messageText = newStatus === 'active' 
    ? `حساب کاربر "${memberName}" با موفقیت فعال شد!`
    : `حساب کاربر "${memberName}" با موفقیت غیرفعال شد!`;

  const isActive = newStatus === 'active';
  const bgColor = isActive ? 'from-green-50 to-emerald-50' : 'from-red-50 to-rose-50';
  const borderColor = isActive ? 'border-green-400' : 'border-red-400';
  const textColor = isActive ? 'text-green-600' : 'text-red-600';
  const hoverColor = isActive ? 'hover:text-green-700' : 'hover:text-red-700';
  const titleColor = isActive ? 'text-green-700' : 'text-red-700';
  const badgeBorderColor = isActive ? 'border-green-400' : 'border-red-400';
  const badgeTextColor = isActive ? 'text-green-600' : 'text-red-600';
  const iconColor = isActive ? 'text-green-500' : 'text-red-500';
  const bgCircleColor = isActive ? 'bg-green-400' : 'bg-red-400';
  const progressColor = isActive ? 'bg-green-500' : 'bg-red-500';
  const bgCircleAnimation = isActive ? 'animate-pulse' : ''
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-[vazir]">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative bg-gradient-to-br ${bgColor} rounded-2xl border-2 ${borderColor} shadow-2xl p-8 max-w-sm w-full text-center animate-in fade-in slide-in-from-bottom-4 duration-300`} dir="rtl">
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 ${textColor} ${hoverColor} text-2xl font-bold transition-colors`}
          aria-label="لغو"
        >
          ×
        </button>
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className={`absolute inset-0 ${bgCircleColor} rounded-full animate-pulse opacity-40 w-20 h-20`} />
            <svg 
              className={`w-20 h-20 ${iconColor} relative z-10`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <h3 className={`text-2xl font-bold ${titleColor} mb-2 flex items-center justify-center gap-2`}>
          <svg 
            className={`w-6 h-6 ${iconColor}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>تغییر وضعیت کاربر</span>
        </h3>
        <p className="text-gray-700 text-sm leading-6">
          {messageText}
        </p>
        <button           onClick={() => {
            onCancel?.();
            onClose();
          }}>
        <div className={`mt-6 inline-block bg-white border-2 ${badgeBorderColor} rounded-full px-4 py-2`}>
          <span className={`${badgeTextColor} font-bold text-sm`}>لغو</span>
        </div>
</button>

        <div className="mt-6 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className={`h-full ${progressColor}`} style={{ animation: 'shrink-width 5s linear forwards' }} />
        </div>
      </div>
      <style>{`
        @keyframes shrink-width {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}
