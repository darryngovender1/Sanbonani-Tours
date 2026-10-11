import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { galleryImages } from '../data/gallery'

export default function GalleryPage() {
  const gridRef = useRef<HTMLDivElement>(null)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  useEffect(() => {
    document.title = 'Gallery | Sanbonani Tours — KZN Safaris & Dolphin Coast'
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        'content',
        'A visual journey through KwaZulu-Natal with Sanbonani Tours — safari wildlife, Dolphin Coast beaches, St Lucia estuary and North Coast attractions.'
      )
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (!gridRef.current) return
    const items = gridRef.current.querySelectorAll('.gallery-item')
    gsap.fromTo(
      items,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, stagger: 0.06, ease: 'power3.out' }
    )
  }, [])

  // Close lightbox on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxImage(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <section
        className="w-full pt-40 pb-24 md:pb-32 px-[5vw] min-h-screen"
        style={{ background: '#0F2E2E' }}
      >
        <div className="max-w-[1280px] mx-auto">
          {/* Header */}
          <div className="mb-16 text-center">
            <div className="section-label">Gallery</div>
            <h1 className="section-heading">KZN Through Our Lens</h1>
            <p className="section-subheading mt-5 max-w-[560px] mx-auto">
              Safari moments, coastline and North Coast attractions — shot on our
              journeys across KwaZulu-Natal.
            </p>
          </div>

          {/* Grid - Masonry-like layout */}
          <div
            ref={gridRef}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]"
          >
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className={`gallery-item relative overflow-hidden cursor-pointer group ${img.span}`}
                onClick={() => setLightboxImage(img.src)}
                role="button"
                tabIndex={0}
                aria-label={`View full image: ${img.caption}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setLightboxImage(img.src)
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                  loading="lazy"
                />
                {/* Caption overlay */}
                <div
                  className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(to top, rgba(15,46,46,0.8) 0%, transparent 60%)',
                  }}
                >
                  <span className="font-body text-sm text-cream">{img.caption}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Back link */}
          <div className="mt-16 text-center">
            <Link to="/" className="text-link">
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[5000] flex items-center justify-center p-4 md:p-8"
          style={{ background: 'rgba(15, 46, 46, 0.95)', backdropFilter: 'blur(10px)' }}
          onClick={() => setLightboxImage(null)}
          role="dialog"
          aria-label="Image lightbox"
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-cream/10 text-cream hover:bg-gold hover:text-teal-dark transition-all duration-300"
            onClick={() => setLightboxImage(null)}
            aria-label="Close lightbox"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={lightboxImage}
            alt="Gallery full view"
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
