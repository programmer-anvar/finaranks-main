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
    const dic = dictionary?.stock?.stockMain?.financialTab?.incomeStatementTab?.incomeStatementTabChart;
    const revenueLabel = dic?.revenueLabel || "Revenue";
    const grossProfitLabel = dic?.grossProfitLabel || "Gross Profit";
    const operatingIncomeLabel = dic?.operatingIncomeLabel || "Operating Income";
    const netIncomeLabel = dic?.netIncomeLabel || "Net Income";
    
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
                { label: revenueLabel, key: "revenue", color: "#5CC8FF", dataKey: revenueLabel },
                { label: grossProfitLabel, key: "grossProfit", color: "#FFC857", dataKey: grossProfitLabel },
                { label: operatingIncomeLabel, key: "operatingIncome", color: "#FF6FAE", dataKey: operatingIncomeLabel },
                { label: netIncomeLabel, key: "netIncome", color: "#6EE7B7", dataKey: netIncomeLabel },
            ].map(({ label, key, color, dataKey }) => (
                <TooltipRow key={key} color={color} label={label} value={data[dataKey]} />
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
        <span style={{ fontSize: 13 }} className='whitespace-nowrap'>
            {label}: {formatNumber(value) ?? 0}B
        </span>
    </div>
);



const formatFinancialData = (data: any, financialsNew: any) => {
    const useNewAPI = financialsNew?.financial_data?.annual && financialsNew?.periods?.annual?.fiscal_periods;


    if (useNewAPI) {
        const periods = financialsNew.periods.annual.fiscal_periods || [];
        const financialData = financialsNew.financial_data.annual || {};
        return periods.slice(0, 5).map((year: string, idx: number) => ({
            year,
            Revenue: financialData.total_revenue?.[idx] ?? null,
            "Gross Profit": financialData.gross_profit?.[idx] ?? null,
            "Operating Income": financialData.oper_income?.[idx] ?? null,
            "Net Income": financialData.net_income?.[idx] ?? null,
        }));
    } else {
        const oldData = data?.incomeStatement?.annual || {};
        return Object.entries(oldData)
            .slice(-5)
            .map(([year, val]: [string, any]) => ({
                year,
                Revenue: formatNumber(val.total_revenue ?? val.totalRevenue),
                "Gross Profit": formatNumber(val.gross_profit ?? val.grossProfit),
                "Operating Income": formatNumber(val.oper_income ?? val.operatingIncome),
                "Net Income": formatNumber(val.net_income ?? val.netIncome),
            }));
    }
};


const IncomeStatementChart = ({ chart_data, financialsNew, dictionary }: { chart_data: any, financialsNew: any, dictionary?: any }) => {
    const dic = dictionary?.stock?.stockMain?.financialTab?.incomeStatementTab?.incomeStatementTabChart;
    const revenueLabel = dic?.revenueLabel || "Revenue";
    const grossProfitLabel = dic?.grossProfitLabel || "Gross Profit";
    const operatingIncomeLabel = dic?.operatingIncomeLabel || "Operating Income";
    const netIncomeLabel = dic?.netIncomeLabel || "Net Income";
    
    const chartData = formatFinancialData(chart_data, financialsNew, dictionary);
    const isMobile = useMediaQuery("(max-width: 768px)")
    const allValues = chartData.flatMap((d: any) => [
        d[revenueLabel],
        d[grossProfitLabel],
        d[operatingIncomeLabel],
        d[netIncomeLabel],
    ]).filter((v: any) => typeof v === "number");
    const hasNegative = allValues.some((v: number) => v < 0);
    const maxValue = Math.max(...allValues.map(Math.abs), 0);
    const symmetricalMax = maxValue * 1.1;
    return (
        <Card className='h-[450px] md:h-[400px] p-0 pb-10  md:p-0 md:pb-4 rounded-xl relative'>
            <ResponsiveBar
                data={chartData}
                keys={[revenueLabel, grossProfitLabel, operatingIncomeLabel, netIncomeLabel]}
                indexBy="year"
                margin={{ top: 30, right: 20, bottom: 50, left: 50 }}
                padding={isMobile ? 0.15 : 0.6}
                innerPadding={isMobile ? 2 : 6}
                groupMode="grouped"
                colors={["#5CC8FF", "#FFC857", "#FF6FAE", "#6EE7B7"]}
                borderRadius={3}
                enableLabel={false}
                tooltip={(props: any) => <CustomTooltip {...props} dictionary={dictionary} />}
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
                {[revenueLabel, grossProfitLabel, operatingIncomeLabel, netIncomeLabel].map((item, index) => (
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

export default IncomeStatementChart