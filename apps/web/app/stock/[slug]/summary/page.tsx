import SummaryPage from "@/views/stock/summary";
import { getDictionary } from "@finranks/internationalization";
export default async function Page({ params }: any) {
    const dic = await getDictionary("en")
    return <SummaryPage params={params} dictionary={dic} />;
}