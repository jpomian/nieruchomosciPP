import Link from "next/link"
import Image from "next/image"
import Logo from "../assets/logo-transparent.png"

export default function Navbar2() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray/0 backdrop-blur-md transition-all duration-300">
      <div className="py-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-center">
            <Link href="/" className="flex items-center group">
              <Image src={Logo || "/placeholder.svg"} alt="Nieruchomości pod parasolem" height={90} width={90} />
              <span className="text-xl font-bold text-[#028965] ml-4 group-hover:text-zinc-800/90 transition-colors duration-300">
                Nieruchomości pod parasolem
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
