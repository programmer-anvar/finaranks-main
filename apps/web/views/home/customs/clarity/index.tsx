"use client"
import { Typography } from '@finranks/design-system/components/typography';


const Clarity = ({ dictionary }: { dictionary: any }) => {
    console.log('d', dictionary)
    return (
        <section className='app-container'>
            <img src="/images/home-center-lines.svg" alt="" className='absolute top-0 left-0  w-full opacity-30' />
            <div className="relative">
                <img className="home-banner__bg -translate-y-18" src="/images/banner-bg.png" alt="" />
                <div className="absolute md:top-[150px] top-[-335px] left-0 right-0 w-full space-y-5">
                    <div className='flex flex-col items-center justify-center w-full'>
                        <Typography variant="h1" align="center" className="text-white! text-center md:text-[32px] text-[24px] leading-[76px] font-bold!">{dictionary.featureOneTitle}</Typography>
                        <Typography
                            variant='body'
                            align="center"
                            color='secondary'
                            className="home-box__text text-center md:text-[16px] text-[12px] leading-[24px] font-normal! max-w-2xl">
                            {dictionary.featureOneDescription}
                        </Typography>
                    </div>
                    <div className='w-full h-full'>
                        <div className="relative home-banner__img">
                            <img src="/images/home-banner.png" className='w-full object-cover' alt="" />
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Clarity