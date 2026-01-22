import React from 'react'
import Header from './customs/header'
import Body from './customs/body'

const DashboardPage = ({ dictionary }) => {
    return (
        <div>
            <Header dictionary={dictionary.profilePage.profilePageHeader} />
            < Body dictionary={dictionary.profilePage.profilePageBody} />
        </div>
    )
}

export default DashboardPage