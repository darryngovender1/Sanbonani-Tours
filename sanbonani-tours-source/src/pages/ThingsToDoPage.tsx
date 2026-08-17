import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { groups } from '../data/thingsToDo'
import { usePageMeta, JsonLd, SITE_URL } from '../lib/seo'
import AttractionCard from '../components/AttractionCard'

export default function ThingsToDoPage() {
  const gridRef = useRef<HTMLDivElement>(null)

  usePageMeta({
    title: 'Things To Do in Ballito & the Dolphin Coast | Sanbonani Tours',
    description:
      'Our local guide to the best things to do near Tinley Manor and Ballito — beaches, family attractions, shopping, restaurants and Big Five game reserves, grouped by drive time.',
    path: '/things-to-do',
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!gridRef.current) return
    const blocks = gridRef.current.querySelectorAll('.ttd-block')
    gsap.fromTo(
      blocks,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
    )
  }, [])

  return (
    <section
      className="w-full pt-40 pb-24 md:pb-32 px-[5vw] min-h-screen"
      style={{ background: '#153A3A' }}
    >
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Things To Do', item: `${SITE_URL}/things-to-do` },
          ],
        }}
      />
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="section-label">Things To Do</div>
          <h1 className="section-heading">
            The North Coast Guide —<br className="hidden md:block" /> By Drive Time
          </h1>
          <p className="section-subheading mt-5 max-w-[640px]">
            Every attraction below is measured in minutes from our door in Tinley Manor.
            Pick your favourites — and if you&apos;d rather not drive, we&apos;ll take
            you there with door-to-door transport and a local guide.
          </p>
        </div>

        <div ref={gridRef}>
          {groups.map((group) => (
            <div key={group.time} className="ttd-block mb-16 last:mb-0">
              {/* Group header — the drive-time reference point */}
              <div
                className="flex items-baseline gap-4 mb-7 pb-3.5"
                style={{ borderBottom: '1px solid rgba(203,167,125,0.25)' }}
              >
                <span className="font-display text-[28px]" style={{ color: '#CBA77D' }}>
                  {group.time}
                </span>
                <span
                  className="font-body text-xs uppercase tracking-[0.1em]"
                  style={{ color: 'rgba(245,240,230,0.5)' }}
                >
                  {group.label}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.attractions.map((item) => (
                  <AttractionCard key={item.name} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <p className="mt-10 font-body text-[11px] leading-[1.6]" style={{ color: 'rgba(245,240,230,0.35)' }}>
          Drive times are approximate, measured from Tinley Manor in normal traffic.
          Attractions are independently operated; Sanbonani Tours provides transport
          and guiding services.
        </p>

        {/* Back link */}
        <div className="mt-14 text-center">
          <Link to="/" className="text-link">
            ← Back to Home
          </Link>
        </div>
      </div>
    </section>
  )
}
