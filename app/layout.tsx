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
      <script defer src="https://stats.jpomian.pl/script.js" data-website-id="1cc0e05c-9805-457d-95a5-05dc379daad7"></script>
      <script defer src="https://stats.jpomian.pl/recorder.js" data-website-id="1cc0e05c-9805-457d-95a5-05dc379daad7"></script>
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
