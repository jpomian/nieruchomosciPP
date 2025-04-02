"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar2 from "../components/Navbar2";

export default function ThankYou() {
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Redirect when countdown reaches 0
    if (countdown === 0) {
      router.push("/");
    }
  }, [countdown, router]);

  return (
    <div className="min-h-screen bg-background flex flex-col bg-gray-300">
      <Navbar2 />
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12">
        <h1 className="text-4xl text-green-600 md:text-6xl font-bold text-center mb-12">
          Dziękuję!
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground text-center max-w-3xl mb-4">
          Twoje zgłoszenie zostało pomyślnie wysłane.
        </p>
        <p className="text-lg text-gray-600 md:text-xl text-muted-foreground text-center max-w-3xl mb-12">
          Odezwę się gdy tylko je przeczytam.
        </p>
        <div className="w-full max-w-2xl">
          <p className="text-lg text-muted-foreground text-center mb-4">
            Zostaniesz przekierowany do strony głównej za{" "}
            <span className="font-bold text-primary">{countdown}</span>{" "}
            sekundy...
          </p>
          <div className="h-3 w-full overflow-hidden bg-green-600 rounded-full bg-muted">
            <div
              className="h-full bg-primary transition-all duration-1000 ease-in-out"
              style={{ width: `${(countdown / 5) * 100}%` }}
            />
          </div>
        </div>
        <Link href="/">
          <p className="mt-4 text-green-600 hover:text-green-500 hover:underline">
            Kliknij tu, aby przenieść się samodzielnie
          </p>
        </Link>
      </div>
    </div>
  );
}
