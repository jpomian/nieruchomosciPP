import Image from "next/image"
import Photo from "../assets/photo-squared.png"
import Link from 'next/link'

export default function Hero() {
  return (
    <section id="ja" className="container mx-auto px-4 py-12 md:py-20 mt-24 scroll-mt-24">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-start">
        <div className="space-y-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Elżbieta Pomianowska-Koleńska</h1>

          <div className="space-y-6 text-muted-foreground leading-8">
            <p>
            Jestem Ela i po 13 latach pracy w banku jako analityk nieruchomości otworzyłam swoją własną firmę „<span className="highlight">Nieruchomości pod parasolem</span>”. ☂️
            </p>

            <p>
            Dlaczego pod parasolem? Babcia zawsze powtarzała, że wszyscy chcą znaleźć się pod moim parasolem, ponieważ czują się tam bezpiecznie.
            I taka jest moja misja – dbać o to, aby Wasze nieruchomości były gruntownie sprawdzone, dobrze wycenione a proces sprzedaży bezpieczny.🏡
            </p>

            <p>
            Rozumiem, że nieruchomości to często dorobek życia, spełnienie marzeń albo element trudnych życiowych decyzji.
            Jako <span className="highlight">rzeczoznawca majątkowy</span>, <span className="highlight">biegły sądowy</span> oraz <span className="highlight">pośrednik nieruchomści</span>, chętnie pomogę rozwiązać Wasze nieruchomościowe problemy 😊
            </p>

          </div>
          <div className="flex justify-center">
            <Link href='#oferty'>
            <button className="bg-[#4d5ef5] hover:bg-[#3544d2] border-2 border-solid border-blue-700 rounded-lg text-white px-12 md:py-8 py-6 mt-8 text-lg">
              Zobacz aktualne nieruchomości na sprzedaż.
            </button>
            </Link>
            
          </div>
        </div>
        <div className="relative h-[700px] shadow-md">
          <Image
            src={Photo || "/placeholder.svg"}
            alt="Elżbieta Pomianowska-Koleńska"
            fill
            className="object-cover rounded-lg object-top"
            priority
          />
        </div>
      </div>
    </section>
  )
}

