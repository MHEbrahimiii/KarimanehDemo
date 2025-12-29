export function toPersianDigits(str: string | number): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
  let result = String(str);
  
  for (let i = 0; i < englishDigits.length; i++) {
    result = result.replace(new RegExp(englishDigits[i], 'g'), persianDigits[i]);
  }
  
  return result;
}

export function toEnglishDigits(str: string): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
  let result = str;
  
  for (let i = 0; i < persianDigits.length; i++) {
    result = result.replace(new RegExp(persianDigits[i], 'g'), englishDigits[i]);
  }
  
  return result;
}

export function toShamsiDate(date: Date): string {
  const gYear = date.getFullYear();
  const gMonth = date.getMonth() + 1;
  const gDay = date.getDate();
  
  const shamsiYear = gYear - 621;
  const shamsiMonth = gMonth > 3 ? gMonth - 3 : gMonth + 9;
  const shamsiDay = gDay;
  
  return `${shamsiYear}/${String(shamsiMonth).padStart(2, '0')}/${String(shamsiDay).padStart(2, '0')}`;
}

export function formatShamsiDate(dateStr: string): string {
  if (/[۰-۹]/.test(dateStr)) {
    return dateStr;
  }
  return toPersianDigits(dateStr);
}

