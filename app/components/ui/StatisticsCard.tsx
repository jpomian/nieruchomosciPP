import type React from "react"
import { GrowingNumber } from "./GrowingNumbers"
import { Card, CardContent, CardHeader, CardTitle } from "./card"

interface StatisticsCardProps {
  title: string
  value: number
  prefix?: string
  suffix?: string
  icon: React.ReactNode
}

export const StatisticsCard: React.FC<StatisticsCardProps> = ({ title, value, prefix, suffix, icon }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <GrowingNumber end={value} prefix={prefix} suffix={suffix} />
      </CardContent>
    </Card>
  )
}

