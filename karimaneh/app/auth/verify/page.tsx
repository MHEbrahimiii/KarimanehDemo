"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  ClipboardEvent,
  FormEvent,
  KeyboardEvent,
} from "react";
import { useAuth } from "@/context/auth-context";

const CODE_LENGTH = 5;

const fakeVerifyOtp = (code: string) =>
  new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (code === "12345") {
        resolve();
      } else {
        reject(new Error("کد تایید نامعتبر است"));
      }
    }, 1000);
  });

const fakeResendOtp = (user: string) =>
  new Promise<void>((resolve) => {
    console.log("resending fake otp to", user);
    setTimeout(resolve, 800);
  });

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const user = searchParams.get("user") || "کاربر ناشناس";
  const [code, setCode] = useState<string[]>(
    Array.from({ length: CODE_LENGTH }, () => "")
  );
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const displayUser = useMemo(() => user, [user]);

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "");
    const nextCode = [...code];
    nextCode[index] = digit.slice(-1);
    setCode(nextCode);
    setError("");
    if (digit && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, CODE_LENGTH)
      .split("");

    if (!pasted.length) return;

    const next = Array.from({ length: CODE_LENGTH }, (_, idx) => pasted[idx] || "");
    setCode(next);
    const lastFilledIndex = Math.min(pasted.length, CODE_LENGTH) - 1;
    inputsRef.current[lastFilledIndex]?.focus();
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const joined = code.join("");

    if (joined.length < CODE_LENGTH) {
      setError("کد ۵ رقمی را کامل وارد کنید.");
      return;
    }

    setError("");
    setMessage("");
    setLoading(true);

    try {
      await fakeVerifyOtp(joined);
      setMessage("ورود موفقیت‌آمیز بود. در حال انتقال...");
      
      // Login user through auth context
      login({
        name: displayUser,
        role: "مدیر صندوق",
      });
      
      setTimeout(() => router.push("/dashboard"), 500);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "خطا در تایید کد. دوباره تلاش کنید."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    setMessage("");
    setError("");
    try {
      await fakeResendOtp(user);
      setMessage("کد جدید ارسال شد.");
      setCode(Array.from({ length: CODE_LENGTH }, () => ""));
      inputsRef.current[0]?.focus();
    } catch {
      setError("ارسال مجدد کد با مشکل مواجه شد.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-white flex items-center justify-center p-4 font-vazir-semibold"
      dir="rtl"
      onPaste={handlePaste}
    >
      <div className="bg-white w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 border border-gray-200 rounded-lg overflow-hidden">
          <div className="p-12 flex flex-col justify-center items-center text-right bg-white border-l border-gray-200">
            <div className="mb-8">
              <Image
                src="/Vector (1).png"
                alt="لوگو صندوق"
                width={80}
                height={80}
                className="mx-auto"
              />
            </div>
            <div className="text-gray-700 leading-8 max-w-md">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-blue-900 font-bold flex-shrink-0 mt-1 ml-2 text-2xl">
                    •
                  </span>
                  <span>
                    اعتماد و شفافیت، پایه‌های یک خانواده قوی و موفق هستند. در صندوق
                    قرض‌الحسنه خانوادگی، ما معتقدیم که شفافیت نه‌تنها باعث افزایش اعتماد
                    می‌شود، بلکه آرامش ذهنی و اطمینان خاطر را برای همه اعضا به همراه دارد.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-900 font-bold flex-shrink-0 mt-1 ml-2 text-2xl">
                    •
                  </span>
                  <span>
                    این صندوق برای این طراحی شده است که هر تصمیم مالی در بستری شفاف و امن
                    انجام شود. شما می‌توانید به این اطمینان برسید که هر گامی که برداشته
                    می‌شود، در جهت منافع جمعی خانواده است.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-900 font-bold flex-shrink-0 mt-1 ml-2 text-2xl">
                    •
                  </span>
                  <span>
                    با همکاری، صداقت و حمایت از یکدیگر، می‌توانیم آینده‌ای مطمئن‌تر و
                    پایدارتر برای خود و عزیزانمان بسازیم. اینجا جایی است که هر عضو خانواده
                    اهمیت دارد و هر حرکت، قدمی است به سمت موفقیت جمعی.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-12 flex flex-col justify-center">
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-3">
              ورود به صندوق
            </h1>
            <p className="text-center text-sm text-gray-600 mb-10">
              کد ارسال شده برای حساب {displayUser} را وارد کنید
            </p>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="flex items-center justify-center gap-3">
                {code.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      inputsRef.current[idx] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="w-12 h-12 text-center text-lg border border-gray-300 rounded-lg focus:border-indigo-900 focus:outline-none transition"
                    aria-label={`رقم ${idx + 1}`}
                  />
                ))}
              </div>
              <div className="flex flex-col items-center gap-3 text-sm">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendLoading}
                  className="text-indigo-900 font-semibold hover:text-indigo-700 disabled:opacity-70"
                >
                  {resendLoading ? "در حال ارسال..." : "دریافت مجدد کد"}
                </button>
                <span className="text-gray-500">کد تست: 12345</span>
              </div>
              {error && (
                <div className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-md px-3 py-2">
                  {error}
                </div>
              )}
              {message && (
                <div className="text-green-600 text-sm bg-green-50 border border-green-200 rounded-md px-3 py-2">
                  {message}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-900 text-white py-3 rounded-lg font-semibold hover:bg-indigo-800 transition disabled:opacity-70"
              >
                {loading ? "در حال بررسی..." : "ورود"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

