import { Card, CardHeader, CardContent } from "./ui/card";
import Logo from "../assets/logo-transparent.png";
import Image from "next/image";
import { BadgeAlert } from "lucide-react";

export default function PricingComponent() {
  const pricingData = [
    { service: "Działka niezabudowana", price: "od 500 zł" },
    { service: "Lokal mieszkalny", price: "od 600 zł" },
    { service: "Dom jednorodzinny gotowy", price: "od 750 zł" },
    { service: "Dom jednorodzinny w budowie", price: "od 800 zł" },
    { service: "Nieruchomości komercyjne", price: "Ustalane indywidualnie" },
  ];

  return (
    <section
      id="cennik"
      className="p-12 relative w-full border-t-2 border-b-2 border-dashed border-gray-300 scroll-mt md:scroll-mt-md lg:scroll-mt-lg"
    >
      <Card className="w-full max-w-[1168px] mx-auto bg-sky-50 shadow-lg relative">
        <div className="absolute top-4 right-4">
          <Image src={Logo} alt="Company Logo" width={80} height={40} />
        </div>
        <CardHeader>
          <h2 className="text-4xl font-bold text-center text-green-900">
            Cennik
          </h2>
          <h3 className="text-sm text-gray-400 text-center mt-2">
            Dla poszczególnych rodzajów wycen.
          </h3>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full leading-8">
              <tbody>
                {pricingData.map((item, index) => (
                  <tr
                    key={index}
                    className={`border-b border-green-200 hover:bg-green-100 transition-colors ${
                      index === pricingData.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <td className="py-4 px-6 text-left text-[#028965]">
                      {item.service}
                    </td>
                    <td className="py-4 px-6 text-right font-bold text-[#028965]">
                      {item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center items-center mt-4">
            <div className="flex flex-row items-center gap-2">
              <BadgeAlert className="text-green-900 h-5 w-5"/>
              <p className="text-sm text-gray-400">
                W przypadku nieruchomości nieokreślonych w powyższym cenniku lub
                innych usług, zapraszam do{" "}
                <a href="/kontakt" className="underline text-gray-600">
                  skontaktowania
                </a>{" "}
                się ze mną.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
