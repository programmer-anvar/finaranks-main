"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@finranks/design-system/components/table';
import { Typography } from '@finranks/design-system/components/typography';

type Stock = {
    ticker: string
    positive_mentions: number
    negative_mentions: number
    neutral_mentions: number
}

interface TopMentionedStocksProps {
    topMentionedStocks: Stock[]
}

const MentionedStocks = ({ topMentionedStocks, dictionary }: TopMentionedStocksProps) => {
    return (
        <div className='space-y-2'>
            <Typography variant="h3" color="primary" weight="bold" className='text-xl md:text-2xl'>{dictionary.newsTableTitle}</Typography>
            <div className='border border-[#353945] rounded-md overflow-hidden'>
                <Table className="min-w-full">
                    <TableHeader className="bg-[#854eca]">
                        <TableRow>
                            <TableHead className="text-center border-r text-white px-4 py-3">{dictionary.symbol}</TableHead>
                            <TableHead className=" text-white px-4 py-3 text-center">{dictionary.sentiment}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {topMentionedStocks.map((stock) => (
                            <TableRow key={stock.ticker} className="border-b border-[#3B3B6E] hover:bg-[#2E2E60] transition-colors">
                                <TableCell className="text-center text-white font-medium px-4 py-3 border-r">{stock.ticker}</TableCell>
                                <TableCell className="px-4 py-3">
                                    <p className="text-sm text-center">
                                        <span className="text-green-400">{stock.positive_mentions} {dictionary.positive} | </span>
                                        <span className="text-red-400">{stock.negative_mentions} {dictionary.negative}</span>
                                    </p>
                                    <p className="text-gray-300 text-sm text-center">{stock.neutral_mentions} {dictionary.neutral}</p>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default MentionedStocks