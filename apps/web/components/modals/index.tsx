"use client"
import { useModals } from '@/stores/modal'
import React from 'react'
import RegisterModal from './auth/register'
import SignInModal from './auth/sign-in'
import ForgotPassword from './auth/forgot-password'
import AddWatchListModal from './watchlist/add-watchlist'
import ManageWatchListModal from './watchlist/manage-watchlist'
import AddStockModal from './stock/add-stock'

const Modals = ({ dictionary }: { dictionary?: any }) => {
    const { register, signIn, forgotPassword, addWatchList, manageWatchList, addStock } = useModals()
    return (
        <>
            {register && <RegisterModal dictionary={dictionary} />}
            {signIn && <SignInModal dictionary={dictionary} />}
            {forgotPassword && <ForgotPassword dictionary={dictionary} />}
            {addWatchList && <AddWatchListModal dictionary={dictionary} />}
            {manageWatchList && <ManageWatchListModal dictionary={dictionary} />}
            {addStock && <AddStockModal dictionary={dictionary} />}
        </>
    )
}

export default Modals
