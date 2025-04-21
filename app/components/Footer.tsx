import { Terminal } from "lucide-react";
import Logo from '../assets/logo-transparent.png';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="py-12 sm:py-16 bg-green-100/20 border-t-4 border-dashed border-gray-300">
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
                        <div className="text-gray-700 font-semibold">E-mail</div>
                        <div className="text-gray-700">elzbieta.pomianowska@wp.pl</div>
                    </div>
                    <div>
                        <div className="text-gray-700 font-semibold">Adres</div>
                        <div className="text-gray-700">Poznań, ul. Stróżyńskiego</div>
                    </div>
                </div>
                <hr className="my-6 border-t border-gray-300" />
                <div className="flex flex-col sm:flex-row justify-center text-gray-500 text-sm pt-2">
                    Twórcą strony jest&nbsp;
                    <Terminal size={16} className="mt-1 mr-1 hidden md:block" /> <a href="https://jpomian.pl" className='anchor mr-1'>Jędrzej Pomianowski.</a>
                    Wszelkie prawa zastrzeżone &copy; 2025.
                    <Link href='/panel/' className="md:ml-1"> Panel</Link> 
                </div>
            </div>
        </footer>
    );
};

export default Footer;
