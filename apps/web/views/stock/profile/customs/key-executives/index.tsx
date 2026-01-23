import EmptyState from '@/components/empty-state';
import { Card } from '@finranks/design-system/components/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@finranks/design-system/components/table';
import { Typography } from '@finranks/design-system/components/typography';


const KeyExecutives = ({ data, dictionary }: { data: any, dictionary?: any }) => {
    const dic = dictionary?.stock?.stockMain?.profileTab?.ExecutivesTable;

    if (!data || !Boolean(data?.length)) {
        return <EmptyState title={dic?.keyExecutivesTitle} dictionary={dictionary} />
    }


    return (
        <Card className='p-4 md:p-6 rounded-xl space-y-4'>
            <Typography variant="h2" className="text-[20px]!" weight="semibold">{dic?.keyExecutivesTitle}</Typography>
            <div className='rounded-xl border border-[#d9d9d91a]  overflow-hidden'>
                <Table >
                    <TableHeader className='rounded-t-md!'>
                        <TableRow className="border-b border-[#d9d9d91a] hover:bg-(--main-color) rounded-t-md! bg-(--main-color)">
                            <TableHead className="text-white font-bold  text-sm border-r border-[#d9d9d91a]   px-6 py-4">
                                {dic?.nameColumn}
                            </TableHead>
                            <TableHead className="text-white font-bold  text-sm border-r border-[#d9d9d91a]   px-6 py-4">
                                {dic?.positionColumn}
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {(
                            data.map((item: any, index: number) => {
                                return (
                                    <TableRow key={index} className="border-b border-[#d9d9d91a]  hover:bg-purple-900/10">
                                        <TableCell className="font-medium text-white border-r border-[#d9d9d91a] px-6 py-4">{item.name}</TableCell>
                                        <TableCell className="font-medium text-white border-r border-[#d9d9d91a] px-6 py-4">{item.title}</TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </div>
        </Card>
    )
}

export default KeyExecutives
