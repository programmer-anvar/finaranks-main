import StockNewsPage from "@/views/stock/news";
import { getDictionary } from "@finranks/internationalization";

export default async function Page({ params }: { params: any }) {
    const dic = await getDictionary("en");
    return <StockNewsPage params={params} dictionary={dic} />;
}
