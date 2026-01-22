import { getSeoMetadata } from "@/utils/helpers/seo";
import HomePage from "@/views/home/desktop";
import { getDictionary } from "@finranks/internationalization";


export const metadata = getSeoMetadata('homepage');
export default async function Home() {
  const dic = await getDictionary("en")
  return <HomePage dictionary={dic} />;
}
