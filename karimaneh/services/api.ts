import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      return Promise.reject({
        message: data?.message || "خطایی رخ داده است",
        status,
        data,
      });
    }
    
    if (error.request) {
      return Promise.reject({
        message: "خطا در ارتباط با سرور",
      });
    }
    
    return Promise.reject({
      message: error.message || "خطایی رخ داده است",
    });
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
