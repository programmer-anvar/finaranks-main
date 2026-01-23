"use client";
import { Card } from '@finranks/design-system/components/card';
import { ResponsiveBar } from '@nivo/bar';
import { useMediaQuery } from '@uidotdev/usehooks';

const formatNumber = (value: number | null | undefined) => {
    if (value == null || isNaN(value)) return null;
    if (Math.abs(value) >= 1_000_000_000) return +(value / 1_000_000_000).toFixed(2); // B
    if (Math.abs(value) >= 1_000_000) return +(value / 1_000_000).toFixed(2); // M
    if (Math.abs(value) >= 1_000) return +(value / 1_000).toFixed(2); // K
    return +value.toFixed(2);
};


const CustomTooltip = ({ indexValue, data, dictionary }: any) => {
    const dic = dictionary?.stock?.stockMain?.financialTab?.cashFlowTab?.cashFlowTabChart;
    return (
        <div
            style={{
                background: "#fff",
                color: "#000",
                padding: "12px 14px",
                borderRadius: "8px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                minWidth: 200,
            }}
        >
            <div style={{ fontWeight: 600, marginBottom: 8 }}>{indexValue}</div>
            {[
                { label: dic?.operatingCashFlowLabel || "Operating Cash Flow", key: "Operating Cash Flow", color: "#5CC8FF" },
                { label: dic?.investingCashFlowLabel || "Investing Cash Flow", key: "Investing Cash Flow", color: "#FFC857" },
                { label: dic?.financingCashFlowLabel || "Financing Cash Flow", key: "Financing Cash Flow", color: "#FF6FAE" },
                { label: dic?.freeCashFlowLabel || "Free Cash Flow", key: "Free Cash Flow", color: "#6EE7B7" },
            ].map(({ label, key, color }) => (
                <TooltipRow key={key} color={color} label={label} value={data[key]} />
            ))}
        </div>
    )
};

const TooltipRow = ({ color, label, value }: { color: string; label: string; value: number }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <span
            style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: color,
            }}
        />
        <span style={{ fontSize: 13 }} className="whitespace-nowrap">
            {label}: {formatNumber(value)}B
        </span>
    </div>
);



const formatCashFlowData = (data: any, financialsNew: any, dictionary: any) => {
    const useNewAPI = financialsNew?.financial_data?.annual && financialsNew?.periods?.annual?.fiscal_periods;
    const dic = dictionary?.stock?.stockMain?.financialTab?.cashFlowTab?.cashFlowTabChart;
    
    const operatingCashFlowLabel = dic?.operatingCashFlowLabel || "Operating Cash Flow";
    const investingCashFlowLabel = dic?.investingCashFlowLabel || "Investing Cash Flow";
    const financingCashFlowLabel = dic?.financingCashFlowLabel || "Financing Cash Flow";
    const freeCashFlowLabel = dic?.freeCashFlowLabel || "Free Cash Flow";

    if (useNewAPI) {
        const periods = financialsNew.periods.annual.fiscal_periods || [];
        const financialData = financialsNew.financial_data.annual || {};

        return periods.slice(0, 5).map((year: string, index: number) => ({
            year,
            [operatingCashFlowLabel]: formatNumber(financialData.cash_f_operating_activities?.[index]),
            [investingCashFlowLabel]: formatNumber(financialData.cash_f_investing_activities?.[index]),
            [financingCashFlowLabel]: formatNumber(financialData.cash_f_financing_activities?.[index]),
            [freeCashFlowLabel]: formatNumber(financialData.free_cash_flow?.[index]),
        }));
    } else {
        const oldData = data?.cashFlow?.annual || {};

        return Object.entries(oldData)
            .slice(-5)
            .map(([year, val]: [string, any]) => ({
                year,
                [operatingCashFlowLabel]: formatNumber(val.cash_f_operating_activities ?? val.operatingCashFlow),
                [investingCashFlowLabel]: formatNumber(val.cash_f_investing_activities ?? val.investingCashFlow),
                [financingCashFlowLabel]: formatNumber(val.cash_f_financing_activities ?? val.financingCashFlow),
                [freeCashFlowLabel]: formatNumber(val.free_cash_flow ?? val.freeCashFlow),
            }));
    }
};


