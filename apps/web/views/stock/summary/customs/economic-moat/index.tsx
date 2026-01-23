'use client'

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

interface EconomicMoatProps {
    data?: any
    dictionary?: any
}

const EconomicMoat = ({ data, dictionary }: EconomicMoatProps) => {
    const dic = dictionary?.stock?.stockMain?.summaryTab?.economicMoatTable;
    const commonDic = dictionary?.common;
    
    const METRICS = [
        { key: "marketShare", label: dic?.marketShareLabel },
        { key: "intangibleAsset", label: dic?.intangibleAssetsLabel },
        { key: "switchingCost", label: dic?.switchingCostsLabel }, 
        { key: "networkEffect", label: dic?.networkEffectLabel },
        { key: "economyScale", label: dic?.economiesOfScaleLabel },
    ]
    
    return (
        <Card className="space-y-4 rounded-[20px] p-4 md:p-6">
            <Typography variant="h4">{dic?.economicMoatTitle}</Typography>

            <div className="rounded-lg border border-[#353945] overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b border-[#353945]">
                            <TableHead className="border-r border-[#353945] p-4 text-xs font-semibold uppercase text-[#777e90] text-center w-[220px]!">
                                {dic?.nameColumn}
                            </TableHead>
                            <TableHead className="border-r border-[#353945] p-4 text-xs font-semibold uppercase text-[#777e90] text-center">
                                {dic?.scaleColumn}
                            </TableHead>
                            <TableHead className="p-4 text-xs font-semibold uppercase text-[#777e90] text-center w-[100px]!">
                                {dic?.scoreColumn}
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {METRICS.map(({ key, label }) => (
                            <TableRow
                                key={key}
                                className="border-b border-[#353945] hover:bg-purple-900/10"
                            >
                                <TableCell className="border-r border-[#353945] p-4 font-semibold text-white text-center">
                                    {label}
                                </TableCell>

                                <TableCell className="border-r border-[#353945] text-center text-white font-semibold">
                                    {get(data, `${key}.scale`) ?? commonDic?.na}
                                </TableCell>

                                <TableCell className="text-center text-white font-semibold">
                                    {get(data, `${key}.score`) ?? "1.0"}
                                </TableCell>
                            </TableRow>
                        ))}

                        <TableRow>
                            <TableCell
                                colSpan={2}
                                className="border-r border-[#353945] p-4 text-center text-lg font-semibold text-white"
                            >
                                {dic?.weightedAverageScoreLabel}
                            </TableCell>
                            <TableCell
                                className="p-4 text-center text-lg font-semibold text-white"
                                style={{
                                    backgroundColor:
                                        get(data, "weightedAverage.scoreColor") || "#000",
                                }}
                            >
                                {get(data, "weightedAverage.score") ?? "1.0"}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </Card>
    )
}

export default EconomicMoat
