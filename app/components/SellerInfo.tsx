import Image from "next/image"
import { Phone, Mail } from "lucide-react"
import { Card, CardContent } from "./ui/card"
import Profile from '../assets/photo-squared.png'
// import { Separator } from "./ui/separator"

export default function SellerInfo() {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Informacje o pośredniku</h2>
        <div className="flex items-center space-x-4">
          <div className="relative w-16 h-16">
            <Image
              src={Profile}
              alt="Seller's photo"
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">Elżbieta Pomianowska-Koleńska</h3>
            <p className="text-sm text-muted-foreground">Pośrednik nieruchomości</p>
          </div>
        </div>
        {/* <Separator className="my-4" /> */}
        <div className="space-y-4 mt-4">
          <div className="flex items-center">
            <Phone className="w-5 h-5 text-green-700 mr-2" />
            <p className="text-gray-700">782 014 827</p>
          </div>
          <div className="flex items-center">
            <Mail className="w-5 h-5 text-green-700 mr-2" />
            <p className="text-gray-700">elzbieta.pomianowska@wp.pl</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

