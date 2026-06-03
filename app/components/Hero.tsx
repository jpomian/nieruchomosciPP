"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

const slides = [
  {
    id: 1,
    title: "Elżbieta Pomianowska-Koleńska",
    paragraphs: [
      <>
        Jestem Ela i po 13 latach pracy w banku jako analityk nieruchomości
        otworzyłam swoją własną firmę „
        <span className="highlight">
          Nieruchomości pod parasolem
        </span>
        ".
      </>,
      <>
        Dlaczego pod parasolem? Babcia zawsze powtarzała, że wszyscy chcą
        znaleźć się pod moim parasolem, ponieważ czują się tam bezpiecznie. I
        taka jest moja misja – dbać o to, aby Wasze nieruchomości były gruntownie
        sprawdzone, dobrze wycenione a proces sprzedaży bezpieczny.
      </>,
      <>
        Rozumiem, że nieruchomości to często dorobek życia, spełnienie marzeń
        albo element trudnych życiowych decyzji. Jako{" "}
        <span className="highlight">rzeczoznawca majątkowy</span>
        ,{" "}
        <span className="highlight">biegły sądowy</span> oraz{" "}
        <span className="highlight">pośrednik nieruchomości</span>
        , chętnie pomogę rozwiązać Wasze nieruchomościowe problemy
      </>,
    ],
    buttonText: "Zobacz nieruchomości na sprzedaż.",
    buttonLink: "#oferty",
    imageSrc: "/photo-ela.png",
    imageAlt: "Elżbieta Pomianowska-Koleńska",
  },
  {
    id: 2,
    title: "Aleksandra Biela",
    paragraphs: [
      <>
        Jestem Ola i po 15 latach pracy w korporacji zdecydowałam się dołączyć do Eli,
        żeby wspólnie działać w "<span className="highlight-blue">Nieruchomościach pod parasolem</span>".
      </>,
      <>
        Dlaczego?
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>rynek nieruchomości - z pasji</li>
          <li>z Elą - ze względu na wspólne wartości i cele</li>
        </ul>
      </>,
      <>
        Moje mocne strony:
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>jestem twardą negocjatorką, do czego przygotowała mnie kilkuletnia praca w windykacji </li>
          <li>mam wiedzę ekonomiczną, znam zasady działania rynku, które poznałam na studiach ekonomicznych</li>
          <li>umiem prezentować, przez 5 lat prowadziłam szkolenia twarde i miękkie</li>
          <li>przyjaźnie współpracuję z ludźmi, dzięki kilkunastoletniemu doświadczeniu w pracy z klientami i współpracownikami w 2 międzynarodowych korporacjach</li>
        </ul>
      </>,
    ],
    buttonText: "Skontaktuj się z Nami",
    buttonLink: "#kontakt",
    imageSrc: "/photo-ola.jpg",
    imageAlt: "Współpraca z ekspertem",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const count = slides.length;

  const scrollPrev = () => {
    setCurrent((prev) => (prev === 0 ? prev : prev - 1));
  };

  const scrollNext = () => {
    setCurrent((prev) => (prev === count - 1 ? prev : prev + 1));
  };

  const scrollTo = (index: number) => {
    setCurrent(index);
  };

  return (
    <section
      id="zespol"
      className="container mx-auto px-4 py-12 md:py-20 mt-24 scroll-mt-24"
    >
      <div className="relative">
        {/* Navigation Arrows - centered with container */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 rounded-xl hidden md:flex"
          onClick={scrollPrev}
          disabled={current === 0}
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Poprzedni slajd</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 rounded-xl hidden md:flex"
          onClick={scrollNext}
          disabled={current === count - 1}
        >
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Następny slajd</span>
        </Button>

        {/* Slides Container */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide, slideIndex) => {
              const isEven = (slideIndex + 1) % 2 === 0;
              return (
                <div key={slide.id} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-start px-4 md:px-12">
                    {/* Text Content */}
                    <div className={`space-y-8 ${isEven ? "md:order-2" : "md:order-1"}`}>
                      <h1 className={`text-3xl md:text-4xl font-extrabold tracking-tight ${isEven ? "text-sky-600" : "text-green-700"}`}>
                        {slide.title}
                      </h1>

                      <div className="space-y-6 text-muted-foreground leading-10">
                        {slide.paragraphs.map((paragraph, index) => (
                          <div key={index}>{paragraph}</div>
                        ))}
                      </div>
                    </div>

                    {/* Image */}
                    <div className={`relative h-[500px] md:h-[700px] rounded-lg border border-gray-400 shadow-xl ${isEven ? "md:order-1" : "md:order-2"}`}>
                      <Image
                        src={slide.imageSrc}
                        alt={slide.imageAlt}
                        fill
                        className="object-cover rounded-lg object-top"
                        priority
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Navigation Arrows */}
        <div className="flex items-center justify-center gap-4 mt-8 md:hidden">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={scrollPrev}
            disabled={current === 0}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Poprzedni slajd</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={scrollNext}
            disabled={current === count - 1}
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Następny slajd</span>
          </Button>
        </div>

        {/* Dot Indicators */}
        <div className="flex items-center justify-center gap-4 mt-8">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-3 w-3 rounded-full transition-colors ring-1 ring-gray-400 ${
                index === current
                  ? "bg-emerald-500"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Przejdź do slajdu ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
