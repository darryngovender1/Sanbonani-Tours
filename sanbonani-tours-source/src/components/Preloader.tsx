import { useEffect, useState } from 'react'

interface PreloaderProps {
  isLoading: boolean
  onComplete: () => void
}

export default function Preloader({ isLoading, onComplete }: PreloaderProps) {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setHidden(true)
      onComplete()
    }, 1500)

    return () => clearTimeout(timer)
  }, [onComplete])

  if (hidden) return null

  return (
    <div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center gap-6 transition-all duration-500"
      style={{
        background: '#0F2E2E',
        opacity: isLoading ? 1 : 0,
        visibility: isLoading ? 'visible' : 'hidden',
        pointerEvents: isLoading ? 'auto' : 'none',
      }}
    >
      <div className="relative">
        <img
          src="/logo.png"
          alt="Sanbonani Tours"
          className="h-48 w-auto object-contain"
        />
      </div>
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-full border-2 border-gold/20 border-t-gold animate-spin"
          style={{ animationDuration: '0.8s' }}
        />
      </div>
      <p
        className="font-display text-lg tracking-[0.15em] uppercase"
        style={{ color: '#D4AF37' }}
      >
        Sanbonani Tours
      </p>
    </div>
  )
}
