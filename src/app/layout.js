import Navbar from '@/components/header/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Himeko',
  description: 'o melhor site de mangas!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt_BR">
      <body className={inter.className}>
          <Navbar />
          {children}
        </body>
    </html>
  )
}
