import { Home, BrickWall, Box, BedDouble, SquareRadical, Heater } from "lucide-react"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { ReactNode } from 'react'

interface ProcessedCharacteristic {
  displayName: string
  value: string
  rawValue: string
  unit: string | null
}

interface HouseInfoProps {
  characteristics: {
    [key: string]: ProcessedCharacteristic
  }
}

interface DetailItemProps {
  icon: ReactNode;
  label: string;
  value: string;
}

export default function HouseInfo({ characteristics }: HouseInfoProps) {
  const { price, area, rooms, pricePerMeter, buildingType, heating } = characteristics

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Informacje główne</h2>
        <div className="grid grid-cols-2 gap-4">
          <DetailItem icon={<Home />} label={price.displayName} value={price.value} />
          <DetailItem icon={<BedDouble />} label={rooms.displayName} value={rooms.value} />
          <DetailItem icon={<Box />} label={area.displayName} value={area.value} />
          <DetailItem icon={<Heater />} label={heating.displayName} value={heating.value} />
          <DetailItem icon={<SquareRadical />} label={pricePerMeter.displayName} value={pricePerMeter.value} />
          <DetailItem icon={<BrickWall />} label={buildingType.displayName} value={buildingType.value} />
        </div>
        <div className="mt-6">
          <Badge variant="secondary" className="w-full justify-center text-lg">
            Dostępne na sprzedaż!
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

function DetailItem({ icon, label, value } : DetailItemProps) {
  return (
    <div className="flex items-center">
      <div className="text-blue-900 mr-2">{icon}</div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  )
}

