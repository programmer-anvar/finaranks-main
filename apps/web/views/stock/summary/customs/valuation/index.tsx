"use client"

import { Card } from "@finranks/design-system/components/card"
import { Typography } from "@finranks/design-system/components/typography"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@finranks/design-system/components/table"
import { get } from "lodash"
import TrendHoverModalEnhanced from "../effectiveness/customs/chart-card"

interface ValuationProps {
    data?: any;
    dictionary?: any;
}

const formatNumber = (value?: number | null) =>
    value !== undefined && value !== null ? Number(value).toFixed(2) : "N/A"

const Valuation = ({ data, dictionary }: ValuationProps) => {
    const dic = dictionary?.stock?.stockMain?.summaryTab?.valuation;
    const commonDic = dictionary?.common;

    const METRICS = [
        { key: "P/E", label: dic?.peLabel || "P/E" },
        { key: "PEG", label: dic?.pegExpectedLabel || "PEG (5yr expected)" },
        { key: "P/S", label: dic?.psLabel || "P/S" },
        { key: "P/B", label: dic?.pbLabel || "P/B" },
    ]

    const current = get(data, "current", {})
    const industry = get(data, "industry", {})
    const quarterly = get(data, "quarterly", {})

    return (
        <Card className="space-y-4 rounded-[20px] p-4 md:p-6">
            <Typography variant="h4">{dic?.valuationTitle}</Typography>

            <div className="rounded-lg border border-[#353945] overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b border-[#353945]">
                            <TableHead className="border-r border-[#353945] p-4 text-xs font-semibold uppercase text-[#777e90] text-center w-[220px]!">
                                {dic?.nameColumn}
                            </TableHead>
                            <TableHead className="border-r border-[#353945] p-4 text-xs font-semibold uppercase text-[#777e90] text-center">
                                {dic?.ratioColumn}
                            </TableHead>
                            <TableHead className="border-r border-[#353945] p-4 text-xs font-semibold uppercase text-[#777e90] text-center">
                                {dic?.industryColumn}
                            </TableHead>
                            <TableHead className="border-r border-[#353945] p-4 text-xs font-semibold uppercase text-[#777e90] text-center">
                                {dic?.trend5yColumn}
                            </TableHead>
                            <TableHead className="p-4 text-xs font-semibold uppercase text-[#777e90] text-center w-[100px]!">
                                {dic?.scoreColumn}
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {METRICS.map(({ key, label }) => {
                            const scoreKey = `${key}Score`
                            return (
                                <TableRow
                                    key={key}
                                    className="border-b border-[#353945] hover:bg-purple-900/10"
                                >
                                    <TableCell className="border-r border-[#353945] p-4 font-semibold text-white text-center">
                                        {label}
                                    </TableCell>

                                    <TableCell className="border-r border-[#353945] text-center text-white font-semibold">
                                        {formatNumber(current?.[key])}
                                    </TableCell>

                                    <TableCell className="border-r border-[#353945] text-center text-white font-semibold">
                                        {formatNumber(industry?.[key])}
                                    </TableCell>

                                    <TableCell className="border-r border-[#353945] text-center flex items-center justify-center">
                                        <TrendHoverModalEnhanced
                                            data={quarterly}
                                            metric={key}
                                            lastReport={current}
                                        />
                                    </TableCell>

                                    <TableCell className="text-center text-white font-semibold">
                                        {current?.[scoreKey] ?? (commonDic?.na || "N/A")}
                                    </TableCell>
                                </TableRow>
                            )
                        })}

                        <TableRow>
                            <TableCell
                                colSpan={4}
                                className="border-r border-[#353945] p-4 text-center text-lg font-semibold text-white"
                            >
                                {dic?.weightedAverageScoreLabel}
                            </TableCell>
                            <TableCell
                                className="p-4 text-center text-lg font-semibold text-white"
                                style={{
                                    backgroundColor:
                                        current?.weightedAverageScoreColor || "#000",
                                }}
                            >
                                {current?.weightedAverageScore !== undefined &&
                                    current?.weightedAverageScore !== null
                                    ? Number(current.weightedAverageScore).toFixed(1)
                                    : (commonDic?.na || "N/A")}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </Card>
    )
}

export default Valuation
