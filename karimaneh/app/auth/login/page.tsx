"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { mockLogin } from "@/services/api";

const loginSchema = Yup.object().shape({
  username: Yup.string().required("نام کاربری الزامی است"),
  password: Yup.string().required("رمز عبور الزامی است"),
});

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="min-h-screen bg-white flex items-center justify-center p-4 font-vazir-semibold"
      dir="rtl"
    >
      <div className="bg-white w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 border border-gray-200 rounded-lg overflow-hidden">
          <div className="p-12 flex flex-col justify-center">
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-10">
              ورود به صندوق
            </h1>
            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={loginSchema}
              onSubmit={async (values: { username: string; password: string }) => {
                setError("");
                setLoading(true);
                try {
                  await mockLogin(values);
                  router.push(
                    `/auth/verify?user=${encodeURIComponent(values.username)}`
                  );
                } catch (err) {
                  const message =
                    err instanceof Error
                      ? err.message
                      : "ارسال کد با مشکل مواجه شد. دوباره تلاش کنید.";
                  setError(message);
                } finally {
                  setLoading(false);
                }
              }}
            >
              {({ errors, touched }: { errors: any; touched: any }) => (
                <Form className="space-y-6">
                  <div>
                    <Field
                      name="username"
                      type="text"
                      placeholder="نام کاربری"
                      autoComplete="username"
                      className={`w-full px-4 py-3 border rounded-lg bg-white placeholder-gray-400 focus:outline-none transition ${
                        errors.username && touched.username
                          ? "border-red-500"
                          : "border-gray-300 focus:border-blue-900"
                      }`}
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="relative">
                    <Field
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="رمز عبور"
                      autoComplete="current-password"
                      className={`w-full px-4 py-3 pr-12 border rounded-lg bg-white placeholder-gray-400 focus:outline-none transition ${
                        errors.password && touched.password
                          ? "border-red-500"
                          : "border-gray-300 focus:border-blue-900"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <IconEyeOff className="w-5 h-5" />
                      ) : (
                        <IconEye className="w-5 h-5" />
                      )}
                    </button>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  {error && (
                    <div className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-md px-3 py-2">
                      {error}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-900 text-white py-3 rounded-lg font-semibold hover:bg-indigo-800 transition disabled:opacity-70"
                  >
                    {loading ? "در حال ارسال..." : "دریافت کد تایید"}
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    کد آزمایشی در مرحله بعد: 12345
                  </p>
                </Form>
              )}
            </Formik>
          </div>

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
        </div>
      </div>
    </div>
  );
}

