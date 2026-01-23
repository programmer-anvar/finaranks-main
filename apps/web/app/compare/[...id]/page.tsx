import ComparePage from "@/views/compare";
import { getDictionary } from "@finranks/internationalization";

export default async function Page({ params }: { params: Promise<{ id: string }>; }) {
    const dic = await getDictionary("en");
    return <ComparePage params={params} dictionary={dic} />;
}
