import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {NavBar} from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Watchdog',
  description: 'Watchdog made by Brandy223'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200&display=swap');
      </style>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
