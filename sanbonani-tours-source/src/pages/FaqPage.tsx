import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { faqItems } from '../data/faq'
import { usePageMeta, JsonLd, SITE_URL } from '../lib/seo'

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  usePageMeta({
    title: 'Frequently Asked Questions | Sanbonani Tours',
    description:
      'Answers to common questions about booking, transport, group sizes, deposits, cancellations, malaria risk and travelling with children on Sanbonani Tours safaris and Dolphin Coast excursions.',
    path: '/faq',
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <section
      className="w-full pt-40 pb-24 md:pb-32 px-[5vw] min-h-screen"
      style={{ background: '#0F2E2E' }}
    >
      {/* FAQPage structured data — generated from the same data that renders the page */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqItems.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
          })),
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'FAQ', item: `${SITE_URL}/faq` },
          ],
        }}
      />

      <div className="max-w-[820px] mx-auto">
        {/* Header */}
        <div className="mb-14 text-center">
          <div className="section-label">Good To Know</div>
          <h1 className="section-heading">Frequently Asked Questions</h1>
          <p className="section-subheading mt-5 max-w-[540px] mx-auto">
            Everything guests usually ask before booking. Something missing?
            Call or WhatsApp us on +27 68 816 3622.
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {faqItems.map((item, i) => {
            const open = openIndex === i
            return (
              <div
                key={item.question}
                style={{
                  background: '#1A2E2E',
                  border: `1px solid ${open ? 'rgba(212,175,55,0.4)' : 'rgba(203,167,125,0.15)'}`,
                  transition: 'border-color 0.3s ease',
                }}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 cursor-pointer"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                >
                  <span className="font-display text-lg md:text-xl text-cream leading-[1.3]">
                    {item.question}
                  </span>
                  <svg
                    className="w-5 h-5 shrink-0 transition-transform duration-300"
                    style={{ color: '#CBA77D', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className="overflow-hidden transition-all duration-400"
                  style={{ maxHeight: open ? '400px' : '0' }}
                >
                  <p
                    className="font-body font-light text-sm leading-[1.75] px-6 pb-6"
                    style={{ color: 'rgba(245,240,230,0.75)' }}
                  >
                    {item.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <p className="font-body font-light text-sm mb-6" style={{ color: 'rgba(245,240,230,0.6)' }}>
            Ready to plan? We respond to every enquiry within 48 hours.
          </p>
          <Link to="/#contact" className="btn-primary">
            Send An Enquiry
          </Link>
          <div className="mt-8">
            <Link to="/" className="text-link">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
