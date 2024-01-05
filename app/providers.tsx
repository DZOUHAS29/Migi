'use client'
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from "@chakra-ui/react";
import { ChartsContextProvider } from './contexts/charts';
import { SocketContextProvider } from './contexts/socket';
import { RecordInfoContextProvider } from './contexts/record-info';
import { RecordsContextProvider } from './contexts/records';

export function Providers({
  children
}: {
  children: React.ReactNode
}) {

  return (
    <CacheProvider>
      <ChakraProvider>
        <SocketContextProvider>
          <ChartsContextProvider>
            <RecordsContextProvider>
              <RecordInfoContextProvider>
                {children}
              </RecordInfoContextProvider>
            </RecordsContextProvider>
          </ChartsContextProvider>
        </SocketContextProvider>
      </ChakraProvider>
    </CacheProvider>
  )
}