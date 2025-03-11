import Image from 'next/image';
import millenniumLogo from '../assets/tickers/millennium-dark.png';
import santanderLogo from '../assets/tickers/santander.png';
import sgbLogo from '../assets/tickers/sgb.png';
import drhouseLogo from '../assets/tickers/dr-house.png';

export const LogoTicker = () => {
    return (
        <div className='p-10 relative w-full border-b-2 border-dashed border-gray-300'>
            <div className='container mx-auto'>
                <div className='flex flex-col justify-center items-center'>
                <h1 className='text-3xl font-bold text-center pb-2 px-6'>Organizacje</h1>
                <h3 className="text-sm text-gray-400 mb-6">Dla których sporządzałam wyceny.</h3>
                </div>
                <div className='overflow-hidden'>
                    <div className='flex flex-col md:flex-row gap-8 lg:gap-[92px] justify-center items-center'>
                        <Image src={millenniumLogo} alt='Millennium Bank' className='ticker' />
                        <Image src={santanderLogo} alt='Santander Bank' className='ticker' />
                        <Image src={sgbLogo} alt='SGB Bank' className='ticker' />
                        <Image src={drhouseLogo} alt='Dr House' className='ticker' />
                    </div>
                </div>
                <div className="mb-6"></div>
            </div>
        </div>
    );
};
