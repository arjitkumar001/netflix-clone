'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from './Components/Footer'
import NavBar from './Components/Nabar'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{backgroundColor:"#171717"}}>
        <NavBar/>
        {children}
        <Footer />
      </body>
    </html>
  )
}

