import { Terminal } from "lucide-react";
import Logo from '../assets/logo-transparent.png';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="bg-gray-100 py-12 sm:py-16">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="flex items-center justify-center mb-6">
                    <Image src={Logo} alt='Nieruchomości Pod Parasolem' width={70} height={70} className="mr-4" />
                    <div className="text-gray-700 text-xl font-bold">
                        Nieruchomości pod parasolem
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div>
                        <div className="text-gray-700 font-semibold">Telefon</div>
                        <div className="text-gray-700">+48 782 014 827</div>
                    </div>
                    <div>
                        <div className="text-gray-700 font-semibold">E-Mail</div>
                        <div className="text-gray-700">elzbieta.pomianowska@wp.pl</div>
                    </div>
                    <div>
                        <div className="text-gray-700 font-semibold">Adres</div>
                        <div className="text-gray-700">Poznań, ul. Stróżyńskiego</div>
                    </div>
                </div>
                <hr className="my-8 border-t border-gray-300" />
                <div className="flex flex-col sm:flex-row justify-center text-gray-500 text-sm pt-2">
                    Twórcą strony jest&nbsp;
                    <Terminal size={16} className="mt-1 hidden md:block" /> <a href="https://github.com/jpomian" className='anchor'>Jędrzej Pomianowski</a>.
                    Wszelkie prawa zastrzeżone &copy; 2025.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
