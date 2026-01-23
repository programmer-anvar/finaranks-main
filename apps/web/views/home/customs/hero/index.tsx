"use client"

import { Typography } from "@finranks/design-system/components/typography";
import SearchBar from "./customs/searchbar";

const Hero = ({ dictionary }: { dictionary: any }) => {
    return (
        <section id="hero" className="h-[630px]">
            <img src="/images/home-top-lines.svg" alt="" className='absolute top-0 left-0  w-full opacity-30' />
            <div className="app-container">
                <div className="relative">
                    <img
                        className={`
                           home-search__decor_1
                           absolute top-[18%] left-[15%]
                        `}
                        src="/images/home-decor-1.svg"
                        alt=""
                    />
                    <img
                        className={`
                           home-search__decor_2
                           absolute top-[75%] left-4 md:top-[120%] md:left-0
                        `}
                        src="/images/home-decor-2.svg"
                        alt=""
                    />
                    <img
                        className="home-search__decor_3 absolute top-[55%] md:top-[180%] right-4 md:right-0"
                        src="/images/home-decor-3.svg"
                        alt=""
                    />
                    <img
                        className="home-search__decor_4 hidden md:block absolute top-[199%] right-[18%]"
                        src="/images/home-decor-4.svg"
                        alt=""
                    />
                    <div className="absolute top-[60px] md:top-[150px] w-full right-0 left-0 flex justify-center">
                        <button className=" home-search__btn">
                            <span>{dictionary.betaVersion || "Beta version"}</span>
                        </button>
                    </div>
                    <Typography variant="h1" align="center" className=" text-white! w-full text-center text-[25px]  md:text-[62px] md:leading-[76px] font-bold! absolute top-[25px] md:top-[250px] right-0 left-0 ">{dictionary.heroTitle}</Typography>
                    <SearchBar dictionary={dictionary} />
                </div>
            </div>
        </section>
    )
}

export default Hero
