'use client';

import { useState } from 'react';
import Image from 'next/image';
import { images } from '@/public/images/images';
import { toPersianDigits, toEnglishDigits } from '@/lib/formatters';

interface AccountItem {
  label: string;
  value: string;
  type: 'account' | 'card' | 'iban';
}

interface AccountsModalContentProps {
  data?: {
    accountNumber?: string;
    cardNumber?: string;
    iban?: string;
    bankName?: string;
  };
}

const defaultAccountData: AccountItem[] = [
  {
    label: 'شماره حساب',
    value: '0302-500302-213-2305',
    type: 'account',
  },
  {
    label: 'شماره کارت',
    value: '6219-8619-0456-6769',
    type: 'card',
  },
  {
    label: 'شماره شبا',
    value: 'IR2102305000002503021302305',
    type: 'iban',
  },
];

export default function AccountsModalContent({ data }: AccountsModalContentProps = {}) {
  const accountData: AccountItem[] = data ? [
    {
      label: 'شماره حساب',
      value: data.accountNumber || defaultAccountData[0].value,
      type: 'account',
    },
    {
      label: 'شماره کارت',
      value: data.cardNumber || defaultAccountData[1].value,
      type: 'card',
    },
    {
      label: 'شماره شبا',
      value: data.iban || defaultAccountData[2].value,
      type: 'iban',
    },
  ] : defaultAccountData;
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const handleCopy = async (value: string, type: string) => {
    try {

      const englishValue = toEnglishDigits(value);
      await navigator.clipboard.writeText(englishValue);
      setCopiedItem(type);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="text-center">

      <div className="flex justify-center mb-6">
        <Image
          src={images.darkicon}
          alt="کریمانه"
          width={64}
          height={64}
          className="w-16 h-16"
        />
      </div>


      <h2 className="text-2xl font-bold text-primary-80 mb-2">
        شماره حساب های صندوق
      </h2>

      <p className="text-lg text-muted-foreground mb-8">{data?.bankName || 'بانک سامان'}</p>
      <div className="space-y-4">
        {accountData.map((item) => (
          <div
            key={item.type}
            className="flex items-center justify-between p-4 rounded-lg hover:bg-muted transition-colors cursor-pointer group"
            onClick={() => handleCopy(item.value, item.type)}
          >
 
            <div className="text-right min-w-[120px]">
              <p className="text-base font-medium text-muted-foreground">{item.label}</p>
            </div>

            <div className="flex-1 text-center">
              <p className="text-lg font-semibold text-foreground font-mono">
                {toPersianDigits(item.value)}
              </p>
            </div>
            <div className="w-8 h-8 flex items-center justify-center text-muted-foreground group-hover:text-primary-60 transition-colors">
              <Image
                src={images.copy}
                alt="کپی"
                width={20}
                height={20}
                className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        ))}
      </div>

      {copiedItem && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[1600] animate-[fadeIn_0.25s_ease]">
          <div className="bg-foreground text-background px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <span className="text-sm font-medium">
              {copiedItem === 'account' && 'شماره حساب کپی شد!'}
              {copiedItem === 'card' && 'شماره کارت کپی شد!'}
              {copiedItem === 'iban' && 'شماره شبا کپی شد!'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

