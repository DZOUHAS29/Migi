'use client'
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from "@chakra-ui/react";
import { ChartsContextProvider } from './contexts/charts';
import { RecordInfoContextProvider } from './contexts/record-info';
import { RecordsContextProvider } from './contexts/records';
import { AuthContextProvider } from './contexts/auth';
import { NotificationsContextProvider } from './contexts/notifications';

export function Providers({
  children
}: {
  children: React.ReactNode
}) {

  return (
    <CacheProvider>
      <ChakraProvider>
        <AuthContextProvider>
          <ChartsContextProvider>
            <NotificationsContextProvider>
              <RecordsContextProvider>
                <RecordInfoContextProvider>
                  {children}
                </RecordInfoContextProvider>
              </RecordsContextProvider>
            </NotificationsContextProvider>
          </ChartsContextProvider>
        </AuthContextProvider>
      </ChakraProvider>
    </CacheProvider>
  )
}