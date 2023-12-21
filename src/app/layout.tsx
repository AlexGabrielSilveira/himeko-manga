import Navbar from '@/components/header/Navbar'
import './globals.css'
import { AuthContextProvider } from '@/contexts/AuthContext'
import localFont from '@next/font/local'

const introHead = localFont({
  src: '../assets/fonts/introHead.otf',
  display: 'swap',
})

export const metadata = {
  title: 'Himeko',
  description: 'o melhor site de mangas!',
}

export default function RootLayout({ children }: {children: React.ReactNode}) {
  return (
    <html lang="pt_BR">
      <body className={introHead.className}>
        <AuthContextProvider>
            <Navbar />
            {children}
        </AuthContextProvider>
        </body>
    </html>
  )
}

