import ProfilePage from "@/views/stock/profile";
import { getDictionary } from "@finranks/internationalization";

export default async function Page({ params }: { params: any }) {
    const dic = await getDictionary("en");
    return <ProfilePage params={params} dictionary={dic} />;
}
