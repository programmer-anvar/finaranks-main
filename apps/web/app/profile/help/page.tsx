import HelpPage from "@/views/profile/help";
import { getDictionary } from "@finranks/internationalization";

export default async function Page() {
    const dic = await getDictionary("en");
    return <HelpPage dictionary={dic} />;
}
