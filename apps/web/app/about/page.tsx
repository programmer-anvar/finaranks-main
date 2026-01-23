import AboutPage from "@/views/about";
import { getDictionary } from "@finranks/internationalization";

export default async function Page() {
    const dic = await getDictionary("en");
    return <AboutPage dictionary={dic} />;
}
