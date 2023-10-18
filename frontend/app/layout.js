import './globals.css'
import localFont from 'next/font/local'
import Providers from './providers'
import { Toaster } from 'react-hot-toast'

const ayuthaya = localFont({
  src: './Ayuthaya.ttf',
  variable: '--font-ayuthaya',
})

export const metadata = {
  title: 'Avana Game Studio LLC',
  description: 'WebApp for Avana Game Studio LLC',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${ayuthaya.variable} font-sans`}>
        <Providers>{children}</Providers>
        <Toaster position='top-right'/>
      </body>
    </html>
  )
}
