import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import { CookieConsent } from "./components/Cookies";

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
      <script async src="https://stats.jpomian.pl/k.js" data-website-id="76ed559b-37a4-4ba6-b92a-133023d88242"></script>
      <body
        className={`antialiased ${inter.className} flex flex-col min-h-screen`}
      >
        <div className="flex-grow">
          {children}
          <CookieConsent />
        </div>
        <Footer />
      </body>
    </html>
  );
}
