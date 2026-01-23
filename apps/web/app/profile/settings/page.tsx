import SettingsPage from "@/views/profile/settings";
import { getDictionary } from "@finranks/internationalization";

export default async function Page() {
    const dic = await getDictionary("en");
    return <SettingsPage dictionary={dic} />;
}
