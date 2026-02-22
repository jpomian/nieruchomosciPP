"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Spinner } from "./ui/Spinner";
import Link from "next/link";

interface PropertyData {
  title: string;
  price: string;
  image: string;
  id: string;
  url: string;
}

interface OfferData {
  id: string;
  url: string;
}

export default function CompactList() {
  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/offers");
        if (!response.ok) throw new Error("Failed to fetch offers");
        const offers = await response.json();

        const propertyDataPromises = offers.map(async (offer: OfferData) => {
          const propertyUrl = offer.id;
          const htmlResponse = await fetch(
            `/api/scrape?url=${encodeURIComponent(offer.url)}`,
          );
          if (!htmlResponse.ok) return null;
          const metadata = await htmlResponse.json();

          const images = metadata.images || [];
          const randomImage = images.length > 0 
            ? images[Math.floor(Math.random() * images.length)]
            : null;
            
          const firstImage = randomImage?.large ||
            randomImage?.medium ||
            randomImage?.small ||
            randomImage?.thumbnail ||
            "/default-image.jpg";

          return {
            title: metadata.title,
            price: metadata.characteristics.price?.value || "N/A",
            image: firstImage,
            id: propertyUrl,
            url: offer.url,
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

  const handleCopyClick = async (id: string) => {
    try {
      await navigator.clipboard.writeText(
        `https://nieruchomoscipodparasolem.pl/nieruchomosc/${id}`,
      );
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center my-6 text-blue-400 text-lg">
        {error} -{" "}
        <a
          href="https://www.otodom.pl/pl/firmy/biura-nieruchomosci/wycena-nieruchomosci-elzbieta-pomianowska-kolenska-ID10640250"
          className="font-bold ml-2"
        >
          {" "}
          Sprawdź bezpośrednio na otodom.pl
        </a>
      </div>
    );
  }

  return (
    <section
      id="oferty"
      className="w-full px-4 sm:px-6 lg:px-8 py-12 scroll-mt md:scroll-mt-md lg:scroll-mt-lg"
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-green-900 text-center mb-8">
          Nieruchomości na sprzedaż
        </h1>

        {isLoading ? (
          <div className="flex justify-center gap-4 items-center h-[80vh]">
            <Spinner className="w-16 h-16 text-[#028965]" />
            <p className="text-[#028965] font-semibold text-xl">
              Poczekaj aż dostępne oferty załadują się lub odwiedź mój{" "}
              <a
                className="underline font-bold"
                href="https://www.otodom.pl/pl/firmy/biura-nieruchomosci/wycena-nieruchomosci-elzbieta-pomianowska-kolenska-ID10640250"
              >
                profil
              </a>{" "}
              na otodom.pl.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {properties.map((property, index) => (
              <div
                key={index}
                className="group flex items-center bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 ease-out overflow-hidden relative"
              >
                <button
                  onClick={() => handleCopyClick(property.id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  title="Skopiuj do schowka"
                >
                  {copiedId === property.id ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                      />
                    </svg>
                  )}
                </button>

                <Link href={property.url} className="absolute bottom-3 right-3 text-sm text-gray-600 bg-white/80 backdrop-blur-sm px-2 py-1 z-10 flex items-center gap-1 transition duration-300 hover:font-bold hover:cursor-pointer">
                  Zobacz ofertę bezpośrednio na
                  <svg
                    width="117"
                    height="23"
                    viewBox="0 0 117 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-auto ml-1"
                  >
                    <path
                      d="M8.62999 4.75977C6.92427 4.75779 5.25629 5.2619 3.83721 6.20832C2.41813 7.15474 1.31174 8.50092 0.65807 10.0764C0.00440323 11.6519 -0.167136 13.3859 0.16515 15.059C0.497436 16.732 1.31858 18.2689 2.52471 19.475C3.73084 20.6812 5.26774 21.5023 6.94078 21.8346C8.61383 22.1669 10.3478 21.9953 11.9233 21.3417C13.4988 20.688 14.845 19.5816 15.7914 18.1625C16.7378 16.7435 17.242 15.0755 17.24 13.3698C17.24 11.0862 16.3329 8.89625 14.7182 7.28156C13.1035 5.66687 10.9135 4.75977 8.62999 4.75977ZM8.62999 17.8597C7.73404 17.8597 6.85822 17.5941 6.11327 17.0963C5.36832 16.5986 4.78768 15.891 4.44481 15.0633C4.10195 14.2355 4.01221 13.3247 4.187 12.446C4.36179 11.5673 4.79328 10.7601 5.42681 10.1266C6.06034 9.49306 6.86747 9.06158 7.7462 8.88679C8.62494 8.71199 9.53576 8.80173 10.3635 9.1446C11.1913 9.48746 11.8988 10.0681 12.3965 10.8131C12.8943 11.558 13.16 12.4338 13.16 13.3298C13.16 14.5312 12.6827 15.6834 11.8332 16.533C10.9836 17.3825 9.83142 17.8597 8.62999 17.8597Z"
                      fill="#1C2635"
                    />
                    <path
                      d="M25.56 1H21.19V4C21.19 4.34213 21.0541 4.67025 20.8121 4.91217C20.5702 5.15409 20.2421 5.28998 19.9 5.28998H18.73V8.76001H21.18V15.1C21.1234 16.4237 21.3661 17.7431 21.89 18.96C22.3449 19.8803 23.1307 20.5947 24.09 20.96C25.3485 21.4153 26.6824 21.6257 28.02 21.58H29.63V17.81H27.9C27.5884 17.8309 27.2758 17.7875 26.9816 17.6826C26.6875 17.5776 26.4181 17.4134 26.19 17.2C25.9748 16.9671 25.8096 16.6925 25.7047 16.3932C25.5998 16.0939 25.5574 15.7763 25.58 15.46V8.71997H29.58V5.25H25.58L25.56 1Z"
                      fill="#1C2635"
                    />
                    <path
                      d="M40.3 4.75977C38.5943 4.75779 36.9263 5.2619 35.5072 6.20832C34.0881 7.15474 32.9817 8.50092 32.3281 10.0764C31.6744 11.6519 31.5028 13.3859 31.8351 15.059C32.1674 16.732 32.9886 18.2689 34.1948 19.475C35.4009 20.6812 36.9377 21.5023 38.6108 21.8346C40.2838 22.1669 42.0178 21.9953 43.5933 21.3417C45.1688 20.688 46.515 19.5816 47.4614 18.1625C48.4078 16.7435 48.9119 15.0755 48.91 13.3698C48.91 11.0862 48.0029 8.89625 46.3882 7.28156C44.7735 5.66687 42.5835 4.75977 40.3 4.75977ZM40.3 17.8597C39.404 17.8597 38.5282 17.5941 37.7833 17.0963C37.0383 16.5986 36.4577 15.891 36.1148 15.0633C35.7719 14.2355 35.6823 13.3247 35.857 12.446C36.0318 11.5673 36.4633 10.7601 37.0968 10.1266C37.7303 9.49306 38.5375 9.06158 39.4162 8.88679C40.2949 8.71199 41.2058 8.80173 42.0336 9.1446C42.8613 9.48746 43.5688 10.0681 44.0665 10.8131C44.5643 11.558 44.83 12.4338 44.83 13.3298C44.83 14.5312 44.3527 15.6834 43.5032 16.533C42.6536 17.3825 41.5014 17.8597 40.3 17.8597Z"
                      fill="#1C2635"
                    />
                    <path
                      d="M64.26 0V7C63.6366 6.29116 62.8665 5.72634 62.0032 5.34473C61.1398 4.96312 60.2038 4.77382 59.26 4.78998C57.026 4.87349 54.9117 5.82168 53.3635 7.43445C51.8153 9.04721 50.9542 11.1984 50.962 13.434C50.9698 15.6696 51.8459 17.8147 53.4053 19.4166C54.9647 21.0186 57.0854 21.9521 59.32 22.02C60.3127 22.013 61.2915 21.7871 62.1869 21.3584C63.0822 20.9297 63.8721 20.3088 64.5 19.54L65.19 21.43H68.62V0H64.26ZM59.61 17.89C58.714 17.89 57.8382 17.6243 57.0933 17.1266C56.3483 16.6288 55.7677 15.9213 55.4248 15.0936C55.0819 14.2658 54.9923 13.355 55.167 12.4763C55.3418 11.5975 55.7733 10.7903 56.4068 10.1568C57.0403 9.52327 57.8475 9.09184 58.7262 8.91705C59.605 8.74226 60.5158 8.83194 61.3436 9.1748C62.1713 9.51767 62.8788 10.0983 63.3765 10.8433C63.8743 11.5882 64.14 12.464 64.14 13.36C64.14 14.5614 63.6627 15.7136 62.8132 16.5632C61.9636 17.4127 60.8114 17.89 59.61 17.89Z"
                      fill="#1C2635"
                    />
                    <path
                      d="M114.96 6.61012C116.199 8.12094 116.808 10.0516 116.66 12.0001V21.4002H112.26V12.7201C112.354 11.7207 112.088 10.7207 111.51 9.90015C111.253 9.55575 110.913 9.28294 110.52 9.10786C110.128 8.93277 109.698 8.86126 109.27 8.90015C108.801 8.87979 108.334 8.96539 107.903 9.15064C107.472 9.3359 107.088 9.61599 106.78 9.9701C106.109 10.8923 105.786 12.0226 105.87 13.1601V21.4101H101.47V12.7301C101.47 10.1801 100.47 8.90015 98.47 8.90015C98.0101 8.89115 97.554 8.98526 97.1352 9.17561C96.7164 9.36596 96.3456 9.6477 96.05 10.0001C95.3752 10.921 95.0492 12.0514 95.1299 13.1901V21.4401H90.73V5.06013H94.2499L94.93 6.93012C95.5 6.2481 96.2229 5.71019 97.04 5.36012C97.9022 4.99013 98.8317 4.80287 99.77 4.81013C100.81 4.78872 101.84 5.02216 102.77 5.49012C103.645 5.95197 104.378 6.64336 104.89 7.49012C105.51 6.63728 106.331 5.95037 107.28 5.49012C108.267 5.02132 109.347 4.78199 110.44 4.79011C111.291 4.74647 112.141 4.88441 112.934 5.19477C113.727 5.50513 114.445 5.98083 115.04 6.59016"
                      fill="#1C2635"
                    />
                    <path
                      d="M79.69 4.75977C77.9847 4.75977 76.3177 5.26558 74.8999 6.2132C73.4822 7.16082 72.3773 8.50764 71.7252 10.0833C71.0731 11.659 70.9029 13.3927 71.2363 15.0651C71.5697 16.7375 72.3917 18.2735 73.5982 19.4786C74.8048 20.6837 76.3417 21.5039 78.0144 21.8353C79.6872 22.1668 81.4207 21.9947 82.9956 21.3407C84.5706 20.6867 85.9161 19.5804 86.8621 18.1615C87.8081 16.7426 88.3119 15.0751 88.31 13.3698C88.31 12.2382 88.0869 11.1178 87.6536 10.0725C87.2203 9.02725 86.5852 8.07766 85.7846 7.27802C84.984 6.47838 84.0337 5.8444 82.9879 5.4123C81.9422 4.98019 80.8215 4.75846 79.69 4.75977Z"
                      fill="#3DD37A"
                    />
                  </svg>
                </Link>

                <div className="relative w-1/3 h-40 md:h-56 overflow-hidden">
                  <Link
                    href={`/nieruchomosc/${property.id}`}
                    className="block h-full w-full"
                  >
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/default-image.jpg";
                      }}
                    />
                  </Link>
                </div>
                <div className="flex flex-col p-4 w-2/3 gap-12 md:gap-20">
                  <h3 className="text-xl font-bold text-slate-700 line-clamp-2">
                    <Link href={`/nieruchomosc/${property.id}`}>
                      {property.title}
                    </Link>
                  </h3>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-lg font-bold text-[#028965]">
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
