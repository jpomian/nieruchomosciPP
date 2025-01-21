'use client'

import { useState } from "react";
import Link from 'next/link';
import Image from "next/image";
import Logo from "../assets/logo-transparent.png";
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md transition-all duration-300">
      <div className="py-8">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <Link href ='/'>
            <Image
              src={Logo}
              alt="Saas Logo"
              height={80}
              width={80}
              className="ml-4 md:ml-8"
            />            
            </Link>
            <nav className="hidden md:flex gap-6 text-black/60 items-center pr-4 md:pr-8">
              <a href="#" className="anchor">O mnie</a>
              <a href="#" className="anchor">Najczęściej zadawane pytania</a>
              <a href="#" className="anchor">Zakres usług</a>
              <a href="#" className="anchor">Opinie</a>
              <button className="primary-button px-5 py-2">
                Skontaktuj się
              </button>
            </nav>
            <button
              className="md:hidden p-2 text-black/60 anchor"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div
        className={`md:hidden bg-white/95 backdrop-blur-md overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col gap-4 p-4">
          <a href="#" className="text-black/60 anchor">O mnie</a>
          <a href="#" className="text-black/60 anchor">Najczęściej zadawane pytania</a>
          <a href="#" className="text-black/60 anchor">Zakres usług</a>
          <a href="#" className="text-black/60 anchor">Opinie</a>
          <button className="bg-blue-400 text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight hover:bg-blue-500 transition-colors duration-200">
            Skontaktuj się
          </button>
        </nav>
      </div>
    </header>
  );
}

