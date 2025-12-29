import { z } from "zod";

export const UserRoleSchema = z.enum(["admin", "member", "مدیر صندوق", "عضو صندوق"]);

export const UserSchema = z.object({
  name: z.string().min(1, "نام الزامی است"),
  role: UserRoleSchema,
});

export type User = z.infer<typeof UserSchema>;

export const PERSIAN_REGEX = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

export const LoginSchema = z.object({
  username: z
    .string()
    .min(1, "نام کاربری الزامی است")
    .refine((val) => !PERSIAN_REGEX.test(val), {
      message: "نام کاربری باید به انگلیسی باشد",
    }),
  password: z
    .string()
    .min(7, "رمز عبور باید بیشتر از 6 رقم باشد")
    .refine((val) => !PERSIAN_REGEX.test(val), {
      message: "رمز عبور باید به انگلیسی باشد",
    }),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export const OtpSchema = z.object({
  code: z
    .string()
    .length(5, "کد باید ۵ رقمی باشد")
    .regex(/^\d+$/, "کد باید فقط شامل اعداد باشد"),
});

export type OtpInput = z.infer<typeof OtpSchema>;

export const isAdmin = (role: string): boolean => {
  return role === "admin" || role === "مدیر صندوق";
};

export const normalizeRole = (role: string): "admin" | "member" => {
  return isAdmin(role) ? "admin" : "member";
};

export const getDisplayRole = (role: "admin" | "member"): "مدیر صندوق" | "عضو صندوق" => {
  return role === "admin" ? "مدیر صندوق" : "عضو صندوق";
};

