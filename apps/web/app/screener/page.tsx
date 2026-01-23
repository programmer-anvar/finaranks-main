import ScreenerPage from "@/views/screener";
import { getDictionary } from "@finranks/internationalization";

export default async function Page() {
    const dic = await getDictionary("en");
    return <ScreenerPage dictionary={dic} />;
}
