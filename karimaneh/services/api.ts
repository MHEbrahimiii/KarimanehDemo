import axios from "axios";

// ایجاد instance از axios با تنظیمات پیش‌فرض
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 ثانیه
});

// Request interceptor - برای اضافه کردن token و غیره
api.interceptors.request.use(
  (config) => {
    // اگر token در localStorage یا cookie دارید، اینجا اضافه کنید
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - برای مدیریت خطاها
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // مدیریت خطاهای مختلف
    if (error.response) {
      // خطای سرور
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - می‌توانید به صفحه لاگین redirect کنید
          // router.push('/Login');
          break;
        case 403:
          // Forbidden
          break;
        case 404:
          // Not Found
          break;
        case 500:
          // Server Error
          break;
        default:
          break;
      }

      return Promise.reject({
        message: data?.message || "خطایی رخ داده است",
        status,
        data,
      });
    } else if (error.request) {
      // درخواست ارسال شد اما پاسخ دریافت نشد
      return Promise.reject({
        message: "خطا در ارتباط با سرور",
      });
    } else {
      // خطا در تنظیم درخواست
      return Promise.reject({
        message: error.message || "خطایی رخ داده است",
      });
    }
  }
);

export default api;

export type MockLoginParams = {
  username: string;
  password: string;
};

export type MockLoginResponse = {
  otpReference: string;
  username: string;
  message: string;
};

/**
 * Mocked login API that pretends to validate credentials and send OTP.
 * In a real app, replace this with an HTTP call.
 */
export const mockLogin = ({
  username,
  password,
}: MockLoginParams): Promise<MockLoginResponse> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!username || !password) {
        reject(new Error("نام کاربری یا رمز عبور نادرست است"));
        return;
      }
      resolve({
        otpReference: "mock-otp-12345",
        username,
        message: "کد تایید ارسال شد",
      });
    }, 800);
  });
