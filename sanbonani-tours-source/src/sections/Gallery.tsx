import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const galleryImages = [
  { src: '/images/gallery-1.jpg', alt: 'Lion portrait at golden hour', caption: 'Lion Portrait', span: 'row-span-2' },
  { src: '/images/gallery-2.jpg', alt: 'Elephant in golden grass', caption: 'Elephant at Sunset', span: '' },
  { src: '/images/gallery-3.jpg', alt: 'White rhino with calf', caption: 'Rhino \u0026 Calf', span: 'row-span-2' },
  { src: '/images/gallery-4.jpg', alt: 'Savanna sunrise with marula tree', caption: 'Savanna Sunrise', span: 'col-span-2' },
  { src: '/images/gallery-5.jpg', alt: 'Coastal sand dunes', caption: 'Coastal Dunes', span: '' },
  { src: '/images/gallery-6.jpg', alt: 'Wetland aerial view', caption: 'Wetland Patterns', span: '' },
  { src: '/images/gallery-7.jpg', alt: 'Drakensberg mountains', caption: 'Drakensberg Peaks', span: 'row-span-2' },
]

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      if (gridRef.current) {
        const items = gridRef.current.querySelectorAll('.gallery-item')
        gsap.fromTo(
          items,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
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
        ref={sectionRef}
        id="gallery"
        className="w-full py-24 md:py-32 px-[5vw]"
        style={{ background: '#0F2E2E' }}
      >
        <div className="max-w-[1280px] mx-auto">
          {/* Header */}
          <div className="mb-16 text-center">
            <div className="section-label">Visual Journey</div>
            <h2 className="section-heading">KZN Through Our Lens</h2>
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
