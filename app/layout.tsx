import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ToasterProvider } from "@/components/providers/toaster-provider";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import { AuthLoadingProvider } from "@/components/providers/auth-loading-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Подготовка к NUET | Онлайн-курс для поступления в Nazarbayev University",
  description: "Комплексная подготовка к NUET по Математике и Критическому мышлению. Опытные преподаватели, пробные тесты и персональная поддержка для поступления в Назарбаев Университет.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <AuthLoadingProvider>
            <ConfettiProvider />
            <ToasterProvider />
            {children}
          </AuthLoadingProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
