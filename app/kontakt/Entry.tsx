import Link from "next/link"
import { ChevronDown } from "lucide-react"

export default function CTAContact() {
  return (
    <section className="w-full py-24 md:py-24 lg:py-32 bg-gradient-to-b from-green-100 to-gray-200">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-200/50 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-xl"></div>
        <div className="absolute top-3/4 left-1/2 w-48 h-48 bg-gray-600/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/2 right-1/3 w-72 h-72 bg-green-600/10 rounded-full blur-2xl"></div>
      </div>
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center space-y-8 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-sky-900">
            Chcesz się ze mną skonsultować?
          </h2>
          <p className="max-w-[600px] text-[#028965] md:text-xl dark:text-sky-200">
            Napisz do mnie maila, zadzwoń lub wypełnij formularz, a z pewnością się do Ciebie odezwę.
          </p>
          <div className="">
          <Link
            href="#formularz"
            className="inline-flex h-11 items-center justify-center rounded-md bg-[#028965] border border-solid border-amber-400 px-8 text-sm font-medium text-white transition-colors hover:bg-green-700/40 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 group"
          >
            Wypełnij formularz
            <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
          </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

