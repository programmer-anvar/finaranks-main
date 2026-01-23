import PrivacyPolicyPage from "@/views/privacy-policy";
import { getDictionary } from "@finranks/internationalization";

export const metadata = {
    title: 'Privacy Policy | FinRanks',
    description: 'FinRanks Privacy Policy - How we collect, use, and protect your data',
};

export default async function Page() {
    const dic = await getDictionary("en");
    return <PrivacyPolicyPage dictionary={dic} />;
}
