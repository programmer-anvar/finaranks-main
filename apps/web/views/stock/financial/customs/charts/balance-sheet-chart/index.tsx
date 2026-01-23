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
    const dic = dictionary?.stock?.stockMain?.financialTab?.balanceSheetTab?.balanceSheetTabChart;
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
                { label: dic?.totalAssetsLabel || "Total Assets", key: "Total Assets", color: "#5CC8FF" },
                { label: dic?.totalLiabilitiesLabel || "Total Liabilities", key: "Total Liabilities", color: "#FFC857" },
                { label: dic?.stockholdersEquityLabel || "Stockholders Equity", key: "Stockholders Equity", color: "#FF6FAE" },
                { label: dic?.totalDebtLabel || "Total Debt", key: "Total Debt", color: "#6EE7B7" },
            ].map(({ label, key, color }) => (
                <TooltipRow key={key} color={color} label={label} value={data[key]} />
            ))}
        </div>
    );
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



const formatBalanceSheetData = (data: any, financialsNew: any, dictionary: any) => {
    const useNewAPI = financialsNew?.financial_data?.annual && financialsNew?.periods?.annual?.fiscal_periods;
    const dic = dictionary?.stock?.stockMain?.financialTab?.balanceSheetTab?.balanceSheetTabChart;
    
    const totalAssetsLabel = dic?.totalAssetsLabel || "Total Assets";
    const totalLiabilitiesLabel = dic?.totalLiabilitiesLabel || "Total Liabilities";
    const stockholdersEquityLabel = dic?.stockholdersEquityLabel || "Stockholders Equity";
    const totalDebtLabel = dic?.totalDebtLabel || "Total Debt";

    if (useNewAPI) {
        const periods = financialsNew.periods.annual.fiscal_periods || [];
        const financialData = financialsNew.financial_data.annual || {};

        return periods.slice(0, 5).map((year: string, index: number) => ({
            year,
            [totalAssetsLabel]: formatNumber(financialData.total_assets?.[index]),
            [totalLiabilitiesLabel]: formatNumber(financialData.total_liabilities?.[index]),
            [stockholdersEquityLabel]: formatNumber(financialData.total_equity?.[index]),
            [totalDebtLabel]: formatNumber(financialData.total_debt?.[index]),
        }));
    } else {
        const oldData = data?.balanceSheet?.annual || {};

        return Object.entries(oldData)
            .slice(-5)
            .map(([year, val]: [string, any]) => ({
                year,
                [totalAssetsLabel]: formatNumber(val.total_assets ?? val.totalAssets),
                [totalLiabilitiesLabel]: formatNumber(val.total_liabilities ?? val.totalLiabilities),
                [stockholdersEquityLabel]: formatNumber(val.total_equity ?? val.shrhldrs_equity ?? val.stockholdersEquity),
                [totalDebtLabel]: formatNumber(val.total_debt ?? val.totalDebt),
            }));
    }
};


const BalanceSheetChart = ({ chart_data, financialsNew, dictionary }: { chart_data: any, financialsNew: any, dictionary?: any }) => {
    const dic = dictionary?.stock?.stockMain?.financialTab?.balanceSheetTab?.balanceSheetTabChart;
    const totalAssetsLabel = dic?.totalAssetsLabel || "Total Assets";
    const totalLiabilitiesLabel = dic?.totalLiabilitiesLabel || "Total Liabilities";
    const stockholdersEquityLabel = dic?.stockholdersEquityLabel || "Stockholders Equity";
    const totalDebtLabel = dic?.totalDebtLabel || "Total Debt";
    
    const balanceSheetData = formatBalanceSheetData(chart_data, financialsNew, dictionary);
    const isMobile = useMediaQuery("(max-width: 768px)")
    const allValues = balanceSheetData
        .flatMap((d: any) => [
            d[totalAssetsLabel],
            d[totalLiabilitiesLabel],
            d[stockholdersEquityLabel],
            d[totalDebtLabel],
        ])
        .filter((v: any) => typeof v === "number");
    const hasNegative = allValues.some((v: number) => v < 0);
    const maxValue = Math.max(...allValues, 0);
    const paddedMax = maxValue * 1.1;
    return (
        <Card className='h-[450px] md:h-[400px] md:pb-4 p-0 pb-10 rounded-xl relative'>
            <ResponsiveBar
                data={balanceSheetData}
                keys={[totalAssetsLabel, totalLiabilitiesLabel, stockholdersEquityLabel, totalDebtLabel]}
                indexBy="year"
                margin={{ top: 30, right: 20, bottom: 50, left: 50 }}
                padding={isMobile ? 0.15 : 0.6}
                innerPadding={isMobile ? 2 : 6}
                groupMode="grouped"
                colors={["#5CC8FF", "#FFC857", "#FF6FAE", "#6EE7B7"]}
                borderRadius={3}
                enableLabel={false}
                valueScale={{
                    type: 'linear',
                    min: hasNegative ? -paddedMax : 0,
                    max: paddedMax
                }}
                markers={[
                    {
                        axis: 'y',
                        value: 0,
                        lineStyle: { stroke: 'rgba(255,255,255,0.3)', strokeWidth: 1 },
                    },
                ]}
                tooltip={(props: any) => <CustomTooltip {...props} dictionary={dictionary} />}
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
            {balanceSheetData.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4 absolute bottom-4 right-0 left-10">
                    {Object.keys(balanceSheetData[0]).filter(key => key !== "year").map((item, index) => (
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
            )}
        </Card>
    )
}

export default BalanceSheetChart