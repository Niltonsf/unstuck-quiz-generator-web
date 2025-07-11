import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import QueryClientProvider from '@/providers/query-client-provider'

const interFont = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Unstuck',
  description: 'Generate quizzes from your notes',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={interFont.variable}>
      <body className={`antialiased`}>
        <QueryClientProvider>{children}</QueryClientProvider>
        <Toaster />
      </body>
    </html>
  )
}
