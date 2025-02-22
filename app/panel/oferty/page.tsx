import AddOfferForm from "./AddOfferForm"
import OfferList from "../../components/OfferList"
import { getPropertyOffers } from "../../../lib/offerData"
import Carousel from "../../components/Carousel"
import Navbar2 from "@/app/components/Navbar2"

export const metadata = {
  title: "Pod Parasolem - Panel Admin",
  description: "Dostęp dla uprawnionych",
}

export default async function AddPropertyPage() {
  const offers = await getPropertyOffers()

  return (
    <div className="container mx-auto px-4 py-8">
      <Navbar2 />
      <div className="h-16"></div>
      <h1 className="text-3xl font-bold mb-8">Aktualne oferty</h1>
      <OfferList initialOffers={offers} />
      <h2 className="text-2xl font-bold my-8">Dodaj nową ofertę</h2>
      <AddOfferForm />
      <h2>Oferty</h2>
      <Carousel />
    </div>
  )
}

