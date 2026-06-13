import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import { CookieConsent } from "./components/Cookies";
import { Analytics } from "@vercel/analytics/next";

const inter = Mulish({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nieruchomości pod parasolem",
  description:
    "Wycena i obrót nieruchomościami w Poznaniu i okolicach. Działalność prowadzona przez specjalistę Elżbietę Pomianowską-Koleńską.",
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
        <Analytics />
        <div className="flex-grow">
          {children}
          <CookieConsent />
        </div>
        <Footer />
      </body>
    </html>
  );
}
