'use client';

import AccountsModalContent from '@/components/modals/AccountsModalContent';
import AboutModalContent from '@/components/modals/AboutModalContent';
import RulesModalContent from '@/components/modals/RulesModalContent';
import type { ComponentType } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalId: string;
}

const modalComponents: Record<string, ComponentType> = {
  accounts: AccountsModalContent,
  about: AboutModalContent,
  rules: RulesModalContent,
};

export default function Modal({ isOpen, onClose, modalId }: ModalProps) {
  if (!isOpen) return null;

  const ContentComponent = modalComponents[modalId];

  if (!ContentComponent) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-[rgba(10,10,25,0.55)] backdrop-blur-[10px] flex items-center justify-center p-4 z-1500"
      onClick={onClose}
    >
      <div
        className="bg-white text-gray-900 border border-white/8 rounded-[14px] max-w-[600px] w-full shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-8 relative animate-[fadeIn_0.25s_ease] max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-transparent border-none text-gray-500 text-2xl cursor-pointer transition-colors duration-200 hover:text-gray-700"
          aria-label="بستن"
        >
          ×
        </button>
        <ContentComponent />
      </div>
    </div>
  );
}

