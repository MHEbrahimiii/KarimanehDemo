'use client';
import React from 'react';

interface Switcher7Props {
  checked: boolean;
  onChange: () => void;
}

export default function Switcher7({ checked, onChange }: Switcher7Props) {
  return (
    <label className="flex cursor-pointer select-none items-center">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div className={`block h-8 w-14 rounded-full border border-[#BFCEFF] ${checked ? 'bg-primary/20' : 'bg-[#EAEEFB]'}`}></div>
        <div className={`dot bg-primary absolute ${checked ? 'left-7' : 'left-1'} top-1 h-6 w-6 rounded-full transition-all`} />
      </div>
    </label>
  );
}
