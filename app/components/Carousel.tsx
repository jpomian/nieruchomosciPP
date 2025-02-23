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

export default function Carousel() {
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
          const propertyUrl = await offer.id
          const htmlResponse = await fetch(
            `/api/scrape?url=${encodeURIComponent(offer.url)}`
          );
          if (!htmlResponse.ok)
            throw new Error("Failed to fetch property data");
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
        setError("Failed to load property data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
        {error} - Please try again later
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-500 text-center mb-6">
          Nieruchomości na sprzedaż
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center h-[80vh]">
            <Spinner className="w-16 h-16 text-blue-500" />
          </div>
        ) : (
          <div
            className={`relative ${
              properties.length > 3
                ? "overflow-x-scroll pb-8 -mx-4"
                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            } gap-12`}
          >
            <div
              className={`${
                properties.length > 3
                  ? "flex flex-nowrap space-x-12 px-4"
                  : "contents"
              }`}
            >
              {properties.map((property, index) => (
                <div
                  key={index}
                  className={`group relative bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 ease-out overflow-hidden ${
                    properties.length > 3
                      ? "flex-none w-[calc(100vw-2rem)] md:w-[40vw] lg:w-[30vw]"
                      : "w-full"
                  }`}
                >
                  <div className="relative h-[600px] w-full overflow-hidden">
                    <Link href={`nieruchomosc/${property.id}`}>
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
                   

                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="flex flex-col gap-4">
                        <h3 className="text-3xl font-bold text-white/80 line-clamp-2 drop-shadow-2xl">
                          {property.title}
                        </h3>
                        <div className="flex items-center gap-4">
                          <span className="text-2xl font-bold text-green-400/80">
                            {property.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
