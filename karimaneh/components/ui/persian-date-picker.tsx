"use client";
import { useState, useRef, useEffect } from "react";
import { toPersianDigits, toEnglishDigits } from "@/lib/formatters";

interface PersianDatePickerProps {
  value?: string;
  onChange?: (date: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const PERSIAN_MONTHS = [
  "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
  "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
];

const PERSIAN_WEEKDAYS = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

function gregorianToShamsi(gYear: number, gMonth: number, gDay: number): [number, number, number] {
  const shamsiYear = gYear - 621;
  let shamsiMonth = gMonth - 3;
  if (shamsiMonth <= 0) {
    shamsiMonth += 12;
  }
  const shamsiDay = gDay;
  return [shamsiYear, shamsiMonth, shamsiDay];
}

function shamsiToGregorian(shamsiYear: number, shamsiMonth: number, shamsiDay: number): [number, number, number] {
  const gYear = shamsiYear + 621;
  let gMonth = shamsiMonth + 3;
  if (gMonth > 12) {
    gMonth -= 12;
  }
  const gDay = shamsiDay;
  return [gYear, gMonth, gDay];
}

export default function PersianDatePicker({
  value = "",
  onChange,
  placeholder = "تاریخ را انتخاب کنید",
  className = "",
  disabled = false,
}: PersianDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<{ year: number; month: number; day: number } | null>(null);
  const [currentMonth, setCurrentMonth] = useState<number>(1);
  const [currentYear, setCurrentYear] = useState<number>(1403);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      const parts = toEnglishDigits(value).split("/");
      if (parts.length === 3) {
        const year = parseInt(parts[0]);
        const month = parseInt(parts[1]);
        const day = parseInt(parts[2]);
        setSelectedDate({ year, month, day });
        setCurrentYear(year);
        setCurrentMonth(month);
      }
    } else {
      const now = new Date();
      const [year, month] = gregorianToShamsi(now.getFullYear(), now.getMonth() + 1, now.getDate());
      setCurrentYear(year);
      setCurrentMonth(month);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const getDaysInMonth = (year: number, month: number): number => {
    if (month <= 6) return 31;
    if (month <= 11) return 30;
    return 29;
  };

  const handleDateSelect = (day: number) => {
    const newDate = { year: currentYear, month: currentMonth, day };
    setSelectedDate(newDate);
    const dateStr = `${newDate.year}/${String(newDate.month).padStart(2, "0")}/${String(day).padStart(2, "0")}`;
    onChange?.(toPersianDigits(dateStr));
    setIsOpen(false);
  };

  const getCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const days: (number | null)[] = [];
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="relative" ref={pickerRef}>
      <input
        type="text"
        value={value || ""}
        placeholder={placeholder}
        readOnly
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full pr-3 pl-10 py-2 border border-input rounded-lg outline-none text-sm bg-background text-foreground cursor-pointer ${className} ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      />
      {isOpen && !disabled && (
        <div className="absolute top-full left-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 p-4 min-w-[280px]">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handlePrevMonth}
              className="p-1 hover:bg-muted rounded"
            >
              ←
            </button>
            <div className="text-center font-bold">
              {PERSIAN_MONTHS[currentMonth - 1]} {toPersianDigits(String(currentYear))}
            </div>
            <button
              onClick={handleNextMonth}
              className="p-1 hover:bg-muted rounded"
            >
              →
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-2">
            {PERSIAN_WEEKDAYS.map((day) => (
              <div key={day} className="text-center text-xs text-muted-foreground font-bold p-1">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {getCalendarDays().map((day) => {
              if (day === null) return <div key="empty" />;
              const isSelected =
                selectedDate?.year === currentYear &&
                selectedDate?.month === currentMonth &&
                selectedDate?.day === day;
              
              return (
                <button
                  key={day}
                  onClick={() => handleDateSelect(day)}
                  className={`p-2 text-sm rounded hover:bg-primary-80 hover:text-white transition-colors ${
                    isSelected
                      ? "bg-primary-80 text-white"
                      : "hover:bg-muted"
                  }`}
                >
                  {toPersianDigits(String(day))}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

