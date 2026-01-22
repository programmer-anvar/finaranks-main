import { getSeoMetadata } from "@/utils/helpers/seo";
import NewsPage from "@/views/news";
import { getDictionary } from "@finranks/internationalization";
export const metadata = getSeoMetadata('news page');
export default async function Page() {
    const dic = await getDictionary("en")
    return <NewsPage dictionary={dic} />;
}
