import type { Metadata } from 'next'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'
import CustomCursor from '@/components/CustomCursor'

export const metadata: Metadata = {
  title: 'Ember & Ash — Fine Dining Experience',
  description: 'Where culinary art meets cinematic ambiance. Experience luxury dining reimagined at Ember & Ash, a sanctuary of taste and elegance.',
  keywords: ['luxury restaurant', 'fine dining', 'culinary experience', 'premium restaurant'],
  openGraph: {
    title: 'Ember & Ash — Fine Dining Experience',
    description: 'Where culinary art meets cinematic ambiance.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
