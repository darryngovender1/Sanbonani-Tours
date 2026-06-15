import { useEffect, useState } from 'react'

const navLinks = [
  { label: 'Destinations', href: '#destinations' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'The Journey', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[1000] transition-all duration-400"
      style={{
        background: scrolled ? 'rgba(15, 46, 46, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
      }}
    >
      <nav className="flex items-center justify-between h-[96px] px-[5vw] max-w-[1400px] mx-auto">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3" onClick={(e) => handleNavClick(e, '#home')}>
          <img
            src="/logo.png"
            alt="Sanbonani Tours"
            className="h-20 w-auto object-contain"
          />
          <span
            className="font-display text-xl tracking-[0.15em] uppercase hidden sm:block"
            style={{ color: '#CBA77D' }}
          >
            Sanbonani Tours
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8 list-none">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-body text-[13px] uppercase tracking-[0.08em] text-cream/90 hover:text-gold transition-colors duration-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="font-body text-[13px] uppercase tracking-[0.08em] px-7 py-2.5 border border-sand text-sand hover:bg-sand hover:text-teal-dark transition-all duration-400"
          >
            Enquire Now
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center justify-center w-11 h-11 text-cream"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-400"
        style={{
          maxHeight: mobileOpen ? '400px' : '0',
          background: 'rgba(15, 46, 46, 0.98)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <ul className="flex flex-col px-[5vw] py-6 gap-4 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block font-body text-sm uppercase tracking-[0.08em] text-cream/90 hover:text-gold transition-colors duration-300 py-2"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="inline-block font-body text-[13px] uppercase tracking-[0.08em] px-7 py-2.5 border border-sand text-sand hover:bg-sand hover:text-teal-dark transition-all duration-400"
            >
              Enquire Now
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
