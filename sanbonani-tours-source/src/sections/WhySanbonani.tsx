import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#CBA77D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="24" r="20" />
        <path d="M24 14v10l7 7" />
        <path d="M12 24h4M32 24h4M24 12v4M24 32v4" />
      </svg>
    ),
    title: 'Local Expertise',
    body: 'Born and raised in KwaZulu-Natal. Our guides know every track, every seasonal migration, every hidden viewpoint.',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#CBA77D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 4L6 14v20l18 10 18-10V14L24 4z" />
        <path d="M24 24v20M24 24L6 14M24 24l18-10" />
        <circle cx="24" cy="24" r="6" />
      </svg>
    ),
    title: 'Conservation First',
    body: 'A portion of every booking supports conservation and community upliftment in rural Zululand.',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#CBA77D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 4l4 10h10l-8 7 3 10-9-6-9 6 3-10-8-7h10z" />
        <circle cx="24" cy="34" r="4" />
        <path d="M20 38l-4 6M28 38l4 6" />
      </svg>
    ),
    title: 'Bespoke by Design',
    body: 'No two journeys are the same. Every itinerary is crafted around your pace, your interests, your travel style.',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#CBA77D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="16" r="6" />
        <circle cx="30" cy="16" r="6" />
        <circle cx="24" cy="28" r="6" />
        <path d="M12 38c0-6 5.37-10 12-10s12 4 12 10" />
      </svg>
    ),
    title: 'Small Groups',
    body: 'Maximum six guests per vehicle. Intimate wildlife encounters, unhurried photography, personal connection.',
  },
]

export default function WhySanbonani() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
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

      if (gridRef.current) {
        const items = gridRef.current.querySelectorAll('.feature-item')
        gsap.fromTo(
          items,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
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
      id="about"
      className="w-full py-24 md:py-32 px-[5vw]"
      style={{ background: '#0F2E2E' }}
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div ref={headingRef} className="mb-16">
          <div className="section-label">Why Us</div>
          <h2 className="section-heading">Rooted in This Land</h2>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {features.map((feature, i) => (
            <div key={i} className="feature-item">
              <div className="mb-6">{feature.icon}</div>
              <h3 className="font-display text-xl uppercase text-cream mb-3">
                {feature.title}
              </h3>
              <p
                className="font-body font-light text-sm leading-relaxed"
                style={{ color: 'rgba(245,240,230,0.6)' }}
              >
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
