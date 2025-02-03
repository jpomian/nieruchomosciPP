import { Card, CardHeader, CardContent } from "./ui/card"
import Logo from '../assets/logo-transparent.png';
import Image from 'next/image'

export default function PricingComponent() {
    const pricingData = [
        { service: "Działka niezabudowana", price: "od 500 zł" },
        { service: "Lokal mieszkalny", price: "od 600 zł" },
        { service: "Dom jednorodzinny gotowy", price: "od 750 zł" },
        { service: "Dom jednorodzinny w budowie", price: "od 800 zł" },
        { service: "Nieruchomości komercyjne", price: "Ustalane indywidualnie" },
    ]

    return (
        <div id="cennik" className="p-12 relative w-full border-t-2 border-b-2 border-dashed border-gray-300">
            <Card className="w-full max-w-[1168px] mx-auto bg-sky-50 shadow-lg relative">
                <div className="absolute top-4 right-4">
                    <Image 
                        src={Logo} 
                        alt="Company Logo" 
                        width={80}
                        height={40}
                    />
                </div>
                <CardHeader>
                    <h2 className="text-4xl font-bold text-center text-sky-800">Cennik</h2>
                    <h3 className="text-sm text-gray-400 text-center mt-2">Dla poszczególnych rodzajów wycen.</h3>

                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full leading-8">
                            <tbody>
                                {pricingData.map((item, index) => (
                                    <tr
                                        key={index}
                                        className={`border-b border-sky-200 hover:bg-sky-100 transition-colors ${index === pricingData.length - 1 ? "border-b-0" : ""
                                            }`}
                                    >
                                        <td className="py-4 px-6 text-left text-sky-800">{item.service}</td>
                                        <td className="py-4 px-6 text-right font-semibold text-sky-600">{item.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-center items-center mt-4">
                        <p className="text-sm text-gray-400">W przypadku nieruchomości nieokreślonych w powyższym cenniku lub innych przypadków, zapraszam do <a href="/kontakt" className="underline text-gray-600">skontaktowania</a> się ze Mną 😚</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}