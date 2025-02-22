import { Suspense } from "react";
import ImageGallery from "../../components/ImageGallery";
import HouseInfo from "../../components/HouseInfo";
import SellerInfo from "../../components/SellerInfo";
import PropertyDescription from "../../components/PropertyDescription";
import { getData, extractScriptContent } from "@/lib/data-fetcher";
import { getPropertyOffers } from '@/lib/offerData';
import OtoButton from "../../components/ui/otobutton";
import Navbar2 from "@/app/components/Navbar2";


export default async function PropertyOffer({ params }: { params: Promise<{ id: string }> }) {
  const offers = await getPropertyOffers();

  const offer = await offers.find(async (o) => o.id === (await params).id);

  if (!offer) {
    return <div>Offer not found</div>;
  }

  const html = await getData({ url: offer.url });
  const metadata = await extractScriptContent(html);

  if (!metadata) {
    return <div>No data found</div>;
  }

  const propertyData = JSON.parse(metadata);

  return (
    <div className="min-h-screen bg-gray-100">
        <Navbar2 />

      <main className="container mx-auto px-4 py-8 mt-16">
        <h1 className="text-3xl font-bold text-center mb-2">Oglądasz Nieruchomość</h1>
        <h1 className="text-lg text-center text-gray-500 mb-8">
          {propertyData.title}
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Suspense fallback={<div>Ładowanie zdjęć...</div>}>
              <ImageGallery images={propertyData.images} />
            </Suspense>
            <PropertyDescription description={propertyData.description} />
          </div>
          <div>
            <HouseInfo
              characteristics={propertyData.characteristics}
            />
            <SellerInfo />
          </div>
        </div>
      </main>
      <div className="flex items-center justify-center">
        <OtoButton url={offer.url} />
      </div>
    </div>
  );
}
