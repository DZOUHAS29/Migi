import React from 'react'
import { ProfileInfo } from './components/ProfileInfo'
import Auth from '../auth'
import { ProfileGraphs } from './components/ProfileGraphs'
import { ExportCsv } from './components/ExportCsv'

export default function Profile() {
    return (
        <div className='flex flex-col space-y-4 pl-9 pr-9'>
            <Auth />
            <div>
                <ProfileInfo />
            </div>
            <div>
                <ExportCsv />
            </div>
            <div>
                <ProfileGraphs />
            </div>
        </div>
    )
}
