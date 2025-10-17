import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ActivityNotifications } from '@/components/layout/ActivityNotifications'
import { CartReminderBanner } from '@/components/layout/CartReminderBanner'
import { LivePurchaseNotifications } from '@/components/ui/LivePurchaseNotifications'
import { CartSidebar } from '@/domains/cart/components/CartSidebar'
import { ExitIntentHandler } from '@/components/modals/ExitIntentHandler'
import { EmailCaptureHandler } from '@/components/modals/EmailCaptureHandler'
import { ProductComparison } from '@/domains/catalog/components/ProductComparison'
import { ComparisonFloatingButton } from '@/domains/catalog/components/ComparisonFloatingButton'
import { LiveChatWidget } from '@/components/chat/LiveChatWidget'
import { Providers } from './providers'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '600', '800'],
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'DFRNT - Biohacking Supplements & Performance Products',
  description:
    'Elevate your performance with science-backed biohacking products. Shop supplements, blue-light blocking glasses, and more.',
  keywords: ['biohacking', 'supplements', 'nootropics', 'blue-light glasses', 'performance'],
  openGraph: {
    title: 'DFRNT - Biohacking Supplements & Performance Products',
    description: 'Elevate your performance with science-backed biohacking products.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-black font-sans text-neutral-50 antialiased">
        <Providers>
          <div className="flex min-h-screen flex-col bg-black">
            <AnnouncementBar />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <CartSidebar />
          <ProductComparison />
          <ComparisonFloatingButton />
          <ActivityNotifications />
          <CartReminderBanner />
          <LivePurchaseNotifications />
          <ExitIntentHandler />
          <EmailCaptureHandler />
          <LiveChatWidget />
        </Providers>
      </body>
    </html>
  )
}
