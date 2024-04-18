"use client"
import { Input } from '@chakra-ui/react';
import React from 'react'

interface SettingCompProps {
    name: string;
    value: string;
    type: string;
}

export const SettingComp = ({ name, value, type }: SettingCompProps) => {
    return (
        <div className='flex flex-col pt-2'>
            <div className='font-semibold text-xl'>
                {name}
            </div>
            <div>
                <Input
                    type={type}
                    defaultValue={value}
                    variant={'flushed'}
                    size={'lg'}
                />
            </div>
        </div>
    )
}
