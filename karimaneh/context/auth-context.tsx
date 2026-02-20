"use client";

import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { UserSchema, type User, isAdmin } from "@/lib/schemas";

type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = "auth";
const readStoredUser = (): User | null => {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored);
    return UserSchema.parse(parsed);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => readStoredUser());
  const router = useRouter();

  const login = (userData: User) => {
    const validated = UserSchema.parse(userData);
    setUser(validated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(validated));
    router.push(isAdmin(validated.role) ? "/admin" : "/user");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
