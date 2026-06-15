import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import Destinations from './sections/Destinations'
import FeaturedExperience from './sections/FeaturedExperience'
import WhySanbonani from './sections/WhySanbonani'
import Gallery from './sections/Gallery'
import Testimonials from './sections/Testimonials'
import ContactCTA from './sections/ContactCTA'
import Preloader from './components/Preloader'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.08,
      syncTouch: true,
    })
    lenisRef.current = lenis

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf as any)
    }
  }, [])

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
      <Preloader isLoading={isLoading} onComplete={handleLoadComplete} />
      <div
        className="relative"
        style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s ease' }}
      >
        <Navbar />
        <main>
          <Hero />
          <Destinations />
          <FeaturedExperience />
          <WhySanbonani />
          <Gallery />
          <Testimonials />
          <ContactCTA />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
