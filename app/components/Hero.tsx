import Image from "next/image";
import Photo from "../assets/photo-squared.png";

export default function Hero() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-20 mt-24">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-start">
        <div className="space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Elżbieta Pomianowska-Koleńska
          </h1>

          <div className="space-y-4 text-muted-foreground">
            <p>
              Absolwentka Uniwersytetu Ekonomicznego w Poznaniu. Doświadczony{" "}
              <span className="highlight">rzeczoznawca majątkowy</span> z
              wieloletnim doświadczeniem i wieloma pozytywnymi opiniami.
            </p>

            <p>
              Od roku 2022 pracuję także jako{" "}
              <span className="highlight">biegły sądowy</span>.
            </p>

            <p>
              Służbowo pełnię rolę{" "}
              <span className="highlight">agenta nieruchomości</span> w obrębie
              Poznania, a moją ulubioną dzielnicą jest Piątkowo.
            </p>

            <p>
              W wolnym czasie spędzam aktywnie czas z kochanymi córeczkami,
              aniołkami. Staram się łączyć aktywne życie zawodowe z rodziną, to
              oni są dla mnie najważniejsi 🥰
            </p>
          </div>
          <div className="flex justify-center">
            <button className="bg-[#4154F1] hover:bg-[#3544d2] text-white px-12 md:py-8 py-6 mt-8 text-lg">
              Zobacz aktualne nieruchomości na sprzedaż.
            </button>
          </div>
        </div>  
        <div className="relative h-[600px] shadow-md">
          <Image
            src={Photo}
            alt="Elżbieta Pomianowska-Koleńska"
            fill
            className="object-cover rounded-lg object-top"
            priority
          />
        </div>
      </div>
    </section>
  );
}
