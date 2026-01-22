import DashboardPage from "@/views/profile/dashboard";
import { getDictionary } from "@finranks/internationalization";
export default async function Page() {
    const dic = await getDictionary("en");
    return <DashboardPage dictionary={dic} />;
}
