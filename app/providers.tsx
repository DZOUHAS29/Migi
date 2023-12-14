'use client'
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from "@chakra-ui/react";
import { ChartsContextProvider } from './contexts/charts';

export function Providers({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <CacheProvider>
      <ChakraProvider>
          <ChartsContextProvider>
            {children}
          </ChartsContextProvider>
      </ChakraProvider>
    </CacheProvider>
  )
}