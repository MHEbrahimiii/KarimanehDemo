'use client';
import { IconUpload } from "@tabler/icons-react";
import { useState } from "react";
import type { Member } from "@/types/tables";

interface AddMemberContentProps {
  onClose: () => void;
  onSubmit?: (member: Member) => void;
}

export default function AddMemberContent({ onClose, onSubmit }: AddMemberContentProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    nationalCode: '',
    phonenumber: '',
    receivedLoans: '',
    loanRequest: 'inactive',
    role: 'member'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'نام و نام خانوادگی الزامی است';
    }
    if (!formData.nationalCode.trim()) {
      newErrors.nationalCode = 'کد ملی الزامی است';
    } else if (formData.nationalCode.length !== 10) {
      newErrors.nationalCode = 'کد ملی باید 10 رقم باشد';
    }
    if (!formData.phonenumber.trim()) {
      newErrors.phonenumber = 'شماره موبایل الزامی است';
    }
    if (!formData.fatherName.trim()) {
      newErrors.fatherName = 'نام پدر الزامی است';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const newMember: Member = {
      id: Math.max(1, Math.floor(Math.random() * 10000)),
      fullName: formData.fullName,
      fatherName: formData.fatherName,
      nationalCode: formData.nationalCode,
      phonenumber: formData.phonenumber,
      receivedLoans: formData.receivedLoans || '۰',
      status: 'active' 
    };

    if (onSubmit) {
      onSubmit(newMember);
    }
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="w-full text-right" dir="rtl">
      <h2 className="text-xl font-bold text-foreground mb-8 border-b border-border pb-4">افزودن کاربر جدید</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-1">
          <div className="border-2 border-dashed border-input rounded-2xl p-8 flex flex-col items-center justify-center bg-muted hover:bg-muted/80 transition-colors cursor-pointer min-h-[250px]">
            <div className="w-16 h-16 bg-primary-20 text-primary-80 rounded-full flex items-center justify-center mb-4">
              <IconUpload size={32} />
            </div>
            <p className="text-sm font-bold text-foreground">تصویر خود را انتخاب کنید یا اینجا رها کنید</p>
            <p className="text-xs text-muted-foreground mt-2">فرمت‌های پشتیبانی شونده: JPG, PNG</p>
          </div>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground mr-1">نام و نام خانوادگی</label>
              <input 
                type="text" 
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className={`w-full p-3 bg-background border rounded-xl outline-none focus:ring-2 focus:ring-primary-60/20 transition-all text-foreground ${errors.fullName ? 'border-destructive' : 'border-input'}`}
              />
              {errors.fullName && <p className="text-xs text-destructive mt-1">{errors.fullName}</p>}
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground mr-1">نام پدر</label>
              <input 
                type="text" 
                value={formData.fatherName}
                onChange={(e) => handleInputChange('fatherName', e.target.value)}
                className={`w-full p-3 bg-background border rounded-xl outline-none focus:ring-2 focus:ring-primary-60/20 transition-all text-foreground ${errors.fatherName ? 'border-destructive' : 'border-input'}`}
              />
              {errors.fatherName && <p className="text-xs text-destructive mt-1">{errors.fatherName}</p>}
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground mr-1">کد ملی</label>
              <input 
                type="text" 
                maxLength={10}
                value={formData.nationalCode}
                onChange={(e) => handleInputChange('nationalCode', e.target.value.replace(/\D/g, ''))}
                className={`w-full p-3 bg-background border rounded-xl outline-none focus:ring-2 focus:ring-primary-60/20 transition-all text-foreground ${errors.nationalCode ? 'border-destructive' : 'border-input'}`}
              />
              {errors.nationalCode && <p className="text-xs text-destructive mt-1">{errors.nationalCode}</p>}
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground mr-1">شماره موبایل</label>
              <input 
                type="text" 
                value={formData.phonenumber}
                onChange={(e) => handleInputChange('phonenumber', e.target.value)}
                className={`w-full p-3 bg-background border rounded-xl outline-none focus:ring-2 focus:ring-primary-60/20 transition-all text-foreground ${errors.phonenumber ? 'border-destructive' : 'border-input'}`}
              />
              {errors.phonenumber && <p className="text-xs text-destructive mt-1">{errors.phonenumber}</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-xl border border-input">
              <span className="text-xs font-bold text-muted-foreground block mb-3">درخواست وام</span>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer text-sm text-foreground">
                  <input 
                    type="radio" 
                    name="loan" 
                    value="active"
                    checked={formData.loanRequest === 'active'}
                    onChange={(e) => handleInputChange('loanRequest', e.target.value)}
                    className="accent-primary-80"
                  /> 
                  فعال
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm text-foreground">
                  <input 
                    type="radio" 
                    name="loan" 
                    value="inactive"
                    checked={formData.loanRequest === 'inactive'}
                    onChange={(e) => handleInputChange('loanRequest', e.target.value)}
                    className="accent-primary-80"
                  /> 
                  غیرفعال
                </label>
              </div>
            </div>
            <div className="bg-muted p-4 rounded-xl border border-input">
              <span className="text-xs font-bold text-muted-foreground block mb-3">انتخاب سمت</span>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer text-sm text-foreground">
                  <input 
                    type="radio" 
                    name="role" 
                    value="member"
                    checked={formData.role === 'member'}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    className="accent-primary-80"
                  /> 
                  عضو صندوق
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm text-foreground">
                  <input 
                    type="radio" 
                    name="role" 
                    value="admin"
                    checked={formData.role === 'admin'}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    className="accent-primary-80"
                  /> 
                  مدیر صندوق
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-10 border-t border-border pt-6">
        <button 
          onClick={handleSubmit}
          className="bg-primary-110 text-white px-10 py-3 rounded-xl font-bold hover:bg-primary-100 transition-colors disabled:opacity-50"
        >
          ذخیره
        </button>
        <button 
          onClick={onClose} 
          className="border border-input px-10 py-3 rounded-xl font-bold text-foreground hover:bg-muted transition-colors"
        >
          انصراف
        </button>
      </div>
    </div>
  );
}
