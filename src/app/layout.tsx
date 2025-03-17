import type { Metadata } from "next";
import "./globals.css";
import { Zen_Kaku_Gothic_New } from "next/font/google";
import { QueryProvider } from "@/providers/QueryProvider";

const gothic = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-vilo-gothic",
});

export const metadata: Metadata = {
  title: "Helix AI",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${gothic.variable}`}>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
