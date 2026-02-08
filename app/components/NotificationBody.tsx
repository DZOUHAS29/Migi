"use client"
import { CloseButton, Icon } from '@chakra-ui/react'
import { GrStatusWarningSmall } from '@react-icons/all-files/gr/GrStatusWarningSmall'
import React from 'react'
import { removeNotification } from '../status-actions';
import { useRouter } from 'next/navigation';

interface NotificationBodyProps {
    message: string;
    id: number;
}

export const NotificationBody = ({ message, id }: NotificationBodyProps) => {
    const { push } = useRouter();

    const handleDelete = async () => {
        const removed = await removeNotification(id);

        if (typeof removed === "number")
            return;
    }

    return (
        <div
            className="bg-ucla-dark-blue hover:cursor-pointer hover:bg-air-blue rounded p-2 flex items-center justify-between"
        >
            <div>
                <Icon
                    as={GrStatusWarningSmall}
                    className='text-orange-400 self-center'
                />
            </div>
            <div
                onClick={() => { push("/profile") }}
            >
                {message}
            </div>
            <div>
                <CloseButton onClick={handleDelete} />
            </div>
        </div>
    )
}
