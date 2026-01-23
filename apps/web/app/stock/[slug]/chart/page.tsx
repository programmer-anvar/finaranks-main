import ChartPage from "@/views/stock/chart";
import { getDictionary } from "@finranks/internationalization";

export default async function Page({ params }: { params: any }) {
    const dic = await getDictionary("en");
    return <ChartPage params={params} dictionary={dic} />;
}
