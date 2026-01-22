"use client";
import { BorderBeam } from '@finranks/design-system/components/border-beam';
import { Card } from '@finranks/design-system/components/card';
import { GenericGaugeChart } from '@finranks/design-system/components/charts';
import { calcFairPercent } from '@finranks/design-system/components/charts/gauge';
import { Typography } from '@finranks/design-system/components/typography'
import React, { useEffect, useState } from 'react';


const FairValue = ({ dictionary }: { dictionary: any }) => {
    const [stockPrice, setStockPrice] = useState(1);
    const fairValue = 3

    useEffect(() => {
        const interval = setInterval(() => {
            const randomNumber = Math.floor(Math.random() * 5) + 1;
            setStockPrice(randomNumber);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const percent = calcFairPercent({ fairValue, stockPrice })
    return (
        <Card className='relative p-4 md:p-6 overflow-hidden'>
            <div className='flex flex-col items-center'>
                <Typography variant="body" color="secondary" className='text-[18px] md:text-inherit'>{dictionary.fairValueCardTitle}</Typography>
                <Typography variant="body" className='text-md font-bold!'>${fairValue}</Typography>
                <div style={{ marginBottom: 10 }}>
                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.13397 0.5C7.51887 -0.166666 8.48112 -0.166667 8.86602 0.5L15.7942 12.5C16.1791 13.1667 15.698 14 14.9282 14L1.0718 14C0.301996 14 -0.179129 13.1667 0.205771 12.5L7.13397 0.5Z" fill="#746FF2" />
                    </svg>
                </div>
            </div>
            <GenericGaugeChart hideText percent={percent} />
            <div className='flex items-center justify-between'>
                <span style={{ opacity: 0.6, fontSize: 12 }}>{dictionary.undervaluedLabel}</span>
                <span style={{ opacity: 0.6, fontSize: 12 }}>{dictionary.fairlyPricedLabel}</span>
                <span style={{ opacity: 0.6, fontSize: 12 }}>{dictionary.overvaluedLabel}</span>
            </div>
            <div className='flex justify-center'>
                <Typography variant="body" className='text-md font-bold!'>${stockPrice}</Typography>
            </div>
            <div className='mt-10'>
                <Typography variant="h3" className="text-center text-[18px] md:text-[22ox] leading-[76px] font-bold!">{dictionary.fairValueCardTitle}</Typography>
                <div className='home-card__subtext text-[14px] md:text-inherit mb-0'>
                    {dictionary.fairValueCardDescription}
                </div>
            </div>
            <BorderBeam colorFrom="rgba(158, 61, 255, 0.70)"
                colorTo="rgba(158, 61, 255, 0.50)" borderWidth={1.8} duration={8} size={400} className="rounded-full" />
        </Card>
    )
}

export default FairValue