import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from '../sections/Hero'
import Destinations from '../sections/Destinations'
import FeaturedExperience from '../sections/FeaturedExperience'
import WhySanbonani from '../sections/WhySanbonani'
import ThingsToDo from '../sections/ThingsToDo'
import Gallery from '../sections/Gallery'
import Testimonials from '../sections/Testimonials'
import ContactCTA from '../sections/ContactCTA'
import Preloader from '../components/Preloader'
import { usePageMeta, JsonLd, SITE_URL } from '../lib/seo'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  usePageMeta({ path: '/' })

  useEffect(() => {
    // Set up scroll animation observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const timeout = setTimeout(() => {
      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.observe(el)
      })
    }, 100)

    return () => {
      clearTimeout(timeout)
      observer.disconnect()
    }
  }, [isLoading])

  const handleLoadComplete = () => {
    setIsLoading(false)
    // Refresh ScrollTrigger after content loads
    setTimeout(() => ScrollTrigger.refresh(), 100)
  }

  return (
    <>
      {/* Business identity structured data — keep in sync with the Google Business Profile */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'TravelAgency',
          name: 'Sanbonani Tours',
          url: `${SITE_URL}/`,
          telephone: '+27688163622',
          email: 'info@sanbonanitours.co.za',
          slogan: 'Unleash Your South African Adventure',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '73 Oceanview',
            addressLocality: 'Tinley Manor',
            addressRegion: 'KwaZulu-Natal',
            addressCountry: 'ZA',
          },
          areaServed: ['KwaZulu-Natal', 'Dolphin Coast', 'Ballito', 'Durban'],
          sameAs: [
            'https://facebook.com/sanbonanitours',
            'https://instagram.com/sanbonanitours',
            'https://twitter.com/sanbonanitours',
          ],
        }}
      />
      <Preloader isLoading={isLoading} onComplete={handleLoadComplete} />
      <div
        className="relative"
        style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s ease' }}
      >
        <main>
          <Hero />
          <Destinations />
          <FeaturedExperience />
          <WhySanbonani />
          <ThingsToDo />
          <Gallery />
          <Testimonials />
          <ContactCTA />
        </main>
      </div>
    </>
  )
}
