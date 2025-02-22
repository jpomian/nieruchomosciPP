import fs from "fs/promises"
import path from "path"

interface offerData {
    id: string,
    url: string,
}

const dataFilePath = path.join(process.cwd(), "data", "offers.json")

export async function getPropertyOffers(): Promise<offerData[]> {
  try {
    const data = await fs.readFile(dataFilePath, "utf8")
    if(!data) {
        return []
    }
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading property data:", error)
    return []
  }
}

export async function getPropertyOffer(id: string): Promise<offerData | undefined> {
  const offers = await getPropertyOffers()
  return offers.find((offer) => offer.id === id)
}

export async function addPropertyOffer(offer: Omit<offerData, "id">): Promise<void> {
  const offers = await getPropertyOffers()
  const newOffer = {
    ...offer,
    id: Date.now().toString(),
  }
  offers.push(newOffer)
  await fs.writeFile(dataFilePath, JSON.stringify(offers, null, 2))
}

export async function deletePropertyOffer(id: string): Promise<void> {
  const offers = await getPropertyOffers()
  const updatedOffers = offers.filter((offer) => offer.id !== id)
  await fs.writeFile(dataFilePath, JSON.stringify(updatedOffers, null, 2))
}