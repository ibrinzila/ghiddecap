import './globals.css'
import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'

export const metadata: Metadata = {
  title: 'Ghidul Jurnalistului pentru Coeziunea Sociala',
  description: 'Construind Punti, Nu Ziduri - Un ghid colaborativ pentru jurnalistii din Moldova',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro">
      <body className="bg-gray-50 min-h-screen">
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  )
}
