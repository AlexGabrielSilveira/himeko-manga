import Navbar from '@/components/header/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import { AuthContextProvider } from '@/contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Himeko',
  description: 'o melhor site de mangas!',
}

export default function RootLayout({ children }: {children: React.ReactNode}) {
  return (
    <html lang="pt_BR">
      <body className={inter.className}>
        <AuthContextProvider>
            <Navbar />
            {children}
        </AuthContextProvider>
        </body>
    </html>
  )
}
