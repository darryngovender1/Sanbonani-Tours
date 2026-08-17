export interface GalleryImage {
  src: string
  alt: string
  caption: string
  span: string
}

export const galleryImages: GalleryImage[] = [
  { src: '/images/gallery-1.jpg', alt: 'Lion portrait at golden hour', caption: 'Lion Portrait', span: 'row-span-2' },
  { src: '/images/gallery-2.jpg', alt: 'Elephant in golden grass', caption: 'Elephant at Sunset', span: '' },
  { src: '/images/gallery-8.jpg', alt: 'Wildebeest herd on safari with Sanbonani Tours', caption: 'Wildebeest Herd', span: '' },
  { src: '/images/gallery-3.jpg', alt: 'White rhino with calf', caption: 'Rhino & Calf', span: 'row-span-2' },
  { src: '/images/gallery-4.jpg', alt: 'Savanna sunrise with marula tree', caption: 'Savanna Sunrise', span: 'col-span-2' },
  { src: '/images/attractions/sibaya-casino.jpg', alt: 'Roulette wheel at Sibaya Casino', caption: 'Sibaya Casino', span: '' },
  { src: '/images/gallery-9.jpg', alt: 'Kudu bull spotted on safari', caption: 'Kudu Bull', span: '' },
  { src: '/images/attractions/ballito-beach.jpg', alt: 'Ballito beach on the Dolphin Coast', caption: 'Ballito Beach', span: '' },
  { src: '/images/gallery-5.jpg', alt: 'Coastal sand dunes', caption: 'Coastal Dunes', span: '' },
  { src: '/images/gallery-11.jpg', alt: 'Elephants in the bush on safari', caption: 'Elephants on Safari', span: 'row-span-2' },
  { src: '/images/attractions/ushaka.jpg', alt: 'uShaka Marine World in Durban', caption: 'uShaka Marine World', span: '' },
  { src: '/images/gallery-6.jpg', alt: 'Wetland aerial view', caption: 'Wetland Patterns', span: '' },
  { src: '/images/attractions/st-lucia.jpg', alt: 'St Lucia estuary in iSimangaliso Wetland Park', caption: 'St Lucia Estuary', span: '' },
  { src: '/images/gallery-12.jpg', alt: 'Wildebeest portrait on safari', caption: 'Blue Wildebeest', span: '' },
  { src: '/images/gallery-7.jpg', alt: 'Drakensberg mountains', caption: 'Drakensberg Peaks', span: '' },
  { src: '/images/gallery-10.jpg', alt: 'Impala herd in the grassland', caption: 'Impala Herd', span: '' },
]

/** Short preview shown on the landing page */
export const galleryPreview = galleryImages.slice(0, 8)
