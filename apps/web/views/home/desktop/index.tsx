"use client";
import Hero from '../customs/hero'
import Clarity from '../customs/clarity'
import RankingSystem from '../customs/ranking-system'
import RealValuation from '../customs/real-valuation'

const HomePage = ({ dictionary }: { dictionary: any }) => {
    return (
        <main>
            <Hero dictionary={dictionary} />
            <Clarity dictionary={dictionary.homePage.featureOneSection} />
            <RankingSystem dictionary={dictionary.homePage.rankingSection} />
            <RealValuation dictionary={dictionary.homePage.realValuationSection} />
        </main>
    )
}

export default HomePage