const CashFlowChart = ({ chart_data, financialsNew, dictionary }: { chart_data: any, financialsNew: any, dictionary?: any }) => {
    const dic = dictionary?.stock?.stockMain?.financialTab?.cashFlowTab?.cashFlowTabChart;
    const operatingCashFlowLabel = dic?.operatingCashFlowLabel || "Operating Cash Flow";
    const investingCashFlowLabel = dic?.investingCashFlowLabel || "Investing Cash Flow";
    const financingCashFlowLabel = dic?.financingCashFlowLabel || "Financing Cash Flow";
    const freeCashFlowLabel = dic?.freeCashFlowLabel || "Free Cash Flow";
    
    const balanceSheetData = formatCashFlowData(chart_data, financialsNew, dictionary);
    const isMobile = useMediaQuery("(max-width: 768px)")
    const allValues = balanceSheetData.flatMap((d: any) => [
        d[operatingCashFlowLabel],
        d[investingCashFlowLabel],
        d[financingCashFlowLabel],
        d[freeCashFlowLabel]
    ]);
    const hasNegative = allValues?.some((v: number) => v < 0);
    const maxValue = Math.max(...allValues.map(Math.abs), 0);
    const symmetricalMax = maxValue * 1.1

    const MinHeightBarsLayer = ({ bars }: any) => {
        const MIN_H = 20;

        return (
            <g>
                {bars.map((bar: any) => {
                    const isPositive = bar.data.value >= 0;
                    const h = Math.abs(bar.height);
                    const shouldMin = bar.data.value !== 0 && h < MIN_H;
                    const newH = shouldMin ? MIN_H : h;
                    const newY = shouldMin
                        ? (isPositive ? bar.y + (bar.height - MIN_H) : bar.y)
                        : bar.y;

                    return (
                        <rect
                            key={bar.key}
                            x={bar.x}
                            y={newY}
                            width={bar.width}
                            height={newH}
                            rx={bar.borderRadius ?? 3}
                            ry={bar.borderRadius ?? 3}
                            fill={bar.color}
                        />
                    );
                })}
            </g>
        );
    };

    return (
        <Card className='h-[450px] md:h-[400px] md:pb-4 p-0 pb-10 rounded-xl relative'>
            <ResponsiveBar
                data={balanceSheetData}
                keys={[operatingCashFlowLabel, investingCashFlowLabel, financingCashFlowLabel, freeCashFlowLabel]}
                indexBy="year"
                margin={{ top: 30, right: 20, bottom: 50, left: 50 }}
                padding={isMobile ? 0.15 : 0.6}
                innerPadding={isMobile ? 2 : 6}
                groupMode="grouped"
                colors={["#5CC8FF", "#FFC857", "#FF6FAE", "#6EE7B7"]}
                borderRadius={3}
                enableLabel={false}
                tooltip={(props: any) => <CustomTooltip {...props} dictionary={dictionary} />}
                layers={[
                    'grid',
                    'axes',
                    'markers',
                    MinHeightBarsLayer,
                    'legends',
                ]}
                valueScale={{
                    type: 'linear',
                    min: hasNegative ? -symmetricalMax : 0,
                    max: symmetricalMax
                }}
                markers={[
                    {
                        axis: 'y',
                        value: 0,
                        lineStyle: { stroke: 'rgba(255,255,255,0.3)', strokeWidth: 2 },
                    },
                ]}
                axisBottom={{
                    tickSize: 0,
                    tickPadding: 10,
                    tickRotation: 0,
                }}
                axisLeft={{
                    tickSize: 0,
                    tickPadding: 10,
                    format: (v) => `${formatNumber(v)}B`,
                }}
                theme={{
                    axis: {
                        ticks: {
                            line: { stroke: "transparent" },
                            text: { fill: "#9CA3AF" },
                        },
                    },
                    grid: {
                        line: {
                            stroke: "rgba(255,255,255,0.08)",
                            strokeDasharray: "4 4",
                        },
                    },
                }}

            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4 absolute bottom-4 right-0 left-10">
                {[operatingCashFlowLabel, investingCashFlowLabel, financingCashFlowLabel, freeCashFlowLabel].map((item, index) => (
                    <div key={item} className="flex items-center gap-2">
                        <div
                            className="w-3 h-3 rounded-xs"
                            style={{
                                backgroundColor: ["#5CC8FF", "#FFC857", "#FF6FAE", "#6EE7B7"][index]
                            }}
                        />
                        <span className="text-xs text-gray-400">{item}</span>
                    </div>
                ))}
            </div>
        </Card>
    )
}

export default CashFlowChart