"use client"
import { useModals } from '@/stores/modal'
import { Button } from '@finranks/design-system/components/Button'
import { Typography } from '@finranks/design-system/components/typography'
import { List, PlusIcon } from 'lucide-react'

const Header = ({ dictionary }) => {
    console.log('dic', dictionary)
    const { setModal } = useModals()
    return (
        <div className='flex md:items-center justify-between flex-col md:flex-row gap-4'>
            <Typography variant='h4'>{dictionary.watchlist}</Typography>
            <div className='flex items-center gap-4'>
                <Button prepend={<PlusIcon />} onClick={() => setModal({ addWatchList: true })}>{dictionary.watchListBtn}</Button>
                <Button variant='outline' prepend={<List />} onClick={() => setModal({ manageWatchList: true })}>{dictionary.manageWatchlist}</Button>
            </div>
        </div>
    )
}

export default Header