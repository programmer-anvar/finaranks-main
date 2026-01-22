import ComingSoon from '@/components/coming-soon'
import Header from './customs/header';
import Body from './customs/body';


const NewsPage = ({ dictionary }: { dictionary: any }) => {
    return (
        <div className='app-container space-y-4'>
            <Header dictionary={dictionary.newsPage.newsPageHeader} />
            <Body dictionary={dictionary.newsPage.newsPageBody} />
        </div>
    )
}

export default NewsPage