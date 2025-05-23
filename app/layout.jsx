import { Inter, Dancing_Script } from "next/font/google";
import "../styles/globals.css";
import { ThemeProvider } from "@/ThemeContext";

const inter = Inter({ subsets: ["latin"] });
const dancing = Dancing_Script({ 
  subsets: ["latin"],
  variable: "--font-dancing"
});

export const metadata = {
  title: "Lyse Aneze",
  description: "Official Portfolio Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${dancing.variable}`}>
        <ThemeProvider>{children}</ThemeProvider> 
      </body>
    </html>
  );
}