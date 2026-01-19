import { Typography } from '@finranks/design-system/components/typography'

type TData = {
    headline: string;
}

type TRendingHeadlines = {
    data: TData[]
}

const HeadlineList = ({ data }: TRendingHeadlines) => {
    return (
        <div className='space-y-2'>
            <Typography variant="h3" color="primary" weight="bold" className='text-xl md:text-2xl'>Trending headlines</Typography>

            <ul className="space-y-2">
                {
                    data.map((headline, index) => (
                        <Typography variant="small" as="li" color="helper" className='text-xs md:text-sm' key={index}>{index + 1}. {headline.headline}</Typography>
                    ))
                }
            </ul>
        </div>
    )
}

export default HeadlineList