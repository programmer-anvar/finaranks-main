import { getSeoMetadata } from "@/utils/helpers/seo";
import HomePage from "@/views/home/desktop";


export const metadata = getSeoMetadata('homepage');
export default function Home() {
  return <HomePage />;
}
