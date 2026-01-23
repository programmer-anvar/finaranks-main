import FinancialPage from "@/views/stock/financial";
import { type SearchParams } from "nuqs/server";
import { getDictionary } from "@finranks/internationalization";

export default async function Page({ params, searchParams }: { params: any, searchParams: Promise<SearchParams> }) {
    const dic = await getDictionary("en");
    return <FinancialPage params={params} searchParams={searchParams} dictionary={dic} />;
}
