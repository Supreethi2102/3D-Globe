export type PublicationDetail = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  modalSubtitle?: string;
  intro?: string;
  bullets?: string[];
  conclusion?: string;
  galleryImages?: string[];
};

export const publications: PublicationDetail[] = [
  {
    id: 1,
    title: 'New Zealand Weddings',
    subtitle: 'Layout/Art direction',
    image: '/misc/81183903d1a5b39abc75683b7deb5957a7a26ddf.png',
    modalSubtitle: 'Archived magazine',
    intro: "Contributed to the art direction and editorial design of New Zealand Weddings, the country's go-to print magazine for bridal inspiration, fashion, and planning. I worked on:",
    bullets: [
      'Designing feature and style page layouts for elegant, cohesive spreads',
      'Crafting typography and storytelling that enhanced readability and flow',
      'Collaborating with editors to bring detail and celebration to each page',
    ],
    conclusion: 'My time on the title sharpened my instincts and still guides how I design for clarity, warmth, balance, and strong visual impact.',
    galleryImages: Array(16).fill(''), // Placeholders only - no images
  },
  { id: 2, title: 'Little Treasures magazine', subtitle: 'Layout/Art direction', image: '/misc/bb424cd2f5ccd63b32cb1d33d5c48409b7eac79b.png' },
  { id: 3, title: 'Life Pharmacy look-book', subtitle: 'Layout/Art direction', image: '/misc/bc660a50bdd11425d3b6c0372e26dde94ed79648.png' },
  { id: 4, title: 'Grooms guide', subtitle: 'Layout/Art direction', image: '/misc/c42f3d209027b1a6214a728484bf8bd46aa2dd0e.png' },
  { id: 5, title: 'Superlife booklet', subtitle: 'Layout/Art direction', image: '/misc/bb424cd2f5ccd63b32cb1d33d5c48409b7eac79b.png' },
  { id: 6, title: 'Pumpkin Patch catalogue', subtitle: 'Layout/Art direction', image: '/misc/fdabc05abb4416c7e2c0ef00313dce6bc3ce1fab.png' },
  { id: 7, title: 'New Zealand Weddings magazine', subtitle: 'Layout/Art direction', image: '/misc/c45a327351fe193d5ffdd0defd77cfc4d77622e8.png' },
  { id: 8, title: 'Houses magazine', subtitle: 'Layout/Art direction', image: '/misc/b462b5710a875a0246180de073b790296e347afd.png' },
  { id: 9, title: 'Architecture New Zealand magazine', subtitle: 'Layout/Art direction', image: '/misc/81183903d1a5b39abc75683b7deb5957a7a26ddf.png' },
  { id: 10, title: 'Next magazine', subtitle: 'Layout/Art direction', image: '/misc/81183903d1a5b39abc75683b7deb5957a7a26ddf.png' },
  {
    id: 11,
    title: 'Little Treasures',
    subtitle: 'Layout/Art direction',
    image: '/misc/bb424cd2f5ccd63b32cb1d33d5c48409b7eac79b.png',
    modalSubtitle: 'Archived magazine',
    intro: 'Designed and art directed for Little Treasures, a trusted parenting magazine in New Zealand. A bi-monthly title that supported thousands of families for over two decades. I worked on:',
    bullets: [
      'Milestone features and guides',
      'Product roundups for parents',
      'Warm stories from real families',
    ],
    conclusion: 'Creating accessible layouts for new and expectant readers. I worked with editors and illustrators to bring a warm tone.\n\nWhile my time there evolved, the experience still guides my design with clarity and care.',
    galleryImages: Array(13).fill(''), // Placeholders only - no images
  },
  { id: 12, title: 'Life Pharmacy look-book', subtitle: 'Layout/Art direction', image: '/misc/bc660a50bdd11425d3b6c0372e26dde94ed79648.png' },
  {
    id: 13,
    title: 'NZ Weddings Planner',
    subtitle: 'Layout/Art direction',
    image: '/misc/47acc09551b581ea0204690ee9c9bf854e3a5309.png',
    modalSubtitle: 'Archived annual magazine',
    intro: 'As Art Director at New Zealand Weddings, I led design and art direction for New Zealand Wedding Planner, a yearly guide with planning advice, style, and vendors. I worked on:',
    bullets: [
      'Crafting elegant, approachable layouts for real weddings and fashion shoots',
      'Designing practical tools and guides that balanced style with usability',
      'Ensuring flow across all pages',
    ],
    conclusion: 'Though a special project rather than a regular magazine, it required care and creative storytelling. The experience strengthened my ability to design high-impact print with clear design.',
    galleryImages: Array(8).fill(''), // Placeholders only - no images
  },
];

export function getPublicationById(id: number): PublicationDetail | undefined {
  return publications.find((p) => p.id === id);
}

export function getGalleryImages(pub: PublicationDetail): string[] {
  return pub.galleryImages && pub.galleryImages.length > 0 ? pub.galleryImages : [pub.image];
}

export function getPublicationCopy(pub: PublicationDetail) {
  return {
    modalSubtitle: pub.modalSubtitle ?? pub.subtitle,
    intro: pub.intro ?? `Contributed to the art direction and editorial design of ${pub.title}.`,
    bullets: pub.bullets ?? [
      'Designing layouts for elegant, cohesive spreads',
      'Crafting typography and storytelling for readability and flow',
      'Collaborating with editors to bring detail to each page',
    ],
    conclusion: pub.conclusion ?? 'My time on the title sharpened my instincts and still guides how I design for clarity, warmth, balance, and strong visual impact.',
  };
}
