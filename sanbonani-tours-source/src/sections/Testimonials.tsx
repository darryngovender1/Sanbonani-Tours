import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote:
      "Sanbonani didn't just show us animals \u2014 they connected us to the landscape, the people, the rhythm of Zululand.",
    author: 'Margaret T.',
    location: 'Cape Town',
  },
  {
    quote:
      'Our guide spotted a leopard in a fever tree at dusk. That moment will stay with me forever.',
    author: 'David \u0026 Anne K.',
    location: 'Durban',
  },
  {
    quote:
      'From the first email to the final airport transfer, every detail was seamless. True luxury is not having to think.',
    author: 'Sarah L.',
    location: 'Cape Town',
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

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

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.testimonial-card')
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.2,
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
      id="testimonials"
      className="w-full py-24 md:py-32 px-[5vw]"
      style={{ background: '#1A2E2E' }}
    >
      <div className="max-w-[800px] mx-auto">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-16">
          <div className="section-label">Traveller Stories</div>
          <h2 className="section-heading">Words from the Bush</h2>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="space-y-12">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card relative pl-12 md:pl-16"
            >
              {/* Large quotation mark */}
              <span
                className="absolute top-0 left-0 font-display text-[80px] md:text-[120px] leading-none select-none pointer-events-none"
                style={{ color: 'rgba(203,167,125,0.15)' }}
              >
                &ldquo;
              </span>

              {/* Quote */}
              <blockquote
                className="font-display italic text-lg md:text-2xl leading-relaxed text-cream relative z-[1]"
                style={{ lineHeight: 1.6 }}
              >
                {t.quote}
              </blockquote>

              {/* Attribution */}
              <div
                className="mt-6 font-body text-[13px] uppercase tracking-[0.08em]"
                style={{ color: '#CBA77D' }}
              >
                {t.author} &mdash; {t.location}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
