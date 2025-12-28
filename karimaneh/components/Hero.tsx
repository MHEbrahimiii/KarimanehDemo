'use client';
import Image from 'next/image';
import { images } from '@/lib/images';
import { useState } from 'react';
import Modal from './Modal';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'شماره حساب ها', modalId: 'accounts' },
  { label: 'درباره صندوق', modalId: 'about' },
  { label: 'قوانین و مقررات', modalId: 'rules' },
] as const;

type ModalId = 'accounts' | 'about' | 'rules' | null;

export default function Hero() {
  const [activeModal, setActiveModal] = useState<ModalId>(null);

  const handleNavClick = (e: React.MouseEvent, modalId: string) => {
    e.preventDefault();
    setActiveModal(modalId as ModalId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <>
      <section className="relative w-full h-screen overflow-hidden flex flex-col">
        <nav className="relative z-20 flex flex-row items-center justify-between px-4 md:px-20 py-4 md:py-6">
          <div className="flex items-center gap-3">
            <Image
              src={images.icon}
              alt="کریمانه لوگو"
              width={50}
              height={50}
              className="w-12 h-12 md:w-16 md:h-16"
            />
            <span className="text-white text-2xl md:text-3xl font-bold">کریمانه</span>
          </div>

          <ul className="flex justify-center gap-6 md:gap-12 text-white text-[21px] md:text-[21px]">
            {NAV_LINKS.map(({ label, modalId }) => (
              <li key={modalId}>
                <button
                  onClick={(e) => handleNavClick(e, modalId)}
                  className={`relative pb-1 bg-transparent border-none transition-colors duration-200 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-white after:transition-all after:duration-200 cursor-pointer ${
                    activeModal === modalId
                      ? 'text-secondary-50 after:w-full'
                      : 'hover:text-secondary-50 after:w-0 hover:after:w-full'
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute inset-0 -z-10 max-w-[100%] h-screen md:h-[120vh] lg:h-[130vh]">
          <Image
            src={images.landing}
            alt="صندوق قرض الحسنه کریمانه"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="flex-1 flex items-center justify-start text-white px-6 md:px-20 py-20">
          <div className="text-right max-w-2xl md:max-w-3xl space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              صندوق قرض‌الحسنه کریمانه
            </h1>

            <p className="text-2xl md:text-3xl font-light text-neutral-20">
              همراه شما در مسیر همدلی
            </p>

            <div className="text-lg md:text-xl font-light text-neutral-30 space-y-6">
              <p>پس‌انداز و وام آسان</p>
              <p>برای اعضای خانواده و دوستان</p>
            </div>
<div className="w-[206px] h-[48px] bg-secondary-90 rounded-md flex items-center justify-center">
  <Link 
    href="/enter"
    className="text-[21px] flex items-center justify-center w-full h-full"
  >
    ورود به صندوق
  </Link>
</div>
          </div>
        </div>
      </section>
      <Modal isOpen={activeModal === 'accounts'} onClose={closeModal} modalId="accounts" />
      <Modal isOpen={activeModal === 'about'} onClose={closeModal} modalId="about" />
      <Modal isOpen={activeModal === 'rules'} onClose={closeModal} modalId="rules" />
    </>
  );
}
