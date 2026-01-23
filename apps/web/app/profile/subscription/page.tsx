import SubscriptionPage from "@/views/profile/subscription";
import { getDictionary } from "@finranks/internationalization";

export default async function Page() {
    const dic = await getDictionary("en");
    return <SubscriptionPage dictionary={dic} />;
}
