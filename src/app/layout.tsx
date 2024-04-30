import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "components/navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ContentBuilder AI",
  description: "Dub, Summarize and Transcript all your content here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-hidden">
      <body className={inter.className + " h-screen overflow-y-scroll bg-main-gradient py-4"}>
        <NavBar/>

        {children}
      </body>
    </html>
  );
}
