"use client"
import { Card } from '@finranks/design-system/components/card'
import { Typography } from '@finranks/design-system/components/typography'
import { get, truncate } from 'lodash';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const About = ({ info, dictionary }: any) => {
    const { slug } = useParams();
    const dic = dictionary?.stock?.stockMain?.summaryTab?.aboutCompany || {};
    const na = dic.na || "N/A";
    const readMore = dictionary?.homePage?.readMore || "read more";

    const description = get(info, 'description') ? info.description : "";
    const ceo = get(info, 'ceo') ? info.ceo : "";
    const country = get(info, 'country') ? info.country : "";
    const ipoDate = get(info, 'ipoDate') ? info.ipoDate : "";
    const employees = get(info, 'employees') ? Number(info.employees) : 0;
    const fiscalYearEnd = get(info, 'fiscalYearEnd') ? info.fiscalYearEnd : "";
    const website = get(info, 'website') ? info.website : "";

    const COMPANY_FACTS = [
        { label: dic.ceoLabel || "CEO", value: ceo ?? na },
        { label: dic.countryLabel || "Country", value: country ?? na },
        { label: dic.ipoDateLabel || "IPO Date", value: ipoDate ?? na },
        { label: dic.employeesLabel || "Employees", value: employees ?? na },
        { label: dic.fiscalYearEndLabel || "Fiscal Year End", value: fiscalYearEnd ?? na },
        {
            label: dic.websiteLabel || "Website",
            value: (
                website ? <Link
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold underline-offset-4 hover:underline hover:text-purple-600 transition-colors duration-300"
                >
                    {truncate(website, { length: 30, omission: "..." })}
                </Link > : na
            ),
        },
    ];

    return (
        <Card className='space-y-4 flex flex-col rounded-[20px] p-4 md:p-6'>
            <Typography variant="h4" as="h2">{dic.aboutCompanyTitle}</Typography>

            <div>
                <Typography variant='body' className='text-[14px]' as="div">      {get(info, 'description', '').slice(0, 430)}
                    {description.length > 430 && (
                        <>
                            ... <Link href={`/stock/${slug}/profile`} className="text-purple-600">{readMore}</Link>
                        </>
                    )}</Typography>
            </div>

            <dl className="space-y-2 mt-auto">
                {COMPANY_FACTS.map(({ label, value }) => (
                    <div
                        key={label}
                        className="flex items-center justify-between border-b border-[#ffffff33]"
                    >
                        <dt className="text-white text-[14px]">{label}</dt>
                        <dd className="font-semibold text-white text-right text-[14px]">{value}</dd>
                    </div>
                ))}
            </dl>
        </Card>
    )
}

export default About
