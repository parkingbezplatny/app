import Providers from "@/lib/providers/Providers";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin-ext"] });

export const metadata: Metadata = {
  title: "Parking Bezpłatny",
  description:
    "Aplikacja do wyszukiwania i zapisywania ulubionych parkingów bezpłatnych",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl-PL">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
