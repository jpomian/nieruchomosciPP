"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import Logo from "../assets/logo-transparent.png"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState("")
  const router = useRouter()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      router.push(`/#${id}`)
    }
    setIsMenuOpen(false)
  }

  useEffect(() => {
    const handleScrollUpdate = () => {
      const scrollPosition = window.scrollY
      const sections = ["ja", "faq", "cennik", "oferty"]

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop - 100 && scrollPosition < offsetTop + offsetHeight - 100) {
            setActiveLink(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScrollUpdate)
    return () => window.removeEventListener("scroll", handleScrollUpdate)
  }, [])

  useEffect(() => {
    const hash = window.location.hash.replace("#", "")
    if (hash) {
      const element = document.getElementById(hash)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray/10 backdrop-blur-md transition-all duration-300">
      <div className="py-8">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <Link href="/" onClick={(e) => handleScroll(e, "ja")}>
              <Image src={Logo || "/placeholder.svg"} alt="Nieruchomości pod parasolem" height={80} width={80} className="ml-4 md:ml-8" />
            </Link>
            <nav className="hidden md:flex gap-6 text-black/60 items-center pr-4 md:pr-8">
              <Link
                href="#ja"
                onClick={(e) => handleScroll(e, "ja")}
                className={`anchor ${activeLink === "ja" ? "text-[#028965]" : ""}`}
              >
                O mnie
              </Link>
              <Link
                href="#faq"
                onClick={(e) => handleScroll(e, "faq")}
                className={`anchor ${activeLink === "faq" ? "text-[#028965]" : ""}`}
              >
                Najczęściej zadawane pytania
              </Link>

              <Link
                href="#cennik"
                onClick={(e) => handleScroll(e, "cennik")}
                className={`anchor ${activeLink === "cennik" ? "text-[#028965]" : ""}`}
              >
                Cennik
              </Link>
              <Link
                href="#oferty"
                onClick={(e) => handleScroll(e, "oferty")}
                className={`anchor ${activeLink === "oferty" ? "text-[#028965]" : ""}`}
              >
                Oferty
              </Link>

              <button className="primary-button px-5 py-2" onClick={() => { router.push('/kontakt') }}>Skontaktuj się</button>
            </nav>
            <button className="md:hidden p-2 text-black/60 anchor" onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div
        className={`md:hidden bg-gray/20 backdrop-blur-md overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-screen" : "max-h-0"
          }`}
      >
        <nav className="flex flex-col gap-4 p-4">
        <Link
                href="#ja"
                onClick={(e) => handleScroll(e, "ja")}
                className={`text-black/60 anchor ${activeLink === "ja" ? "text-[#028965]" : ""}`}
              >
                O mnie
              </Link>
              <Link
                href="#faq"
                onClick={(e) => handleScroll(e, "faq")}
                className={`text-black/60 anchor ${activeLink === "faq" ? "text-[#028965]" : ""}`}
              >
                Najczęściej zadawane pytania
              </Link>

              <Link
                href="#cennik"
                onClick={(e) => handleScroll(e, "cennik")}
                className={`text-black/60 anchor ${activeLink === "cennik" ? "text-[#028965]" : ""}`}
              >
                Cennik
              </Link>
              <Link
                href="#oferty"
                onClick={(e) => handleScroll(e, "oferty")}
                className={`text-black/60 anchor ${activeLink === "oferty" ? "text-[#028965]" : ""}`}
              >
                Oferty
              </Link>
          <button className="bg-[#028965] text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight hover:bg-[#028965] transition-colors duration-200">
            Skontaktuj się
          </button>
        </nav>
      </div>
    </header>
  )
}

