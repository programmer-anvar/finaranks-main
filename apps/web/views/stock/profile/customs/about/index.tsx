import EmptyState from '@/components/empty-state'
import { Card } from '@finranks/design-system/components/card'
import { Typography } from '@finranks/design-system/components/typography'

const About = ({ description }: { description: string }) => {
    const isEmpty = !description || description.trim().length === 0

    if (isEmpty) {
        return <EmptyState title='About the company' />
    }
    return (
        <Card className="p-4 md:p-6 rounded-xl space-y-5">
            <Typography
                variant="h2"
                className="text-[20px]!"
                weight="semibold"
            >
                About the company
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
