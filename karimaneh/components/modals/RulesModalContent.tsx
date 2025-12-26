'use client';

import Image from 'next/image';
import { images } from '@/utils/images';
import { toPersianDigits } from '@/utils/persianNumbers';

export default function RulesModalContent() {
  const rules = [
    {
      title: 'شرایط عضویت',
      items: [
        'عضویت در صندوق تنها برای اعضای خانواده یا افرادی که با معرفی یکی از اعضای صندوق تأیید می‌شوند، امکان‌پذیر است.',
        'هر عضو باید اطلاعات هویتی و تماس خود را به درستی ارائه دهد.',
        'عضویت در صندوق مستلزم پرداخت حق عضویت اولیه است.',
      ],
    },
    {
      title: 'شرایط پرداخت حق عضویت',
      items: [
        'هر عضو موظف است حق عضویت ماهانه خود را به موقع پرداخت کند.',
        'مبلغ حق عضویت برای همه اعضا یکسان است و در جلسات عمومی تعیین می‌شود.',
        'عدم پرداخت حق عضویت به مدت سه ماه متوالی منجر به تعلیق عضویت می‌شود.',
      ],
    },
    {
      title: 'شرایط دریافت وام',
      items: [
        'هر عضو پس از پرداخت حداقل ۶ ماه حق عضویت، می‌تواند درخواست وام دهد.',
        'مبلغ وام بر اساس سابقه پرداخت حق عضویت و نیاز عضو تعیین می‌شود.',
        'درخواست وام باید در جلسه عمومی صندوق مطرح و به رأی گذاشته شود.',
        'وام با ضمانت حداقل دو عضو دیگر صندوق پرداخت می‌شود.',
      ],
    },
    {
      title: 'بازپرداخت وام',
      items: [
        'بازپرداخت وام باید طبق برنامه زمانی تعیین شده انجام شود.',
        'در صورت تأخیر در بازپرداخت، عضو موظف به پرداخت جریمه تأخیر است.',
        'عدم بازپرداخت وام به مدت مشخص منجر به اقدامات قانونی می‌شود.',
      ],
    },
    {
      title: 'شفافیت مالی',
      items: [
        'تمام تراکنش‌های مالی صندوق باید به صورت شفاف ثبت و گزارش شود.',
        'گزارش مالی ماهانه باید در اختیار همه اعضا قرار گیرد.',
        'حساب‌های صندوق باید به صورت منظم مورد بررسی قرار گیرد.',
      ],
    },
    {
      title: 'تصمیم‌گیری‌ها',
      items: [
        'تصمیمات مهم صندوق در جلسات عمومی با رأی اکثریت اعضا اتخاذ می‌شود.',
        'جلسات عمومی باید حداقل هر سه ماه یک بار برگزار شود.',
        'همه اعضا حق شرکت در جلسات و اظهار نظر دارند.',
      ],
    },
  ];

  return (
    <div className="text-center">
      <div className="flex justify-center mb-4">
        <Image
          src={images.darkicon}
          alt="کریمانه"
          width={64}
          height={64}
          className="w-16 h-16"
        />
      </div>


      <h2 className="text-xl font-bold text-primary-80 mb-2">
        صندوق قرض الحسنه کریمانه
      </h2>
      <h3 className="text-2xl font-bold text-primary-80 mb-8">
        قوانین و مقررات صندوق قرض الحسنه کریمانه
      </h3>


      <div className="text-right space-y-4">
        {rules.map((rule, index) => (
          <div key={index} className="space-y-2">
            <h4 className="text-lg font-bold text-primary-80">
              {toPersianDigits(index + 1)}. {rule.title}
            </h4>
            <ul className="space-y-2 text-neutral-70 leading-relaxed pr-6">
              {rule.items.map((item, itemIndex) => (
                <li key={itemIndex} className="text-right">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

