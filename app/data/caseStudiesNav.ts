export type CaseStudyNavItem = {
  label: string;
  /** Two-line split for mega menu at desktop; flattened to one line at 700–1024px via CSS */
  labelLines?: [string, string];
  /** Detail page path (case study or publication) */
  href: string;
};

export type CaseStudyNavCategory = {
  id: string;
  title: string;
  items: CaseStudyNavItem[];
};

export const caseStudyCategories: CaseStudyNavCategory[] = [
  {
    id: 'campaigns',
    title: 'Campaigns',
    items: [
      {
        label: 'The Warehouse Mega Toy Month',
        labelLines: ['The Warehouse', 'Mega Toy Month'],
        href: '/case-studies/4',
      },
      {
        label: 'The Warehouse Summer Campaign',
        labelLines: ['The Warehouse', 'Summer Campaign'],
        href: '/case-studies/3',
      },
    ],
  },
  {
    id: 'packaging',
    title: 'Packaging',
    items: [{ label: 'Green Cross bags', href: '/case-studies/2' }],
  },
  {
    id: 'ui',
    title: 'UI',
    items: [{ label: 'Palmy Bank', href: '/case-studies/1' }],
  },
  {
    id: 'ux',
    title: 'UX',
    items: [{ label: 'Āmio Airways', href: '/case-studies/5' }],
  },
];

export const projectHighlightItems: CaseStudyNavItem[] = [
  { label: 'Architecture New Zealand Magazine', href: '/publications/9' },
  { label: 'Houses Magazine', href: '/publications/8' },
  { label: 'Life Pharmacy Beauty Lookbook', href: '/publications/12' },
  { label: 'Little Treasures Magazine', href: '/publications/11' },
  { label: 'New Zealand Weddings Planner', href: '/publications/13' },
  { label: 'NZW Grooms Guide Booklet', href: '/publications/4' },
  { label: 'Pumpkin Patch Catalogue', href: '/publications/6' },
  { label: 'SuperLife Booklet', href: '/publications/5' },
];

export type MegaMenuTab = 'case-studies' | 'project-highlights';
