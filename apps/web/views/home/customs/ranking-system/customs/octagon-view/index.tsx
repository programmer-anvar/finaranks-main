"use client"
import { Card } from '@finranks/design-system/components/card';
import { Typography } from '@finranks/design-system/components/typography';
import { ResponsiveRadar } from '@nivo/radar';
import { useMediaQuery } from '@uidotdev/usehooks';
import { useEffect, useMemo, useState } from 'react';
import { BorderBeam } from '@finranks/design-system/components/border-beam';

const OctagonView = ({ dictionary }: { dictionary: any }) => {
    const dic = dictionary?.homePage?.rankingSection;
    
    const CATEGORIES = [
        dic?.financialStrengthTitle,
        dic?.profitabilityTitle,
        dic?.effectivenessTitle,
        dic?.growthTitle,
        dic?.forecastTitle,
        dic?.valuationTitle,
        dic?.dividendTitle,
        dic?.economicMoatTitle,
    ];

    const generateData = () => [
        {
            id: "Score",
            data: CATEGORIES.map((key) => ({
                category: key,
                value: Math.floor(Math.random() * 80) + 20, // 20–100
            })),
        },
    ];
    
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [data, setData] = useState(generateData());

    useEffect(() => {
        const interval = setInterval(() => {
            setData(generateData());
        }, 5000); // animate every 5s

        return () => clearInterval(interval);
    }, []);

    const getChartMargins = useMemo(() => {
        return isMobile
            ? { top: 20, right: 87, bottom: 20, left: 65 }
            : { top: 30, right: 86, bottom: 30, left: 72 };
    }, [isMobile]);


    return (
        <Card className='space-y-6 relative p-4 md:p-6 overflow-hidden'>
            <Typography variant="h3" className='text-[18px] md:text-inherit'>{dic?.octagonViewTitle}</Typography>
            <div className='h-[380px]'>
                <ResponsiveRadar
                    data={data[0].data}
                    keys={["value"]}
                    indexBy="category"
                    maxValue={100}
                    margin={getChartMargins}

                    curve="linearClosed"

                    /* 🎯 Grid */
                    gridLevels={5}
                    gridShape="circular"
                    gridLabelOffset={16}

                    /* 🟣 Radar shape */
                    colors={["#a855f7"]}
                    fillOpacity={0.35}
                    borderWidth={2}
                    borderColor="#c084fc"
                    dotSize={6}
                    dotColor="#e9d5ff"
                    dotBorderWidth={0}
                    enableDotLabel={false}

                    /* 🧊 Labels */

                    /* ❌ Tooltips */
                    isInteractive={false}

                    /* ✨ Animation */
                    animate={true}
                    motionConfig="wobbly"

                    /* 🧹 Legends off */
                    legends={[]}
                    theme={{
                        axis: {
                            domain: {
                                line: {
                                    stroke: "rgba(168, 85, 247, 0.45)", // purple bones
                                    strokeWidth: 1,
                                },
                            },
                            ticks: {
                                line: {
                                    stroke: "rgba(168, 85, 247, 0.35)",
                                },
                                text: {
                                    fill: "rgba(255, 255, 255, 0.8)", // ⬅️ soft white labels
                                    fontSize: 12,
                                    fontWeight: 500,
                                },
                            },
                        },
                        grid: {
                            line: {
                                stroke: "rgba(168, 85, 247, 0.35)",
                                strokeWidth: 1,
                            },
                        },
                        labels: {
                            text: {
                                fill: "rgba(255, 255, 255, 0.85)", // category labels
                                fontSize: 13,
                                fontWeight: 500,
                            },
                        },
                    }}


                />
            </div>
            <BorderBeam colorFrom="rgba(158, 61, 255, 0.70)"
                colorTo="rgba(158, 61, 255, 0.50)" borderWidth={1.8} duration={8} size={400} className="rounded-full" />
        </Card>
    )
}

export default OctagonView
