import { Card } from '@finranks/design-system/components/card'
import { Typography } from '@finranks/design-system/components/typography'

const EmptyState = ({ title, className, dictionary }: { title?: string, className?: string, dictionary?: any }) => {
    const dic = dictionary?.common;
    
    return (
        <Card className={`w-full rounded-[20px] p-4 md:p-6 ${className || ''}`}>
            <Typography variant="h4" as="h2" className='pb-0'>{title || dic?.dataUnavailable}</Typography>
            <div className='w-full h-100 flex items-center justify-center flex-col'>
                <Typography variant="body" as="h2" color='helper' className='pb-0'>{dic?.noData}</Typography>
                <Typography variant="small" as="p" color='helper' className='pb-0' align='center'>{dic?.noDataDescription}</Typography>
            </div>
        </Card>
    )
}

export default EmptyState
