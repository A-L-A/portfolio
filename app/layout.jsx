

import { Inter } from "next/font/google";
import "../styles/globals.css";
import { ThemeProvider } from "@/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lyse A. Aneze",
  description: "Official Portfolio Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider> 
      </body>
    </html>
  );
}
