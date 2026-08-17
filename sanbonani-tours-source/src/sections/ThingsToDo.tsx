import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { featuredAttractions, attractionCount } from '../data/thingsToDo'
import AttractionCard from '../components/AttractionCard'

gsap.registerPlugin(ScrollTrigger)

export default function ThingsToDo() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

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

      if (contentRef.current) {
        const blocks = contentRef.current.querySelectorAll('.ttd-block')
        gsap.fromTo(
          blocks,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      ref={sectionRef}
      id="things-to-do"
      className="w-full py-24 md:py-32 px-[5vw]"
      style={{ background: '#153A3A' }}
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div ref={headingRef} className="mb-16">
          <div className="section-label">Things To Do</div>
          <h2 className="section-heading">
            More Than Safaris —<br className="hidden md:block" /> The North Coast Awaits
          </h2>
          <p className="section-subheading mt-5 max-w-[640px]">
            Tinley Manor sits at the heart of the Dolphin Coast, with KwaZulu-Natal&apos;s
            best family attractions, shopping and entertainment a short drive away.
            Browse our local picks below — and if you&apos;d rather not drive, we&apos;ll
            take you there.
          </p>
        </div>

        <div ref={contentRef}>
          {/* Featured picks */}
          <div className="ttd-block grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredAttractions.map((item) => (
              <AttractionCard key={item.name} item={item} />
            ))}
          </div>

          {/* Link to the full guide */}
          <div className="ttd-block mt-12 text-center">
            <Link to="/things-to-do" className="btn-primary">
              See All {attractionCount} Things To Do
            </Link>
          </div>

          {/* CTA banner */}
          <div
            className="ttd-block mt-20 flex flex-wrap items-center justify-between gap-7 py-14 px-[5vw]"
            style={{
              background: 'linear-gradient(135deg, #1B4D4D 0%, #153A3A 100%)',
              border: '1px solid rgba(203,167,125,0.25)',
            }}
          >
            <div>
              <h3 className="font-display text-3xl md:text-4xl text-cream leading-[1.1] max-w-[520px]">
                Don&apos;t feel like driving?
              </h3>
              <p className="font-body font-light text-sm leading-[1.7] mt-3 max-w-[460px]" style={{ color: 'rgba(245,240,230,0.7)' }}>
                Book a half-day or full-day excursion with Sanbonani Tours — door-to-door
                transport from Tinley Manor, Ballito and surrounds, with a local guide
                who knows the way.
              </p>
            </div>
            <a href="#contact" onClick={handleContactClick} className="btn-primary">
              Plan My Excursion
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
