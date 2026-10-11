import { useEffect } from 'react'

const SITE_URL = 'https://sanbonanitours.co.za'
const DEFAULT_TITLE = 'Sanbonani Tours | Luxury Safaris & Tours in KwaZulu-Natal'
const DEFAULT_DESCRIPTION =
  'Sanbonani Tours — curated safaris, coastal escapes and cultural journeys from Tinley Manor on the KZN Dolphin Coast.'

/**
 * Sets document title, meta description and canonical link for the current page.
 * Values are captured into the static HTML by the prerender step.
 */
export function usePageMeta({
  title,
  description,
  path = '/',
}: {
  title?: string
  description?: string
  path?: string
}) {
  useEffect(() => {
    document.title = title ?? DEFAULT_TITLE

    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', description ?? DEFAULT_DESCRIPTION)

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', `${SITE_URL}${path}`)
  }, [title, description, path])
}

/** Injects a JSON-LD structured data block into the document head. */
export function JsonLd({ data }: { data: object }) {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(data)
    document.head.appendChild(script)
    return () => {
      document.head.removeChild(script)
    }
  }, [data])
  return null
}

export { SITE_URL }
