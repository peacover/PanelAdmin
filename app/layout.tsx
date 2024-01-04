import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import Favicon from '/public/icons/mini_logo.svg';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PanelAdmin",
  description: "PanelAdmin - Admin Dashboard",
  icons: [{ rel: 'icon', url: Favicon.src }],
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
