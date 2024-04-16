"use client"
import { csvRecords } from '@/app/record-actions'
import { Button } from '@chakra-ui/react'
import moment from 'moment'
import React from 'react'
import { parse } from 'csv-parse';

export const ExportCsv = () => {


    const handle = async () => {
        const result = await csvRecords();

        if (typeof result === "number")
            return;

        const filename = `${moment().format("YYYY-MM-DD")}-migi-export`;

        const csvContent = `${Object.keys(result[0]).join(",")}\n${result.map(row => Object.values(row).join(',')).join('\n')}`;


        parse(csvContent, {
            columns: true, 
        }, (err) => {
            if (err) {
                console.error('Error parsing CSV:', err);
                return;
            }

            // Blob
            const blob = new Blob([csvContent], { type: 'text/csv' });

            // Url pro blob
            const url = window.URL.createObjectURL(blob);

            // Novy temp tlacitko pro stahovani
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${filename}.csv`);

            // prida element a klikne na nej
            document.body.appendChild(link);
            link.click();

            // odstrani temp tlacitko
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        });

    }

    return (
        <div className='flex justify-between'>
            <div className='text-md self-center font-semibold'>
                {moment().format("DD MMMM YYYY")}
            </div>
            <div>
                <Button
                    variant={'outline'}
                    className='text-white hover:bg-black hover:bg-opacity-5'
                    onClick={handle}
                >
                    Export csv
                </Button>
            </div>
        </div>
    )
}
