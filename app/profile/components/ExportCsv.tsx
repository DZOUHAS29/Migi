import { Button } from '@chakra-ui/react'
import moment from 'moment'
import React from 'react'

export const ExportCsv = () => {
    return (
        <div className='flex justify-between'>
            <div className='text-md self-center font-semibold'>
                {moment().format("DD MMMM YYYY")}
            </div>
            <div>
                <Button
                    variant={'outline'}
                    className='text-white hover:bg-black hover:bg-opacity-5'
                >
                    Export csv
                </Button>
            </div>
        </div>
    )
}
