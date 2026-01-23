import TransactionsPage from "@/views/profile/transactions";
import { getDictionary } from "@finranks/internationalization";

export default async function Page() {
    const dic = await getDictionary("en");
    return <TransactionsPage dictionary={dic} />;
}
