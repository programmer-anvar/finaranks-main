import EmptyState from '@/components/empty-state'
import { Card } from '@finranks/design-system/components/card'
import { Typography } from '@finranks/design-system/components/typography'

const About = ({ description, dictionary }: { description: string, dictionary?: any }) => {
    const dic = dictionary?.stock?.stockMain?.profileTab?.aboutCompany;
    const isEmpty = !description || description.trim().length === 0

    if (isEmpty) {
        return <EmptyState title={dic?.aboutCompanyTitle} dictionary={dictionary} />
    }
    return (
        <Card className="p-4 md:p-6 rounded-xl space-y-5">
            <Typography
                variant="h2"
                className="text-[20px]!"
                weight="semibold"
            >
                {dic?.aboutCompanyTitle}
            </Typography>

            <Typography
                variant="body"
                className="text-[14px]!"
                weight="semibold"
            >
                {description}
            </Typography>
        </Card >
    )
}

export default About
