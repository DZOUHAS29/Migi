"use client"
import { Input } from '@chakra-ui/react';
import React from 'react'

interface SettingCompProps {
    value: string;
}

export const PasswordComp = ({ value }: SettingCompProps) => {
    return (
        <div className='flex flex-col gap-y-2'>
            <div className='text-xl font-semibold'>
                Old password
            </div>
            <div>
                <Input
                    type="password"
                    variant={"flushed"}
                    defaultValue={value}
                    size={'lg'}
                />
            </div>
            <div className='text-xl font-semibold'>
                New password
            </div>
            <div>
                <Input
                    type="password"
                    variant={"flushed"}
                    size={'lg'}
                />
            </div>
            <div className='text-xl font-semibold'>
                Check new password
            </div>
            <div>
                <Input
                    type="password"
                    variant={"flushed"}
                    size={'lg'}
                />
            </div>
        </div>
    )
}
