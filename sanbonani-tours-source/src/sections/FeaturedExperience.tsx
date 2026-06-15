import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FeaturedExperience() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageInnerRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Image slide in from left
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, x: -60 },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // Image parallax
      if (imageInnerRef.current) {
        gsap.fromTo(
          imageInnerRef.current,
          { y: '-5%' },
          {
            y: '5%',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        )
      }

      // Text elements stagger in from right
      if (textRef.current) {
        const textElements = textRef.current.querySelectorAll('.text-anim')
        gsap.fromTo(
          textElements,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
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
      id="experiences"
      className="w-full py-24 md:py-32 px-[5vw]"
      style={{ background: '#1A2E2E' }}
    >
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-0 items-center">
        {/* Image */}
        <div ref={imageRef} className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
          <img
            ref={imageInnerRef}
            src="/images/feat-journey.jpg"
            alt="The Zululand Explorer safari journey"
            className="absolute inset-0 w-full h-[110%] object-cover"
            loading="lazy"
          />
        </div>

        {/* Text Content */}
        <div ref={textRef} className="lg:pl-16">
          <div className="text-anim section-label">Featured Journey</div>
          <h2 className="text-anim section-heading text-3xl md:text-4xl mb-6">
            The Zululand Explorer
          </h2>
          <p
            className="text-anim font-body font-light text-base leading-[1.7] max-w-[440px] mb-8"
            style={{ color: 'rgba(245,240,230,0.7)' }}
          >
            Seven days traversing from the Big Five bushveld of Hluhluwe-Imfolozi to the
            wetlands of St Lucia, ending at the golden beaches of the North Coast. Private
            guided throughout.
          </p>
          <div
            className="text-anim font-body text-[13px] uppercase tracking-[0.08em] mb-8"
            style={{ color: '#CBA77D' }}
          >
            7 Days | From R45,000 pp | All Inclusive
          </div>
          <a href="#contact" className="text-anim text-link" onClick={(e) => {
            e.preventDefault()
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
          }}>
            View Full Itinerary
          </a>
        </div>
      </div>
    </section>
  )
}
