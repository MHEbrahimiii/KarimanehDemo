import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";

const iranyekan = localFont({
  src: [
    {
<<<<<<< HEAD
      path: "../assets/fonts/IRANYekanThinFaNum.ttf",
=======
      path: "../assets/fonts/IRANYekanThin.ttf",
>>>>>>> afa523f618daea4ff7f0014696e1b21282c95a9d
      weight: "100",
      style: "normal",
    },
    {
<<<<<<< HEAD
      path: "../assets/fonts/IRANYekanLightFaNum.ttf",
=======
      path: "../assets/fonts/IRANYekanLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../assets/fonts/Vazirmatn-Light.woff2",
>>>>>>> afa523f618daea4ff7f0014696e1b21282c95a9d
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/IRANYekanRegularFaNum.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/IRANYekanMediumFaNum.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/IRANYekanBoldFaNum.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/IRANYekanExtraBoldFaNum.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../assets/fonts/IRANYekanBlackFaNum.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-iranyekan",
  display: "swap",
  fallback: ["sans-serif"],
});

export const metadata: Metadata = {
  title: "صندوق قرض الحسنه كريمانه",
  description: "سیستم مدیریت صندوق قرض الحسنه",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body
        className={`${iranyekan.variable} antialiased font-iranyekan`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
