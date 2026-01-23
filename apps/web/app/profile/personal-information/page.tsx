import PersonalInformationPage from "@/views/profile/personal-information";
import { getDictionary } from "@finranks/internationalization";

export default async function Page() {
    const dic = await getDictionary("en");
    return <PersonalInformationPage dictionary={dic} />;
}
