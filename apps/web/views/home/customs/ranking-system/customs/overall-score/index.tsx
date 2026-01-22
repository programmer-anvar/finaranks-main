import { BorderBeam } from '@finranks/design-system/components/border-beam';
import { Card } from '@finranks/design-system/components/card';
import { Typography } from '@finranks/design-system/components/typography'
import React from 'react';



const OverallScore = ({ dictionary }: { dictionary: any }) => {
    const metricData = [
        {
            iconPath: "/images/homeIcon1.svg",
            subtitle: dictionary.financialStrengthTitle,
            text: dictionary.financialStrengthDesc,
        },
        {
            iconPath: "/images/homeIcon2.svg",
            subtitle: dictionary.profitabilityTitle,
            text: dictionary.profitabilityDesc,
        },
        {
            iconPath: "/images/homeIcon3.svg",
            subtitle: dictionary.effectivenessTitle,
            text: dictionary.effectivenessDesc,
        },
        {
            iconPath: "/images/homeIcon4.svg",
            subtitle: dictionary.growthTitle,
            text: dictionary.growthDesc,
        },
        {
            iconPath: "/images/homeIcon1.svg",
            subtitle: dictionary.forecastTitle,
            text: dictionary.forecastDesc,
        },
        {
            iconPath: "/images/homeIcon2.svg",
            subtitle: dictionary.valuationTitle,
            text: dictionary.valuationDesc,
        },
        {
            iconPath: "/images/homeIcon3.svg",
            subtitle: dictionary.dividendTitle,
            text: dictionary.dividendDesc,
        },
        {
            iconPath: "/images/homeIcon4.svg",
            subtitle: dictionary.economicMoatTitle,
            text: dictionary.economicMoatDesc,
        },
    ];
    return (
        <Card className='space-y-6 relative p-4 md:p-6 overflow-hidden'>
            <Typography variant="h3" className='text-[18px] md:text-inherit'>{dictionary.categoriesTitle}</Typography>
            <div className='grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-6 pb-3 md:pb-0'>
                {
                    metricData?.map((e) => {
                        return (
                            <div key={e.text} className="grid grid-cols-[35px_auto] gap-4 items-start relative">
                                <div className="size-10! bg_gradient rounded-md flex items-center justify-center mt-1">
                                    <img src={e.iconPath} alt="" className='size-5' />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <Typography variant="body" className='text-base' color="primary">{e.subtitle}</Typography>
                                    <Typography variant="small" className='text-sm' color="secondary" truncate={{ lines: 2 }}>{e.text}</Typography>
                                </div>
                                <span className="absolute w-full h-px bg-muted-foreground/15 -bottom-3"></span>
                            </div>
                        )
                    })
                }
            </div>
            <BorderBeam colorFrom="rgba(158, 61, 255, 0.70)"
                colorTo="rgba(158, 61, 255, 0.50)" borderWidth={1.8} duration={8} size={400} className="rounded-full" />
        </Card>
    )
}

export default OverallScore