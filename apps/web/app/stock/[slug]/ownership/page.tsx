import OwnerShipPage from "@/views/stock/ownership";
import { getDictionary } from "@finranks/internationalization";

export default async function Page({ params }: { params: any }) {
    const dic = await getDictionary("en");
    return <OwnerShipPage params={params} dictionary={dic} />;
}
