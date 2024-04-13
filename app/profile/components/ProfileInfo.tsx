"use client"
import React, { useEffect, useState } from 'react';
import { GrStatusGoodSmall } from "@react-icons/all-files/gr/GrStatusGoodSmall"
import { GrStatusWarningSmall } from "@react-icons/all-files/gr/GrStatusWarningSmall"
import { Icon } from '@chakra-ui/react'
import { checkHealth } from '@/app/status-actions';

export const ProfileInfo = () => {
    const [health, setHealth] = useState<boolean>(false);

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
        <div className='text-xl bg-ucla-dark-blue p-7 rounded'>
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
    )
}
