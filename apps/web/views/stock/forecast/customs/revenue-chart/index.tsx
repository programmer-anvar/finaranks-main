'use client';
import React, { useState, useEffect, useMemo } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    TooltipProps
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@finranks/design-system/components/select';
import { formatToMillion } from '@finranks/design-system/lib/utils';
import { Card } from '@finranks/design-system/components/card';
import { Typography } from '@finranks/design-system/components/typography';
import EmptyState from '@/components/empty-state';
import { useMediaQuery } from '@uidotdev/usehooks';

// Assuming helpers is typed or has a declaration file


interface RevenueDataPoint {
    period: string;
    year?: string;
    estimate: number;
    reported: number;
    [key: string]: any;
}

interface RevenueChartProps {
    data: {
        annual: { revenue: RevenueDataPoint[] };
        quarterly: { revenue: RevenueDataPoint[] };
    };
}

type SelectOption = { value: 'annual' | 'quarterly'; label: string };

const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
    const [selectValue, setSelectValue] = useState<SelectOption>({ value: 'annual', label: "Annual" });
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const chartData = data[selectValue.value].revenue;
    if (!data || !chartData || !Boolean(chartData.length)) {
        return <EmptyState title="Revenue" />
    }
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const chartHeight = isMobile ? 280 : 345;
    const chartMargin = isMobile
        ? { top: 0, right: 20, left: -17, bottom: 10 }
        : { top: 0, right: 20, left: -20, bottom: 20 };



    // Dynamic domain calculation
    const yAxisDomain = useMemo(() => {
        if (!chartData || chartData.length === 0) return [0, 100];

        const allValues: number[] = [];
        chartData.forEach(item => {
            if (item.chart_data?.estimate) allValues.push(item.chart_data.estimate);
            if (item.chart_data?.reported) allValues.push(item.chart_data.reported);
        });

        if (allValues.length === 0) return [0, 100];

        const maxValue = Math.max(...allValues);
        const minValue = Math.min(...allValues);

        // Calculate the range
        const range = maxValue - minValue;

        // Dynamic padding based on the data distribution
        let topPadding: number;

        if (range === 0) {
            // If all values are the same, use 20% padding
            topPadding = maxValue * 0.2;
        } else {
            // Calculate coefficient of variation to understand data spread
            const mean = allValues.reduce((a, b) => a + b, 0) / allValues.length;
            const variance = allValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / allValues.length;
            const stdDev = Math.sqrt(variance);
            const coefficientOfVariation = stdDev / mean;

            // If there's high variation (one value much larger), use less padding
            // If values are similar, use more padding for better visualization
            if (coefficientOfVariation > 0.5) {
                // High variation - use 15-20% padding
                topPadding = maxValue * 0.15;
            } else if (coefficientOfVariation > 0.3) {
                // Moderate variation - use 20-25% padding
                topPadding = maxValue * 0.22;
            } else {
                // Low variation - use 25-30% padding
                topPadding = maxValue * 0.28;
            }
        }

        let upperLimit = maxValue + topPadding;

        // MINIMUM SCALE: Ensure bars are visible even with small values
        // If the upper limit is too small, set a minimum threshold
        const MINIMUM_SCALE = 10; // Adjust this based on your data type (revenue vs EPS)
        if (upperLimit < MINIMUM_SCALE) {
            upperLimit = MINIMUM_SCALE;
        }

        // Additionally, ensure bars take up at least 60% of chart height
        // by limiting the upper bound to max 1.67x the max value (1/0.6 = 1.67)
        const minVisibleUpperLimit = maxValue * 1.4; // bars will be ~71% of height
        if (upperLimit < minVisibleUpperLimit) {
            upperLimit = minVisibleUpperLimit;
        }

        return [0, upperLimit];
    }, [chartData]);

    return (
        <Card className='rounded-xl p-0 md:p-6'>
            <div className='flex justify-between items-center mb-6 p-3'>
                <Typography variant="h2" className="text-[20px]!" weight="semibold">Revenue</Typography>
                <div>
                    <Select onValueChange={(e: any) => setSelectValue({ value: e, label: e })}>
                        <SelectTrigger className="w-[180px]" defaultValue="Annual">
                            <SelectValue placeholder="Select" className='text-white' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="annual">Annual</SelectItem>
                            <SelectItem value="quarterly">Quarteryl</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <ResponsiveContainer width='100%' height={chartHeight}>
                <BarChart
                    data={chartData.slice().reverse()}
                    margin={chartMargin}
                >
                    <CartesianGrid
                        strokeDasharray='3 0'
                        horizontal={true}
                        vertical={false}
                        fill='transparent'
                        stroke={'#292534'}
                    />
                    <XAxis
                        dataKey='period'
                        orientation='bottom'
                        tickLine={false}
                        tick={<CustomizedAxisTick />}
                        interval={0}
                        axisLine={false}
                    />
                    <YAxis
                        fontSize={isMobile ? 8 : 10}
                        tickLine={false}
                        tickCount={isMobile ? 6 : 8}
                        tickFormatter={(val: number) => formatToMillion(val)}
                        axisLine={false}
                        domain={yAxisDomain}
                    />
                    <Tooltip
                        content={<CustomTooltip titleKey='year' />}
                        cursor={<BGHighlighter numOfData={chartData.length} />}
                    />
                    <Legend content={<CustomLegend />} />
                    <Bar dataKey='chart_data.estimate' className="h-[100px] pt-[50px]" fill='var(--primary-graph-color, #6366f1)' radius={3.6} barSize={18} minPointSize={39} />
                    <Bar
                        dataKey='chart_data.reported'
                        className="h-[100px]! pt-[50px]!"
                        fill='var(--secondary-graph-color, #a5b4fc)'
                        radius={3.6}
                        barSize={18}
                        minPointSize={39}
                    />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default RevenueChart;

/** --- SUB-COMPONENTS --- **/

interface TickProps {
    x?: number;
    y?: number;
    payload?: any;
    customYOffset?: number;
    customXOffset?: number;
    suffix?: string;
    prefix?: string;
    fillBlack?: boolean;
}

const CustomizedAxisTick: React.FC<TickProps> = (props) => {
    const { x, y, payload, customYOffset, customXOffset, suffix, prefix, fillBlack } = props;
    const isMobile = useMediaQuery("(max-width: 768px)");
    return (
        <g transform={`translate(${x},${y})`}>
            <text
                x={customXOffset || 0}
                y={0}
                dy={Number.isFinite(customYOffset) ? customYOffset : 24}
                fill={fillBlack ? '#000000' : '#8D9092'}
                textAnchor='middle'
                style={{
                    fontSize: isMobile ? '8px' : '10px',
                    lineHeight: '13px',
                }}
            >
                {prefix || ''}{payload.value}{suffix || ''}
            </text>
        </g>
    );
};

const CustomTooltip = ({ active, payload, }: TooltipProps<number, string> & { titleKey?: string }) => {
    if (!active || !payload || !payload.length) return null;

    return (
        <div className="bg-white p-4 rounded-md">
            <div className="flex flex-col gap-1">
                {payload.map((item, i) => {
                    const formatValue = item.value ? formatToMillion(item.value) : '0';
                    return (
                        <div key={i} className="flex items-center gap-2 text-[13px]">
                            <div style={{ background: item.color }} className="w-2 h-2 rounded-full" />
                            <span className='text-black'>{item.dataKey === 'reported' ? "Reported" : "Estimate"}: {formatValue}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

interface BGHighlighterProps {
    height?: number;
    width?: number;
    points?: any[];
    numOfData?: number;
    x?: number;
}

const BGHighlighter: React.FC<BGHighlighterProps> = (props) => {
    const { height = 0, width: graphWidth = 0, points, numOfData = 1, x } = props;
    const width = points ? graphWidth / numOfData : graphWidth;
    const xCoord = points ? points[0].x - width / 2 : x;
    return (
        <rect
            x={xCoord}
            y={0}
            rx='10.5'
            ry='10.5'
            width={width}
            height={height + 13}
            opacity='0.2'
            fill='#DCDBFC'
        />
    );
};

const CustomLegend = ({ payload }: any) => {
    if (!payload) return null;
    return (
        <div className='flex flex-wrap gap-4 mt-5 ml-8'>
            {payload.map((item: any, i: number) => (
                <div className='flex items-center gap-2' key={i}>
                    <span className='w-3 h-3 rounded-xs' style={{ backgroundColor: item.color }}></span>
                    <span className='text-xs text-white capitalize'>
                        {item.value === 'estimate' ? "Estimate" : 'Reported'}
                    </span>
                </div>
            ))}
        </div>
    );
};