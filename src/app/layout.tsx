import type { Metadata } from "next";
import "./globals.css";
import { Zen_Kaku_Gothic_New } from "next/font/google";
import { QueryProvider } from "@/providers/QueryProvider";

const gothic = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: "300",
});

export const metadata: Metadata = {
  title: "vilo",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${gothic.variable} `}>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
