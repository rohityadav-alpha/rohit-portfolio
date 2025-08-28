import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rohit Yadav - Portfolio',
  description: 'Full-Stack Developer Portfolio',
}

interface RootLayoutProps {
  children: React.ReactNode
  modal?: React.ReactNode  // Add this line for intercepting routes
}

export default function RootLayout({
  children,
  modal
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {modal}
        <div id="modal-root" />
      </body>
    </html>
  )
}
