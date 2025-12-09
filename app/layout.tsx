import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import Footer from './components/footer'

const baseUrl = 'https://ossa-ma.github.io'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Ossama Chaib',
    template: '%s | Ossama Chaib',
  },
  description: "Ossama's portfolio.",
  openGraph: {
    title: 'Ossama Chaib',
    description: "Ossama's portfolio.",
    url: baseUrl,
    siteName: 'Ossama Chaib',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${baseUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: 'Ossama Chaib',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ossama Chaib',
    description: "Ossama's portfolio.",
    images: [`${baseUrl}/og.png`],
  },
  verification: {
    google: 'lfj8abXk0Gbd8ud0xCHKkE11WrJLt3drwNJe6KQCXio',
  },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white dark:text-white dark:bg-black',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <head>
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="34bb1a7b-b0fb-4194-8632-2fa4b14f33e9"
        />
      </head>
      <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}
