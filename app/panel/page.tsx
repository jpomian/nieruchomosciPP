import { ScrollText, HousePlus } from "lucide-react";
import Link from 'next/link'
import Navbar2 from "../components/Navbar2";

export default function Panel() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[70vh]">
      <Navbar2 />
      <div className="w-full text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Strefa Administratora</h1>
        <p className="text-lg text-gray-600">Nieruchomości pod parasolem</p>
      </div>
      <div className="flex flex-col gap-8 sm:flex-row">
        <Link
          href={'/panel/oferty'}
          className="
            flex flex-col items-center justify-center
            gap-6 p-8
            h-52 w-56
            text-2xl
            border border-gray-300 rounded-lg
            bg-white hover:bg-gray-50
            transition-all hover:scale-105
            shadow-sm hover:shadow-md
            focus:outline-none focus:ring-2 focus:ring-green-500
          "
        >
          <HousePlus size={64} className="text-green-700" />
          <span>Oferty</span>
        </Link>
        
        <Link
          href={'/panel/opinie'}
          className="
            flex flex-col items-center justify-center
            gap-6 p-8
            h-52 w-56
            text-2xl
            border border-gray-300 rounded-lg
            bg-white hover:bg-gray-50
            transition-all hover:scale-105
            shadow-sm hover:shadow-md
            focus:outline-none focus:ring-2 focus:ring-green-500
          "
        >
          <ScrollText size={64} className="text-gray-600" />
          <span>Opinie</span>
        </Link>
      </div>
    </div>
  );
}