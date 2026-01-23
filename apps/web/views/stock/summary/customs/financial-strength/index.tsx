"use client"
import { Card } from '@finranks/design-system/components/card'
import { Typography } from '@finranks/design-system/components/typography'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@finranks/design-system/components/table';
import { get } from 'lodash';
import { getScoreColor } from '@finranks/design-system/lib/color';
import { memo } from 'react';
import dynamic from 'next/dynamic';

const TrendHoverModalEnhanced = dynamic(() => import("./customs/chart-card"), {
    ssr: false
})

const formatNumber = (value?: number) =>
    value !== null && value !== undefined ? Number(value).toFixed(2) : "N/A";


const FinancialStrength = memo(({ data, dictionary }: { data: any; dictionary?: any }) => {
    const dic = dictionary?.stock?.stockMain?.summaryTab?.financialStrengthTable;
    const commonDic = dictionary?.common;

    const METRICS = [
        { key: "currentRatio", label: dic?.currentRatioLabel || "Current ratio" },
        { key: "quickRatio", label: dic?.quickRatioLabel || "Quick ratio" },
        { key: "debtToEquity", label: dic?.debtToEquityLabel || "Debt to Equity" },
        { key: "debtToAssets", label: dic?.debtToAssetsLabel || "Debt to Assets" },
        { key: "interestCoverage", label: dic?.interestCoverageLabel || "Interest coverage" },
    ];

    const industry = get(data, "industry");
    const lastReport = get(data, "lastReport");
    const annual = get(data, "annual");

    return (
        <Card className="space-y-4 rounded-xl p-4 md:p-6">
            <div className="flex items-center justify-between">
                <Typography variant="h4">{dic?.financialStrengthTitle}</Typography>
            </div>

            <div className="overflow-hidden rounded-lg border border-[#353945]">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b border-[#353945]">
                            <TableHead className="border-r w-[220px]! border-[#353945] p-4 text-xs font-semibold uppercase text-[#777e90] text-center">
                                {dic?.name}
                            </TableHead>
                            <TableHead className="border-r border-[#353945] text-center text-xs font-semibold uppercase text-[#777e90]">
                                {dic?.ratio}
                            </TableHead>
                            <TableHead className="border-r border-[#353945] text-center text-xs font-semibold uppercase text-[#777e90]">
                                {dic?.industry}
                            </TableHead>
                            <TableHead className="border-r border-[#353945] text-center text-xs font-semibold uppercase text-[#777e90]">
                                {dic?.trnd}
                            </TableHead>
                            <TableHead className="text-center text-xs font-semibold uppercase text-[#777e90] w-[100px]!">
                                {dic?.score}
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {METRICS.map(({ key, label }) => {

                            return (
                                <TableRow
                                    key={key}
                                    className="border-b border-[#353945] hover:bg-purple-900/10"
                                >
                                    <TableCell className="border-r border-[#353945] p-4 font-semibold text-white text-center">
                                        {label}
                                    </TableCell>

                                    <TableCell className="border-r border-[#353945] text-center text-white font-semibold">
                                        {formatNumber(lastReport?.[key]) ?? (commonDic?.na || "N/A")}
                                    </TableCell>

                                    <TableCell className="border-r border-[#353945] text-center text-white font-semibold">
                                        {formatNumber(industry?.[key]) ?? (commonDic?.na || "N/A")}
                                    </TableCell>

                                    <TableCell className="border-r border-[#353945] flex items-center justify-center">
                                        <TrendHoverModalEnhanced
                                            data={annual}
                                            metric={key}
                                            lastReport={lastReport}
                                        />
                                    </TableCell>

                                    <TableCell className="text-center text-white font-semibold">
                                        {lastReport?.[`${key}Score`] ?? (commonDic?.na || "N/A")}
                                    </TableCell>
                                </TableRow>
                            );
                        })}

                        {/* Footer */}
                        <TableRow className="hover:bg-transparent">
                            <TableCell
                                colSpan={4}
                                className="border-r border-[#353945] p-4 text-center text-lg font-semibold text-white"
                            >
                                {dic?.weightedAverageScore}
                            </TableCell>
                            <TableCell
                                className="p-4 text-center text-lg font-semibold text-white"
                                style={{
                                    backgroundColor: getScoreColor(
                                        lastReport?.weightedAverageScore
                                    ),
                                }}
                            >
                                {lastReport?.weightedAverageScore ?? (commonDic?.na || "N/A")}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </Card>
    );
});


export default FinancialStrength
