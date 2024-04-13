import { CloseButton, Icon } from '@chakra-ui/react'
import { GrStatusWarningSmall } from '@react-icons/all-files/gr/GrStatusWarningSmall'
import React from 'react'

interface NotificationBodyProps {
    message: string;
}

export const NotificationBody = ({ message }: NotificationBodyProps) => {
    return (
        <div className="bg-ucla-dark-blue shadow-md rounded p-2 flex items-center justify-between">
            <div>
                <Icon
                    as={GrStatusWarningSmall}
                    className='text-orange-400 self-center'
                />
            </div>
            <div>
                {message}
            </div>
            <div>
                <CloseButton />
            </div>
        </div>
    )
}
