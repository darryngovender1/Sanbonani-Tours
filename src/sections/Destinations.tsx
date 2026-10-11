import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const destinations = [
  {
    image: '/images/hero-dest-safari.jpg',
    title: 'Big Five Safari',
    subtitle: 'Hluhluwe-Imfolozi \u0026 Phinda',
  },
  {
    image: '/images/hero-dest-coastal.jpg',
    title: 'Coastal Wilderness',
    subtitle: 'iSimangaliso Wetland Park',
  },
  {
    image: '/images/hero-dest-mountain.jpg',
    title: 'Highland Retreats',
    subtitle: 'Drakensberg Mountains',
  },
]

export default function Destinations() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Heading animation
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // Cards stagger animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.dest-card')
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="destinations"
      className="w-full py-24 md:py-32 px-[5vw]"
      style={{ background: '#0F2E2E' }}
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div ref={headingRef} className="mb-16">
          <div className="section-label">Destinations</div>
          <h2 className="section-heading">Three Landscapes, One Province</h2>
        </div>

        {/* Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {destinations.map((dest, i) => (
            <div
              key={i}
              className="dest-card group relative overflow-hidden cursor-pointer"
              style={{ aspectRatio: '3/4' }}
            >
              <img
                src={dest.image}
                alt={dest.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                loading="lazy"
              />
              {/* Overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-600"
                style={{
                  background:
                    'linear-gradient(to top, rgba(15,46,46,0.85) 0%, rgba(15,46,46,0.4) 40%, transparent 100%)',
                }}
              />
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-2xl uppercase text-cream mb-1">
                  {dest.title}
                </h3>
                <p className="font-body font-light text-sm" style={{ color: 'rgba(245,240,230,0.6)' }}>
                  {dest.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
