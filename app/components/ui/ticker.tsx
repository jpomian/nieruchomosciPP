import type React from "react"
import Image, { type StaticImageData } from "next/image"

interface Company {
  name: string
  logo: StaticImageData
}

interface CompanyTickerProps {
  companies: Company[]
}

const CompanyTicker: React.FC<CompanyTickerProps> = ({ companies }) => {
  return (
    <div className="relative overflow-hidden bg-gray-100 py-10">
      <div className="flex animate-marquee whitespace-nowrap">
        {companies.concat(companies).map((company, index) => (
          <div key={index} className="mx-4 flex items-center justify-center">
            <Image
              src={company.logo || "/placeholder.svg"}
              alt={`${company.name} logo`}
              width={100}
              height={50}
              className="max-w-none"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CompanyTicker

