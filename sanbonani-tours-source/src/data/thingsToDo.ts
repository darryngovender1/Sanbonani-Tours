export interface Attraction {
  name: string
  tag: string
  description: string
  image: string
  url: string
  linkLabel: string
}

export interface DriveGroup {
  time: string
  label: string
  attractions: Attraction[]
}

export const groups: DriveGroup[] = [
  {
    time: 'Under 30 minutes',
    label: 'from our door in Tinley Manor',
    attractions: [
      {
        name: 'Ballito Beaches & Boardwalk',
        tag: 'Coast',
        description:
          'Golden beaches, tidal pools and the famous promenade. The Dolphin Coast at its best — swim, stroll, and watch the dolphins cruise past.',
        image: '/images/attractions/ballito-beach.jpg',
        url: 'https://www.google.com/maps/search/?api=1&query=Ballito+Beach+Boardwalk',
        linkLabel: 'View on Google Maps',
      },
      {
        name: 'Crocodile Creek',
        tag: 'Family',
        description:
          'Home to Nile crocodiles, snakes and tortoises just outside Ballito. Feeding demonstrations are a hit with kids.',
        image: '/images/attractions/crocodile-creek.jpg',
        url: 'https://www.crocodilecreek.co.za',
        linkLabel: 'Visit their website',
      },
      {
        name: 'La Piazza Restaurant',
        tag: 'Dining',
        description:
          'A Ballito favourite for Italian family dining — wood-fired pizza, fresh pasta and the Bambini kids entertainment area on Albertina Way.',
        image: '/images/attractions/la-piazza.jpg',
        url: 'https://www.lapiazzarestaurant.co.za',
        linkLabel: 'Visit their website',
      },
      {
        name: 'Ballito Junction & Lifestyle Centre',
        tag: 'Shopping',
        description:
          "The North Coast's premier malls — national brands, restaurants, cinemas and the outdoor Lifestyle Centre market atmosphere.",
        image: '/images/attractions/ballito-junction.jpg',
        url: 'https://www.ballitojunction.co.za',
        linkLabel: 'Visit their website',
      },
      {
        name: 'Sibaya Casino & Entertainment Kingdom',
        tag: 'Entertainment',
        description:
          'Gaming, live shows, restaurants and family entertainment between Umhlanga and Ballito — an easy evening out.',
        image: '/images/attractions/sibaya-casino.jpg',
        url: 'https://www.suninternational.com/sibaya',
        linkLabel: 'Visit their website',
      },
      {
        name: 'Flag Animal Farm',
        tag: 'Family',
        description:
          'A hands-on farm experience near Salt Rock — animal encounters, play areas and a firm favourite for families with young children.',
        image: '/images/attractions/flag-animal-farm.jpg',
        url: 'https://www.flaganimalfarm.co.za',
        linkLabel: 'Visit their website',
      },
      {
        name: 'Sugar Rush Park & Holla Trails',
        tag: 'Adventure',
        description:
          "Mountain biking, trail running and kids' adventure activities on a working sugar estate — plus the much-loved Litchi Orchard food market nearby.",
        image: '/images/attractions/sugar-rush.jpg',
        url: 'https://hollatrails.co.za',
        linkLabel: 'Visit their website',
      },
    ],
  },
  {
    time: 'Under 60 minutes',
    label: 'easy half-day trips',
    attractions: [
      {
        name: 'Gateway Theatre of Shopping',
        tag: 'Shopping',
        description:
          "Umhlanga's mega-mall — over 380 stores, an indoor wave house, climbing walls, cinemas and dining for every taste.",
        image: '/images/attractions/gateway-mall.jpg',
        url: 'https://www.gatewayworld.co.za',
        linkLabel: 'Visit their website',
      },
      {
        name: 'uShaka Marine World',
        tag: 'Family',
        description:
          "Africa's largest marine theme park on Durban's beachfront — aquarium, dolphin and seal shows, water slides and a full-day family outing.",
        image: '/images/attractions/ushaka.jpg',
        url: 'https://www.ushakamarineworld.co.za',
        linkLabel: 'Visit their website',
      },
      {
        name: 'Durban Beachfront & Moses Mabhida',
        tag: 'City',
        description:
          'The Golden Mile promenade, rickshaw rides and the iconic stadium arch — ride the SkyCar for 360° views over Durban.',
        image: '/images/attractions/moses-mabhida.jpg',
        url: 'https://mmstadium.co.za',
        linkLabel: 'Visit their website',
      },
      {
        name: 'Natal Sharks Board',
        tag: 'Marine',
        description:
          'Fascinating shark dissections, audio-visual shows and boat trips in Umhlanga — a uniquely KZN experience.',
        image: '/images/attractions/sharks-board.jpg',
        url: 'https://www.shark.co.za',
        linkLabel: 'Visit their website',
      },
      {
        name: 'Harold Johnson Nature Reserve',
        tag: 'Nature',
        description:
          'Peaceful coastal forest walks, birdlife and picnic spots on the banks of the Tugela — the quiet side of the North Coast.',
        image: '/images/attractions/harold-johnson.jpg',
        url: 'https://www.kznwildlife.com',
        linkLabel: 'Ezemvelo KZN Wildlife',
      },
    ],
  },
  {
    time: 'Under 90 minutes',
    label: 'full-day adventures',
    attractions: [
      {
        name: 'Tala Collection Game Reserve',
        tag: 'Wildlife',
        description:
          'Rhino, giraffe, zebra and over 380 bird species in a malaria-free reserve — the perfect safari taster without the long trek north.',
        image: '/images/attractions/tala.jpg',
        url: 'https://tala.co.za',
        linkLabel: 'Visit their website',
      },
      {
        name: 'Shakaland & Zulu Cultural Experiences',
        tag: 'Culture',
        description:
          'Step into a traditional Zulu kraal — dancing, spear-making, beer tasting and the living history of the Zulu kingdom at Eshowe.',
        image: '/images/attractions/shakaland.jpg',
        url: 'https://www.shakaland.com',
        linkLabel: 'Visit their website',
      },
    ],
  },
  {
    time: 'Over 90 minutes',
    label: 'the big northern reserves — worth the drive',
    attractions: [
      {
        name: 'St Lucia & iSimangaliso Wetland Park',
        tag: 'Wilderness',
        description:
          "South Africa's first UNESCO World Heritage Site — hippo cruises on the estuary, pristine beaches and Cape Vidal's snorkelling reefs.",
        image: '/images/attractions/st-lucia.jpg',
        url: 'https://isimangaliso.com',
        linkLabel: 'Visit their website',
      },
      {
        name: 'Hluhluwe-Imfolozi Park',
        tag: 'Big Five',
        description:
          'The oldest proclaimed game reserve in Africa and the home of white rhino conservation — Big Five game viewing at its most authentic.',
        image: '/images/attractions/hluhluwe.jpg',
        url: 'https://www.kznwildlife.com',
        linkLabel: 'Ezemvelo KZN Wildlife',
      },
    ],
  },
]

const featuredNames = [
  'Ballito Beaches & Boardwalk',
  'La Piazza Restaurant',
  'Sibaya Casino & Entertainment Kingdom',
  'uShaka Marine World',
  'Tala Collection Game Reserve',
  'Hluhluwe-Imfolozi Park',
]

/** Six-card preview for the landing page */
export const featuredAttractions: Attraction[] = featuredNames.map((name) => {
  const found = groups.flatMap((g) => g.attractions).find((a) => a.name === name)
  if (!found) throw new Error(`Attraction not found: ${name}`)
  return found
})

export const attractionCount = groups.reduce((n, g) => n + g.attractions.length, 0)
