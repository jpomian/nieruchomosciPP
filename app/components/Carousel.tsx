"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Spinner } from "./ui/Spinner";
import Link from 'next/link'

interface PropertyData {
  title: string;
  price: string;
  image: string;
  id: string;
}

interface OfferData {
  id: string
  url: string
}

export default function CompactList() {
  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/offers");
        if (!response.ok) throw new Error("Failed to fetch offers");
        const offers = await response.json();

        const propertyDataPromises = offers.map(async (offer: OfferData) => {
          const propertyUrl = offer.id
          const htmlResponse = await fetch(
            `/api/scrape?url=${encodeURIComponent(offer.url)}`
          );
          if (!htmlResponse.ok)
            return null;
          const metadata = await htmlResponse.json();

          const firstImage =
            metadata.images?.[0]?.large ||
            metadata.images?.[0]?.medium ||
            metadata.images?.[0]?.small ||
            metadata.images?.[0]?.thumbnail ||
            "/default-image.jpg";

          return {
            title: metadata.title,
            price: metadata.characteristics.price?.value || "N/A",
            image: firstImage,
            id: propertyUrl,
          };
        });

        const propertyData = await Promise.all(propertyDataPromises);
        setProperties(propertyData.filter(Boolean));
      } catch {
        setError("Chwilowo nie można wczytać ofert");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center my-6 text-blue-400 text-lg">
        {error} - <a href='https://www.otodom.pl/pl/firmy/biura-nieruchomosci/wycena-nieruchomosci-elzbieta-pomianowska-kolenska-ID10640250' className="font-bold ml-2"> Sprawdź bezpośrednio na otodom.pl</a>
      </div>
    );
  }

  return (
    <section id='oferty' className="w-full px-4 sm:px-6 lg:px-8 py-12 scroll-mt md:scroll-mt-md lg:scroll-mt-lg">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-500 text-center mb-6">
          Nieruchomości na sprzedaż
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center h-[80vh]">
            <Spinner className="w-16 h-16 text-blue-500" />
          </div>
        ) : (
          <div className="space-y-6">
            {properties.map((property, index) => (
              <div
                key={index}
                className="group flex items-center bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 ease-out overflow-hidden"
              >
                <div className="relative w-1/3 h-40 md:h-56 overflow-hidden">
                  <Link
                    href={`nieruchomosc/${property.id}`}
                    className="block h-full w-full"
                  >
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/default-image.jpg";
                      }}
                    />
                  </Link>
                </div>
                <div className="flex flex-col p-4 w-2/3 gap-12 md:gap-20">
                  <h3 className="text-xl font-bold text-blue-500 line-clamp-2">
                    <Link
                      href={`nieruchomosc/${property.id}`}
                    >
                      {property.title}
                    </Link>
                  </h3>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-lg font-bold text-green-400">
                      {property.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
