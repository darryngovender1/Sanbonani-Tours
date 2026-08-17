import type { Attraction } from '../data/thingsToDo'

export default function AttractionCard({ item }: { item: Attraction }) {
  return (
    <div
      className="group flex flex-col gap-3 overflow-hidden transition-all duration-400 hover:-translate-y-1"
      style={{
        background: '#1A2E2E',
        border: '1px solid rgba(203,167,125,0.15)',
      }}
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-3 flex-1 px-7 pb-7">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl text-cream leading-[1.15]">{item.name}</h3>
          <span
            className="font-body text-[10px] font-semibold uppercase tracking-[0.1em] px-2.5 py-1 mt-1 whitespace-nowrap"
            style={{ color: '#D4AF37', border: '1px solid rgba(212,175,55,0.4)' }}
          >
            {item.tag}
          </span>
        </div>
        <p
          className="font-body font-light text-sm leading-[1.65] flex-1"
          style={{ color: 'rgba(245,240,230,0.7)' }}
        >
          {item.description}
        </p>
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-link self-start">
          {item.linkLabel} ↗
        </a>
      </div>
    </div>
  )
}
