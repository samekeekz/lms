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
  icons: {
    icon: [
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                  m[i]=m[i]||function(){ (m[i].a=m[i].a||[]).push(arguments) };
                  m[i].l=1*new Date();
                  for (var j = 0; j < document.scripts.length; j++) {
                      if (document.scripts[j].src === r) { return; }
                  }
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=106168252', 'ym');
            `
          }}
        />
        </head>
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
