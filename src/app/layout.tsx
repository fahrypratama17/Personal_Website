import type { Metadata } from "next";
import { Exo_2, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const exo = Exo_2({
  variable: "--font-exo-2",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
});

export const metadata: Metadata = {
  title: "Fahry's Portofolio Website",
  description: "Modern & Minimalist Portofolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${exo.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
