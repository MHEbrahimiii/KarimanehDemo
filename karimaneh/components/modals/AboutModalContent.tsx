'use client';
import Image from 'next/image';
import { images } from '@/public/images/images';

export default function AboutModalContent() {
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

     
      <h2 className="text-2xl font-bold text-primary-80 mb-6">
        درباره صندوق
      </h2>

      <div className="text-right text-gray-700 leading-relaxed space-y-4">
        <p>
          صندوق قرض‌الحسنه کریمانه یک نهاد مالی غیرانتفاعی است که با هدف
          کمک به اعضای خانواده و دوستان در زمینه پس‌انداز و دریافت وام
          تأسیس شده است.
        </p>
        <p>
          این صندوق با رعایت اصول شفافیت مالی و تصمیم‌گیری جمعی، سعی در
          ایجاد بستری امن و قابل اعتماد برای مدیریت مالی اعضا دارد.
        </p>
        <p>
          عضویت در این صندوق تنها برای اعضای خانواده یا افرادی که با معرفی
          یکی از اعضای صندوق تأیید می‌شوند، امکان‌پذیر است.
        </p>
      </div>
    </div>
  );
}

