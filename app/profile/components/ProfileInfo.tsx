"use client"
import React, { useEffect, useState } from 'react';
import { FaUser } from "@react-icons/all-files/fa/FaUser"
import { GrStatusGoodSmall } from "@react-icons/all-files/gr/GrStatusGoodSmall"
import { GrStatusWarningSmall } from "@react-icons/all-files/gr/GrStatusWarningSmall"
import { Icon } from '@chakra-ui/react'
import { useAuth } from '@/app/contexts/auth';
import { checkHealth } from '@/app/status-actions';

export const ProfileInfo = () => {
    const [health, setHealth] = useState<boolean>(false);
    const { auth: { email, username } } = useAuth();

    const check = async (): Promise<void> => {
        const data = await checkHealth();

        if (data.variant === "error")
            return;

        if (data.message === "bad")
            return setHealth(false);

        return setHealth(true);
    }

    useEffect(() => {
        check();
    }, [])


    return (
        <div className='flex space-x-4'>
            <div className='text-center text-9xl'>
                <Icon
                    as={FaUser}
                />
            </div>
            <div className='flex flex-col'>
                <div className='text-3xl'>
                    {username}
                </div>
                <div className='text-xl'>
                    {email}
                </div>
                <div className='text-xl'>
                    {
                        health ?
                            <div className='flex space-x-2'>
                                <div className='self-center text-sm'>
                                    <Icon
                                        as={GrStatusGoodSmall}
                                        className='text-green-500'
                                    />
                                </div>
                                <div>
                                    You're health is perfectly fine!
                                </div>
                            </div>
                            :
                            <div className='flex space-x-2'>
                                <div className='self-center text-lg'>
                                    <Icon
                                        as={GrStatusWarningSmall}
                                        className='text-orange-400'
                                    />
                                </div>
                                <div>
                                    You're health status is concerning!
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}
