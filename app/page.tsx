import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import SignatureDishes from '@/components/SignatureDishes'
import Experience from '@/components/Experience'
import ChefShowcase from '@/components/ChefShowcase'
import Testimonials from '@/components/Testimonials'
import Gallery from '@/components/Gallery'
import Reservation from '@/components/Reservation'
import Footer from '@/components/Footer'
import MarqueeSection from '@/components/MarqueeSection'

export default function Home() {
  return (
    <main className="relative bg-obsidian overflow-hidden">
      <Navbar />
      <Hero />
      <MarqueeSection />
      <SignatureDishes />
      <Experience />
      <ChefShowcase />
      <Testimonials />
      <Gallery />
      <Reservation />
      <Footer />
    </main>
  )
}
