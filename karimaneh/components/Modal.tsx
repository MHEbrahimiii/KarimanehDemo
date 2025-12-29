'use client';
import MemberInfoContent from '@/components/modals/infoModalContent';
import AddEditMemberContent from '@/components/modals/memberModalContent';
import DeactivateMemberContent from '@/components/modals/deactiveModalContent';
import AccountsModalContent from '@/components/modals/AccountsModalContent';
import AboutModalContent from '@/components/modals/AboutModalContent';
import RulesModalContent from '@/components/modals/RulesModalContent';
import LoanDetailsModalContent from '@/components/modals/LoanDetailsModalContent';
import { ComponentType } from 'react';

interface ModalProps {
  onAction?: (data: any) => void;
  isOpen: boolean;
  onClose: () => void;
  modalId: string;
  data?: any;
}

const modalComponents: Record<string, ComponentType<any>> = {
  viewMember: MemberInfoContent,
  memberForm: AddEditMemberContent,
  deactivate: DeactivateMemberContent,
  accounts: AccountsModalContent,
  about: AboutModalContent,
  rules: RulesModalContent,
  loanDetails: LoanDetailsModalContent,
};

const STATELESS_MODALS = new Set(['accounts', 'about', 'rules']);

const MODAL_MAX_WIDTH: Record<string, string> = {
  memberForm: 'max-w-[900px]',
  loanDetails: 'max-w-[900px]',
  default: 'max-w-[450px]',
};

export default function Modal({ isOpen, onClose, modalId, data, onAction }: ModalProps) {
  if (!isOpen) return null;

  const ContentComponent = modalComponents[modalId];
  if (!ContentComponent) return null;

  const isStateless = STATELESS_MODALS.has(modalId);
  const maxWidth = MODAL_MAX_WIDTH[modalId] || MODAL_MAX_WIDTH.default;

  return (
    <div 
      className="fixed inset-0 bg-black/55 backdrop-blur-md flex items-center justify-center p-4 z-[1500]" 
      onClick={onClose}
    >
      <div
        className={`bg-card text-foreground border border-border rounded-[14px] ${maxWidth} w-full shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-8 relative animate-[fadeIn_0.25s_ease] max-h-[80vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-transparent border-none text-muted-foreground text-2xl cursor-pointer transition-colors duration-200 hover:text-foreground"
          aria-label="بستن"
        >
          ×
        </button>

        {isStateless ? (
          <ContentComponent />
        ) : modalId === 'loanDetails' ? (
          <ContentComponent 
            data={data} 
            onClose={onClose} 
            onNext={() => onAction?.({ type: 'next', data })}
            onReject={() => onAction?.({ type: 'reject', data })}
          />
        ) : (
          <ContentComponent 
            data={data} 
            onClose={onClose} 
            onConfirm={() => onAction?.(data)}
            onSubmit={onAction} 
          />
        )}
      </div>
    </div>
  );
}
