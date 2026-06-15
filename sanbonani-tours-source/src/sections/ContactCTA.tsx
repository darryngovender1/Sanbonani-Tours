import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import emailjs from '@emailjs/browser'

gsap.registerPlugin(ScrollTrigger)

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_yjaeg0a'
const EMAILJS_TEMPLATE_ID = 'template_3gvmk5b'
const EMAILJS_PUBLIC_KEY = 'dQPh-pIjXH78mm6ax'

export default function ContactCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)

  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState('')

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      const elements = [subtitleRef.current, ctaRef.current].filter(Boolean)
      gsap.fromTo(
        elements,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          delay: 0.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setSendError('')

    try {
      const templateParams = {
        from_name: formData.name,
        reply_to: formData.email,
        message: formData.message,
        to_email: 'darryn.govender1@gmail.com',
      }

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      )

      if (result.status === 200) {
        setFormSubmitted(true)
        setFormData({ name: '', email: '', message: '' })
      } else {
        setSendError('Something went wrong. Please try again or email us directly.')
      }
    } catch (error) {
      console.error('Email send failed:', error)
      setSendError('Failed to send. Please email us directly at info@sanbonanitours.co.za')
    } finally {
      setSending(false)
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full min-h-[70vh] flex items-center justify-center py-32 md:py-40 px-[5vw]"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/cta-bg.jpg"
          alt="Savanna sunset"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(15,46,46,0.7) 0%, rgba(15,46,46,0.9) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-[1] max-w-[700px] w-full text-center">
        <div className="section-label">Begin Your Experience</div>
        <h2
          ref={headingRef}
          className="font-display text-4xl sm:text-5xl md:text-6xl uppercase text-cream leading-[1.05] tracking-[-0.02em]"
        >
          Let&apos;s Plan Your Adventure
        </h2>
        <p
          ref={subtitleRef}
          className="font-body font-light text-base mt-6 max-w-[520px] mx-auto"
          style={{ color: 'rgba(245,240,230,0.7)' }}
        >
          Tell us your travel dates, your party size, and your dreams. We&apos;ll craft an
          itinerary within 48 hours.
        </p>

        {/* Quick Contact Form */}
        {!formSubmitted ? (
          <form
            onSubmit={handleSubmit}
            className="mt-10 max-w-[500px] mx-auto space-y-4 text-left"
          >
            {sendError && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded text-red-300 text-sm text-center">
                {sendError}
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-cream/5 border border-cream/10 rounded text-cream placeholder-cream/40 font-body text-sm focus:outline-none focus:border-gold transition-colors"
              />
              <input
                type="email"
                placeholder="Email address"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-cream/5 border border-cream/10 rounded text-cream placeholder-cream/40 font-body text-sm focus:outline-none focus:border-gold transition-colors"
              />
            </div>
            <textarea
              placeholder="Tell us about your dream trip..."
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 bg-cream/5 border border-cream/10 rounded text-cream placeholder-cream/40 font-body text-sm focus:outline-none focus:border-gold transition-colors resize-vertical"
            />
            <button
              type="submit"
              disabled={sending}
              className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? 'Sending...' : (
                <>
                  Send Enquiry
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="mt-10 p-6 bg-gold/10 border border-gold/30 rounded-lg">
            <p className="font-body text-cream text-lg">
              Thank you! We&apos;ll be in touch within 48 hours.
            </p>
          </div>
        )}

        <a
          ref={ctaRef}
          href="mailto:info@sanbonanitours.co.za"
          className="inline-block mt-6 font-body text-sm transition-colors duration-300 border-b border-transparent hover:border-gold pb-1"
          style={{ color: '#CBA77D' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#D4AF37'
            e.currentTarget.style.borderBottomColor = '#D4AF37'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#CBA77D'
            e.currentTarget.style.borderBottomColor = 'transparent'
          }}
        >
          info@sanbonanitours.co.za
        </a>
      </div>
    </section>
  )
}
