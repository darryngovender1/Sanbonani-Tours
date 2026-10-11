import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router'

export interface LegalSection {
  heading: string
  body: ReactNode[]
}

export default function LegalPage({
  label,
  title,
  updated,
  children,
}: {
  label: string
  title: string
  updated: string
  children: ReactNode
}) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <section
      className="w-full pt-40 pb-24 md:pb-32 px-[5vw] min-h-screen"
      style={{ background: '#0F2E2E' }}
    >
      <div className="max-w-[760px] mx-auto">
        <div className="mb-12">
          <div className="section-label">{label}</div>
          <h1 className="section-heading">{title}</h1>
          <p className="font-body text-xs mt-4 tracking-wide" style={{ color: 'rgba(245,240,230,0.4)' }}>
            Last updated: {updated}
          </p>
        </div>

        <div className="legal-content flex flex-col gap-9">{children}</div>

        <div className="mt-14 text-center">
          <Link to="/" className="text-link">
            ← Back to Home
          </Link>
        </div>
      </div>
    </section>
  )
}

export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-2xl mb-3" style={{ color: '#CBA77D' }}>
        {heading}
      </h2>
      <div
        className="font-body font-light text-sm leading-[1.8] flex flex-col gap-3"
        style={{ color: 'rgba(245,240,230,0.75)' }}
      >
        {children}
      </div>
    </div>
  )
}
