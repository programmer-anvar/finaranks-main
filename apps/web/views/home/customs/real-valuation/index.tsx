"use client";
import { Typography } from '@finranks/design-system/components/typography'
import FairValue from './customs/fair-value';
import Model from './customs/model';

const RealValuation = ({ dictionary }: { dictionary: any }) => {
    return (
        <section id='real-valuation' className='app-container'>
            <div className="relative space-y-4">
                <div>
                    <div className='flex flex-col items-center justify-center w-full'>
                        <Typography variant="h1" align="center" className="text-center md:text-[32px] text-[24px] leading-[76px] font-bold!">{dictionary.realValuationTitle}</Typography>
                        <Typography
                            variant='body'
                            align="center"
                            color='secondary'
                            className="text-center md:text-[16px] text-[14px] leading-[24px] font-normal! max-w-lg">
                            {dictionary.realValuationSubtitle}
                        </Typography>
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-[58%_48%] gap-4 md:max-w-[75%] mx-auto'>
                    <Model dictionary={dictionary} />
                    < FairValue dictionary={dictionary} />
                </div>
            </div>
        </section>
    )
}

export default RealValuation