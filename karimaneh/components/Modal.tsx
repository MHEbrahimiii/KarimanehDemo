'use client';
import MemberInfoContent from '@/components/modals/infoModalContent';
import AddEditMemberContent from '@/components/modals/memberModalContent';
import DeactivateMemberContent from '@/components/modals/deactiveModalContent';
import AccountsModalContent from '@/components/modals/AccountsModalContent';
import AboutModalContent from '@/components/modals/AboutModalContent';
import RulesModalContent from '@/components/modals/RulesModalContent';
import LoanDetailsModalContent from '@/components/modals/LoanDetailsModalContent';
import ArreaersModalContent from '@/components/modals/ArreaersModalContent';
import ArreaersMgModalContent from '@/components/modals/ArreaersMgModalContent';
import { ComponentType } from 'react';

type ModalPayload = unknown;

type ModalContentProps = {
  data?: ModalPayload;
  onClose?: () => void;
  onConfirm?: () => void;
  onSubmit?: (data: ModalPayload) => void;
  onNext?: () => void;
  onReject?: () => void;
};

interface ModalProps {
  onAction?: (data: ModalPayload) => void;
  isOpen: boolean;
  onClose: () => void;
  modalId: string;
  data?: ModalPayload;
}

const modalComponents = {
  viewMember: MemberInfoContent,
  memberForm: AddEditMemberContent,
  deactivate: DeactivateMemberContent,
  accounts: AccountsModalContent,
  about: AboutModalContent,
  rules: RulesModalContent,
  loanDetails: LoanDetailsModalContent,
  arrearsInfo : ArreaersModalContent,
  arrearsMSG: ArreaersMgModalContent,
} as const;

const STATELESS_MODALS = new Set(['accounts', 'about', 'rules']);

const CUSTOM_LAYOUT_MODALS = new Set(['viewMember']);

const MODAL_MAX_WIDTH: Record<string, string> = {
  memberForm: 'max-w-[900px]',
  loanDetails: 'max-w-[900px]',
  arrearsMSG: 'max-w-[600px]',
  default: 'max-w-[450px]',
};

export default function Modal({ isOpen, onClose, modalId, data, onAction }: ModalProps) {
  if (!isOpen) return null;

  const ContentComponent = modalComponents[modalId as keyof typeof modalComponents] as ComponentType<ModalContentProps> | undefined;
  if (!ContentComponent) return null;
  const isStateless = STATELESS_MODALS.has(modalId);
  const isCustomLayout = CUSTOM_LAYOUT_MODALS.has(modalId);
  const maxWidth = MODAL_MAX_WIDTH[modalId] || MODAL_MAX_WIDTH.default;

  return (
    <div 
      className="fixed inset-0 bg-black/55 backdrop-blur-md flex items-center justify-center p-4 z-[1500]" 
      onClick={onClose}
    >
      <div
        className={`
          relative w-full h-full flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.45)] animate-[fadeIn_0.25s_ease] max-h-[85vh]
          ${maxWidth}
          ${isCustomLayout ? 'p-0 bg-transparent border-none rounded-none' : 'bg-card text-foreground border border-border rounded-[14px] overflow-hidden'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {!isCustomLayout && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-transparent border-none text-muted-foreground text-2xl cursor-pointer transition-colors duration-200 hover:text-foreground z-10"
            aria-label="بستن"
          >
            ×
          </button>
        )}

        <div className={isCustomLayout ? "" : "p-8 flex-1 overflow-y-auto"}>
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
    </div>
  );
}
