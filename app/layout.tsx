import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Rage Room Near Me — Find Rage Rooms Across the USA',
    template: '%s | Rage Room Near Me',
  },
  description: 'The most complete directory of rage rooms, smash rooms, and stress-relief venues across the USA. Search by city, state, or activity.',
  metadataBase: new URL('https://rageroomnearme.org'),
  openGraph: {
    siteName: 'Rage Room Near Me',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <script defer src="https://cloud.umami.is/script.js" data-website-id="3e49c146-0d71-4f29-9260-b37f007fca4f" />
      </head>
      <body className="min-h-screen flex flex-col bg-gray-50">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
