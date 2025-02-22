import * as cheerio from "cheerio"

interface Characteristic {
  key: string
  value: string
  label: string
  localizedValue: string
  currency: string
  suffix: string
  __typename: string
}

export interface ProcessedCharacteristic {
  displayName: string
  value: string
  rawValue: string
  unit: string | null
}

const CHARACTERISTIC_MAPPER: {
  [key: string]: { newKey: string; displayName: string }
} = {
  price: { newKey: "price", displayName: "Cena nieruchomości" },
  m: { newKey: "area", displayName: "Powierzchnia" },
  price_per_m: { newKey: "pricePerMeter", displayName: "Cena za 1 m²" },
  rooms_num: { newKey: "rooms", displayName: "Liczba pokoi" },
  market: { newKey: "marketType", displayName: "Rodzaj rynku" },
  building_type: { newKey: "buildingType", displayName: "Typ zabudowy" },
  floor_no: { newKey: "floor", displayName: "Piętro" },
  building_floors_num: { newKey: "totalFloors", displayName: "Łączna ilość pięter" },
  building_material: { newKey: "material", displayName: "Budulec" },
  windows_type: { newKey: "windows", displayName: "Rodzaj okien" },
  heating: { newKey: "heating", displayName: "Ogrzewanie" },
  build_year: { newKey: "yearBuilt", displayName: "Rok budowy" },
  construction_status: { newKey: "condition", displayName: "Stan nieruchomości" },
  rent: { newKey: "monthlyFee", displayName: "Czynsz" },
  building_ownership: { newKey: "ownership", displayName: "Przynależność" },
}

export async function getData({url} : {url: string}): Promise<string> {
  const res = await fetch(url, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch.")
  }

  return res.text()
}

export async function extractScriptContent(html: string): Promise<string | null> {
  const $ = cheerio.load(html)
  const scriptContent = $("#__NEXT_DATA__").html()

  if (scriptContent) {
    try {
      const jsonContent = JSON.parse(scriptContent.trim())
      const titleData = jsonContent.props?.pageProps?.ad?.title

      if (!titleData) {
        console.error("Title not found in the JSON structure")
        return null
      }

      // Process title
      let title: string
      if (typeof titleData === "string") {
        title = titleData
      } else if (Array.isArray(titleData)) {
        title = titleData.join("")
      } else {
        // Handle object case
        const chars = Object.keys(titleData)
          .map(Number)
          .sort((a, b) => a - b)
          .map((key) => titleData[key])
        title = chars.join("")
      }

      // Get other data
      const targetData = jsonContent.props.pageProps.ad.target || {}
      const characteristics = jsonContent.props.pageProps.ad.characteristics || []
      const images = jsonContent.props.pageProps.ad.images || []
      const description = jsonContent.props.pageProps.ad.description || ""

      // Create merged object with proper typing
      const mergedData = {
        title,
        ...targetData,
        characteristics: processCharacteristics(characteristics),
        images,
        description,
      }

      return JSON.stringify(mergedData, null, 2)
    } catch (error) {
      console.error("Error processing content:", error)
      return null
    }
  }
  return null
}

export function processCharacteristics(characteristics: Characteristic[]) {
  return characteristics.reduce(
    (acc, char) => {
      const mapper = CHARACTERISTIC_MAPPER[char.key]
      if (mapper) {
        acc[mapper.newKey] = {
          displayName: mapper.displayName,
          value: char.localizedValue,
          rawValue: char.value,
          unit: char.suffix || null,
        }
      }
      return acc
    },
    {} as { [key: string]: ProcessedCharacteristic },
  )
}

