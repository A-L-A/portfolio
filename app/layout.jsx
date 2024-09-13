"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lyse A. Aneze",
  description: "Official Portfolio Website",
};

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + searchParams.toString();
    const cleanUrl = url.replace(/\/$/, "");
    if (cleanUrl !== url) {
      window.history.replaceState(null, "", cleanUrl);
    }
  }, [pathname, searchParams]);

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
