import DevidensPage from "@/views/stock/devidens";
import { getDictionary } from "@finranks/internationalization";

export default async function Page({ params }: { params: any }) {
    const dic = await getDictionary("en");
    return <DevidensPage params={params} dictionary={dic} />;
}
