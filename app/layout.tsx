import type { Metadata } from "next";
import { Mona_Sans, Geist, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "ai interview application",
  description: "prepare for your interview and get hired",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en" className={cn("dark", "font-sans", inter.variable)}
    >
      <body className={`${monaSans.className} antialiased pattern`}>
        {children}
        <Toaster/>
        </body>
    </html>
  );
}
