import { getSeoMetadata } from "@/utils/helpers/seo";
import NewsPage from "@/views/news";
export const metadata = getSeoMetadata('news page');
export default function Page() {
    return <NewsPage />;
}
