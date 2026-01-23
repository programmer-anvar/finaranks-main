import ForecastPage from "@/views/stock/forecast";
import { getDictionary } from "@finranks/internationalization";

export default async function Page({ params }: { params: any }) {
    const dic = await getDictionary("en");
    return <ForecastPage params={params} dictionary={dic} />;
}
