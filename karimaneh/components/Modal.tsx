'use client';
import MemberInfoContent from '@/components/modals/infoModalContent';
import AddEditMemberContent from '@/components/modals/memberModalContent';
import DeactivateMemberContent from '@/components/modals/deactiveModalContent';
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
};

export default function Modal({ isOpen, onClose, modalId, data, onAction }: ModalProps) {
  if (!isOpen) return null;

  const ContentComponent = modalComponents[modalId];
  if (!ContentComponent) return null;

  
  const maxWidth = modalId === 'memberForm' ? 'max-w-[900px]' : 'max-w-[450px]';

  return (
    <div 
      className="fixed inset-0 bg-[#0a0a19]/55 backdrop-blur-md flex items-center justify-center p-4 z-[1500]" 
      onClick={onClose}
    >
      <div 
        className={`bg-white text-gray-900 rounded-[16px] shadow-2xl p-8 relative w-full ${maxWidth} transition-all animate-in fade-in zoom-in duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-red-500 transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <ContentComponent 
          data={data} 
          onClose={onClose} 
          onConfirm={() => onAction && onAction(data)}
          onSubmit={onAction} 
        />
      </div>
    </div>
  );
}