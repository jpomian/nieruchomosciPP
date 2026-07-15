"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    title: "Elżbieta Pomianowska-Koleńska",
    paragraphs: [
      <>
        Jestem Ela i po 13 latach pracy w banku jako analityk nieruchomości
        otworzyłam swoją własną firmę „
        <span className="highlight">Nieruchomości pod parasolem</span>
        ".
      </>,
      <>
        Dlaczego pod parasolem? Babcia zawsze powtarzała, że wszyscy chcą
        znaleźć się pod moim parasolem, ponieważ czują się tam bezpiecznie. I
        taka jest moja misja – dbać o to, aby Wasze nieruchomości były
        gruntownie sprawdzone, dobrze wycenione a proces sprzedaży bezpieczny.
      </>,
      <>
        Rozumiem, że nieruchomości to często dorobek życia, spełnienie marzeń
        albo element trudnych życiowych decyzji. Jako{" "}
        <span className="highlight">rzeczoznawca majątkowy</span>,{" "}
        <span className="highlight">biegły sądowy</span> oraz{" "}
        <span className="highlight">pośrednik nieruchomości</span>, chętnie
        pomogę rozwiązać Wasze nieruchomościowe problemy
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
        Jestem Ola i po 15 latach pracy w korporacji zdecydowałam się dołączyć
        do Eli, żeby wspólnie działać w "
        <span className="highlight-blue">Nieruchomościach pod parasolem</span>".
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
          <li>
            jestem twardą negocjatorką, do czego przygotowała mnie kilkuletnia
            praca w windykacji{" "}
          </li>
          <li>
            mam wiedzę ekonomiczną, znam zasady działania rynku, które poznałam
            na studiach ekonomicznych
          </li>
          <li>
            umiem prezentować, przez 5 lat prowadziłam szkolenia twarde i
            miękkie
          </li>
          <li>
            przyjaźnie współpracuję z ludźmi, dzięki kilkunastoletniemu
            doświadczeniu w pracy z klientami i współpracownikami w 2
            międzynarodowych korporacjach
          </li>
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
  const [firstViewed, setFirstViewed] = useState<boolean[]>([false, false]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const count = slides.length;
  const TIMER = 9700;

  // Auto-scroll logic: scroll exactly once (0 -> 1) after 5 seconds on each slide, then stop
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setTimeout(() => {
      // Mark current slide as viewed
      setFirstViewed((prev) => {
        const updated = [...prev];
        updated[current] = true;
        return updated;
      });

      // Move forward once from slide 0 to slide 1, then stop auto-play
      if (current < count - 1) {
        setCurrent((prev) => prev + 1);
      } else {
        setIsAutoPlaying(false);
      }
    }, TIMER);

    return () => clearTimeout(timer);
  }, [current, isAutoPlaying, count]);

  const handleManualNavigation = (index: number) => {
    setCurrent(index);
    setIsAutoPlaying(false);
    // Mark as viewed so dots show solid immediately
    setFirstViewed((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  const scrollPrev = () => {
    const nextIndex = current === 0 ? current : current - 1;
    handleManualNavigation(nextIndex);
  };

  const scrollNext = () => {
    const nextIndex = current === count - 1 ? current : current + 1;
    handleManualNavigation(nextIndex);
  };

  const scrollTo = (index: number) => {
    handleManualNavigation(index);
  };

  // SVG progress ring circumference
  const radius = 10;
  const circumference = 2 * Math.PI * radius; // ≈ 62.83

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
            className="flex transition-transform duration-1000"
            style={{
              transform: `translateX(-${current * 100}%)`,
              transitionTimingFunction: "cubic-bezier(0.8, 0, 0.2, 1)",
            }}
          >
            {slides.map((slide, slideIndex) => {
              const isEven = (slideIndex + 1) % 2 === 0;
              return (
                <div key={slide.id} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-start px-4 md:px-12">
                    {/* Text Content */}
                    <div
                      className={`space-y-8 ${isEven ? "md:order-2" : "md:order-1"}`}
                    >
                      <h1
                        className={`text-3xl md:text-4xl font-extrabold tracking-tight ${isEven ? "text-sky-600" : "text-green-700"}`}
                      >
                        {slide.title}
                      </h1>

                      <div className="space-y-6 text-muted-foreground leading-10">
                        {slide.paragraphs.map((paragraph, index) => (
                          <div key={index}>{paragraph}</div>
                        ))}
                      </div>
                    </div>

                    {/* Image */}
                    <div
                      className={`relative h-[500px] md:h-[700px] rounded-lg border border-gray-400 shadow-xl ${isEven ? "md:order-1" : "md:order-2"}`}
                    >
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

        {/* Indicator Dots with circular progress ring */}
        <div className="flex items-center justify-center gap-6 mt-8">
          {slides.map((_, index) => {
            const isActive = current === index;
            const isFirstView = !firstViewed[index];
            const isEven = (index + 1) % 2 === 0;
            const dotColor = isEven ? "text-sky-500" : "text-emerald-500";
            const strokeColor = isEven ? "#0ea5e9" : "#10b981";

            return (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className="relative w-8 h-8 flex items-center justify-center rounded-full focus:outline-none focus:ring-1"
              >
                {/* Background ring (always visible when inactive) */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r={radius}
                    fill="#BAB6B6"
                    stroke="#757575"
                    strokeWidth="1"
                    className="opacity-20"
                  />

                  <text
                    x="12"
                    y="12"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="8"
                    fontWeight="500"
                    fill="#404040"
                    className={`${isActive && !isFirstView ? "hidden" : "block"} opacity-70`}
                  >
                    {index + 1}
                  </text>
                </svg>

                {/* Active dot logic */}
                {isActive && index === 0 && isFirstView ? (
                  // Animated progress ring (only on first slide's first view)
                  <svg
                    key={`progress-${index}`}
                    className="absolute inset-0 w-full h-full -rotate-90"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r={radius}
                      fill="transparent"
                      stroke={strokeColor}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={circumference}
                      className="animate-ring-fill"
                    />
                  </svg>
                ) : (isActive && !isFirstView) || (isActive && index === 1) ? (
                  // Solid ready dot (for second slide or after first view)
                  <div
                    className={`absolute inset-0 w-full h-full rounded-full ${dotColor}`}
                    style={{ backgroundColor: strokeColor, opacity: 0.85 }}
                  />
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Custom Keyframe for ring animation */}
        <style>{`
          @keyframes ring-fill {
            from { stroke-dashoffset: ${circumference}; }
            to { stroke-dashoffset: 0; }
          }
          .animate-ring-fill {
            animation: ring-fill 10s linear forwards;
          }
        `}</style>
      </div>
    </section>
  );
}
