import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";

const inter = Mulish({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Nieruchomości pod parasolem",
  description: "Wycena i obrót nieruchomościami w Poznaniu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased ${inter.className} flex flex-col min-h-screen`}
      >
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
