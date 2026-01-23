"use client";

import React from "react";
import { Card } from "@finranks/design-system/components/card";
import { Typography } from "@finranks/design-system/components/typography";
import { ResponsiveLine } from "@nivo/line";

type RawItem = {
    period: string;
    value: number;
};

type RawYear = {
    year: number;
    data: RawItem[];
};

export const formatDividendYieldData = (raw: RawYear[]) => {
    return [
        {
            id: "Dividend Yield",
            data: raw
                .flatMap((yearItem) =>
                    yearItem.data.map((item) => ({
                        x: `${item.period} ${yearItem.year}`,
                        y: item.value,
                    }))
                )
                .sort((a, b) => {
                    const [qA, yA] = String(a.x).split(" ");
                    const [qB, yB] = String(b.x).split(" ");
                    return Number(yA) - Number(yB) || qA.localeCompare(qB);
                }),
        },
    ];
};

function useIsMobile(breakpointPx = 768) {
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const mq = window.matchMedia(`(max-width: ${breakpointPx - 1}px)`);
        const onChange = () => setIsMobile(mq.matches);
        onChange();

        if (mq.addEventListener) mq.addEventListener("change", onChange);
        else mq.addListener(onChange);

        return () => {
            if (mq.removeEventListener) mq.removeEventListener("change", onChange);
            else mq.removeListener(onChange);
        };
    }, [breakpointPx]);

    return isMobile;
}

interface DividendYearChartProps {
    data: any;
    dictionary?: any;
}

const DividendYearChart = ({ data, dictionary }: DividendYearChartProps) => {
    const nivoData = formatDividendYieldData(data);
    const isMobile = useIsMobile(768);
    const dic = dictionary?.stock?.stockMain?.dividendsTab;
    const commonDic = dictionary?.common;

    const isEmpty =
        !data ||
        data.length === 0 ||
        data.every((y: any) => !y.data || y.data.length === 0);

    if (isEmpty) {
        return (
            <Card className="p-6 h-[440px] rounded-xl flex flex-col">
                <Typography
                    variant="h2"
                    className="text-[18px]"
                    weight="semibold"
                >
                    {dic?.DividendyieldovertimeTitle}
                </Typography>

                <div className="flex flex-1 items-center justify-center text-gray-400 text-sm">
                    {commonDic?.noDividendData}
                </div>
            </Card>
        );
    }


    return (
        <Card className="p-0 h-[440px] rounded-xl">
            <Typography variant="h2" className="text-[18px]  px-6 py-4" weight="semibold">
                {dic?.DividendyieldovertimeTitle}
            </Typography>
            <div className=" h-[380px] md:h-[360px] w-full">
                <ResponsiveLine
                    data={nivoData}
                    margin={{
                        top: 20,
                        right: 30,
                        bottom: isMobile ? 20 : 40,
                        left: 64,
                    }}
                    curve="monotoneX"
                    lineWidth={2}
                    colors={["#5ec2ff"]}
                    enableArea
                    areaOpacity={0.25}
                    areaBaselineValue={0}
                    defs={[
                        {
                            id: "areaGradient",
                            type: "linearGradient",
                            colors: [
                                { offset: 0, color: "#5ec2ff", opacity: 0.4 },
                                { offset: 100, color: "#5ec2ff", opacity: 0 },
                            ],
                        },
                    ]}
                    fill={[{ match: "*", id: "areaGradient" }]}
                    pointSize={8}
                    pointColor="#0b0620"
                    pointBorderWidth={2}
                    pointBorderColor="#5ec2ff"
                    axisBottom={
                        isMobile
                            ? null
                            : {
                                tickSize: 0,
                                tickPadding: 12,
                                tickRotation: 0,
                            }
                    }
                    axisLeft={{
                        tickSize: 0,
                        tickPadding: 10,
                        format: (value) => `${(Number(value) * 100).toFixed(2)}%`,
                    }}
                    enableGridX
                    enableGridY
                    gridYValues={4}
                    theme={{
                        text: {
                            fill: "#9ca3af",
                            fontSize: 12,
                        },
                        grid: {
                            line: {
                                stroke: "#ffffff14",
                                strokeWidth: 1,
                            },
                        },
                        tooltip: {
                            container: {
                                background: "#ffffff",
                                color: "#111",
                                borderRadius: 8,
                                fontSize: 12,
                            },
                        },
                    }}
                    tooltip={({ point }) => (
                        <div className="rounded-md bg-white px-3 py-2 shadow">
                            <div className="text-xs text-gray-500">{point.data.xFormatted}</div>
                            <div className="flex items-center gap-2 font-semibold text-black">
                                <span className="h-2 w-2 rounded-full bg-[#5ec2ff]" />
                                {(Number(point.data.y) * 100).toFixed(2)}%
                            </div>
                        </div>
                    )}
                    useMesh
                    enableSlices={false}
                    enablePoints
                    enableCrosshair={false}
                    legends={[]}
                />
            </div>
        </Card>
    );
};

export default DividendYearChart;
