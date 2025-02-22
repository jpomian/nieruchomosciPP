import { NextResponse } from "next/server"
import { getPropertyOffers, addPropertyOffer, deletePropertyOffer } from "../../../lib/offerData"

export async function GET() {
  try {
    const offers = await getPropertyOffers()
    if(!offers) {
        return console.log("Brak ofert. Dodaj nową.")
    }
    return NextResponse.json(offers)
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch offers' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  const newOffer = await request.json()
  await addPropertyOffer(newOffer)
  return NextResponse.json({ message: "Offer added successfully" }, { status: 201 })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "Offer ID is required" }, { status: 400 })
  }

  try {
    await deletePropertyOffer(id)
    return NextResponse.json({ message: "Offer deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting offer:", error)
    return NextResponse.json({ error: "Failed to delete offer" }, { status: 500 })
  }
}

