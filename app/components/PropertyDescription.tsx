import { Card, CardContent } from "./ui/card"

interface PropertyDescriptionProps {
  description: string
}

export default function PropertyDescription({ description }: PropertyDescriptionProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Opis</h2>
        <div className="text-gray-700 space-y-4" dangerouslySetInnerHTML={{ __html: description }} />
      </CardContent>
    </Card>
  )
}

