'use client'
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from "@chakra-ui/react";
import { ChartsContextProvider } from './contexts/charts';
import { SocketContextProvider } from './contexts/socket';
import { RecordInfoContextProvider } from './contexts/record-info';

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
            <RecordInfoContextProvider>
              {children}
            </RecordInfoContextProvider>
          </ChartsContextProvider>
        </SocketContextProvider>
      </ChakraProvider>
    </CacheProvider>
  )
}