'use client'
import { Typography } from '@finranks/design-system/components/typography';
import { ResponsiveBar } from '@nivo/bar';
import { useMediaQuery } from '@uidotdev/usehooks';






const LatestSentiment = ({ sentiments, dictionary }: { sentiments: any },) => {
    const SentimentTooltip = ({ indexValue, data }: any) => {
        return (
            <div className="min-w-[180px] rounded-lg bg-white px-3 py-2 text-sm shadow-xl">
                <div className="mb-2 font-semibold text-gray-900">
                    {indexValue}
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    <span>{dictionary.positiveCount}:</span>
                    <span className="ml-auto font-semibold">{data["Positive count"]}</span>
                </div>

                <div className="mt-1 flex items-center gap-2 text-gray-700">
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                    <span>{dictionary.negativeCount}:</span>
                    <span className="ml-auto font-semibold">{data["Negative count"]}</span>
                </div>

                <div className="mt-1 flex items-center gap-2 text-gray-700">
                    <span className="h-2 w-2 rounded-full bg-yellow-400" />
                    <span>{dictionary.neaturalCount}:</span>
                    <span className="ml-auto font-semibold">{data["Neutral count"]}</span>
                </div>
            </div>
        );
    };

    const isMobile = useMediaQuery("(max-width: 768px)");
    const chartData = sentiments.map((item: any) => {
        return {
            date: item.date,
            "Positive count": item.positive_count,
            "Negative count": item.negative_count,
            "Neutral count": item.neutral_count,
        }
    })
    return (
        <div className='h-[440px] pb-8 space-y-2'>
            <Typography variant="h3" color="primary" weight="bold" className='text-xl md:text-2xl'>{dictionary.latestNewsTitle}</Typography>
            <ResponsiveBar
                data={chartData}
                keys={["Positive count", "Negative count", "Neutral count"]}
                indexBy="date"
                margin={{ top: 40, right: 20, bottom: 60, left: 30 }}
                padding={0.3}
                groupMode="stacked"
                colors={["#52C41A", "#FF4D4F", "#FADB14"]}
                borderRadius={1}
                enableLabel={true}
                tooltip={SentimentTooltip}
                labelSkipHeight={12}
                labelTextColor="#ffffff"
                axisBottom={{
                    tickSize: 0,
                    tickPadding: 12,
                    tickRotation: 0,
                    style: {
                        ticks: {
                            text: {
                                display: isMobile ? "none" : "block",
                            },
                        },
                    },
                }}
                axisLeft={{
                    tickSize: 0,
                    tickPadding: 10,
                }}
                gridYValues={5}
                theme={{
                    background: "transparent",
                    axis: {
                        ticks: {
                            text: {
                                fill: "#9CA3AF",
                                fontSize: 12,
                            },
                        },
                    },
                    grid: {
                        line: {
                            stroke: "#1F2937",
                            strokeWidth: 1,
                        },
                    },
                    legends: {
                        text: {
                            fill: "#E5E7EB",
                        },
                    },
                    labels: {
                        text: {
                            fontWeight: 600,
                        },
                    },
                }}
                legends={[
                    {
                        dataFrom: "keys",
                        anchor: "bottom",
                        direction: "row",
                        translateY: 60,
                        itemWidth: 120,
                        itemHeight: 20,
                        symbolSize: 14,
                        itemTextColor: "#E5E7EB",
                    },
                ]}
            />
        </div>
    )
}

export default LatestSentiment