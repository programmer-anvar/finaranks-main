import Link from "next/link";
import { formatDate } from "@finranks/design-system/lib/utils";
import { Play } from "lucide-react";

const VideoNewsCard = ({ item }: any) => {
    return (
        <Link href={item.news_url} target="_blank" className="block mb-5 hover:via-violet-700">
            <div className="relative pb-[54.6%] mb-4 overflow-hidden">
                <img className="absolute top-0 left-0 w-full h-full object-cover rounded-lg" src={item.image_url} alt="" />
                {/* ▶ Play Icon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="
                        flex items-center justify-center
                        h-16 w-16 rounded-full
                        bg-black/60
                        backdrop-blur
                        transition-all
                        group-hover:scale-110
                        group-hover:bg-black/80
                    ">
                        <Play className="h-8 w-8 text-white ml-1" />
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-medium text-[#909da2]">{formatDate(item.date)}</div>
                {item.sentiment && (
                    <div className="text-[#49aa19] bg-[#162312] border py-0 rounded px-1.5 text-sm">{item.sentiment}</div>
                )}
            </div>

            <div className="font-semibold text-white transition-all overflow-hidden ">
                {item.title}
            </div>
        </Link>
    );
};

export default VideoNewsCard;
