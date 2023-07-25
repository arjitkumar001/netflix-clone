'use client'
import './globals.css'
// import { Inter } from 'next/font/google'

import Footer from './Components/Footer'
import NavBar from './Components/NavBar'
import { Suspense } from 'react'
// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Netflix app',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <html>
      <body  style={{backgroundColor:"#171717"}}>
      
       <NavBar/>
        {children}
       <Footer /> 
     
      </body>
    </html>
   
  )
}

