import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import TopBar from './components/TopBar';
import Auth from './auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Migi App',
  description: 'Track your headaches!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-ucla-blue h-screen text-white`}>
        <Providers>
          <TopBar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
