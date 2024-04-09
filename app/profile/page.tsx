import React from 'react'
import { ProfileInfo } from './components/ProfileInfo'
import Auth from '../auth'
import { ProfileGraphs } from './components/ProfileGraphs'

export default function Profile() {
    return (
        <div className='flex flex-col space-y-2'>
            <Auth />
            <div>
                <ProfileInfo />
            </div>
            <div>
                <ProfileGraphs />
            </div>
        </div>
    )
}
