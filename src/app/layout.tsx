import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from '@/components/footer';
import Head from 'next/head';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "qliphoth:systems",
  description: "a llamda, ltd conspiracy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta property="og:title" content="qliphoth:systems" key="title" />
        <meta property="og:description" content="a llamda, ltd conspiracy" key="description" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="canonical" href="https://qliphoth.systems" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <body className={inter.className}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
