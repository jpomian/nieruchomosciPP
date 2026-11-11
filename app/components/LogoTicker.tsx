import Image, { type StaticImageData } from 'next/image';
import millenniumLogo from '../assets/tickers/millennium-dark.png';
import santanderLogo from '../assets/tickers/santander.png';
import sgbLogo from '../assets/tickers/sgb.png';
import drhouseLogo from '../assets/tickers/dr-house.png';

const logos: { src: StaticImageData; alt: string }[] = [
    { src: millenniumLogo, alt: 'Millennium Bank' },
    { src: santanderLogo, alt: 'Santander Bank' },
    { src: sgbLogo, alt: 'SGB Bank' },
    { src: drhouseLogo, alt: 'Dr House' },
];

// Two repetitions per half keep each half wider than the widest container,
// and the two identical halves make the -50% loop seamless.
const half = [...logos, ...logos];

export const LogoTicker = () => {
    return (
        <div className='p-10 relative w-full border-b-2 border-dashed border-gray-300'>
            <div className='container mx-auto'>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-3xl font-bold text-center text-green-900 pb-2 px-6'>Organizacje</h1>
                    <h3 className="text-sm text-gray-400 mb-6">Dla których sporządzałam wyceny.</h3>
                </div>

                <div className='relative'>
                    <div className='overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]'>
                        <div className='flex w-max animate-marquee will-change-transform motion-reduce:animate-none'>
                            {[0, 1].map((copy) => (
                                <div key={copy} className='flex shrink-0' aria-hidden={copy === 1}>
                                    {half.map((logo, index) => (
                                        <div
                                            key={`${logo.alt}-${index}`}
                                            className='shrink-0 mr-16 md:mr-24 lg:mr-40'
                                            aria-hidden={copy === 1 || index >= logos.length}
                                        >
                                            <Image src={logo.src} alt={logo.alt} className='ticker' />
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Fade + blur at the edges so logos dissolve into the sides */}
                    <div className='pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 backdrop-blur-[6px] [mask-image:linear-gradient(to_right,black,transparent)]' />
                    <div className='pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 backdrop-blur-[6px] [mask-image:linear-gradient(to_left,black,transparent)]' />
                </div>

                <div className="mb-6"></div>
            </div>
        </div>
    );
};
