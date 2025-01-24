import Image from 'next/image';
import millenniumLogo from '../assets/tickers/millennium-dark.png';
import santanderLogo from '../assets/tickers/santander.png';
import sgbLogo from '../assets/tickers/sgb.png';
import drhouseLogo from '../assets/tickers/dr-house.png';

export const LogoTicker = () => {
    return (
        <div className='p-8 relative w-full border-t-2 border-b-2 border-dashed border-gray-300'>
            <div className='container mx-auto'>
                <h1 className='text-3xl font-bold text-center mb-12'>Partnerzy</h1>
                <div className='overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]'>
                    <div className='flex gap-[96px] justify-center items-center'>
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
