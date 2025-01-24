import React from "react"
import { StatisticsCard } from "./ui/StatisticsCard"
import { Users, DollarSign, ShoppingCart, TrendingUp } from "lucide-react"

export default function StatisticsPage() {
  return (
    <div className="relative w-full p-8 border-t-2 border-b-2 border-dashed border-gray-300">
      <div className="container mx-auto">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Statystyki</h1>
          <h3 className="text-sm text-gray-400">Osiągnięte przez <span className="font-semibold">Nieruchomości pod parasolem</span></h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatisticsCard title="Total Users" value={15423} icon={<Users className="h-4 w-4 text-muted-foreground" />} />
          <StatisticsCard
            title="Revenue"
            value={54321}
            prefix="$"
            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          />
          <StatisticsCard title="Orders" value={1234} icon={<ShoppingCart className="h-4 w-4 text-muted-foreground" />} />
          <StatisticsCard
            title="Growth"
            value={27}
            suffix="%"
            icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          />
        </div>
        <div className="mb-6"></div>
      </div>
    </div>


  )
}

