export const LANDING_LINKS = {
  home: process.env.NEXT_PUBLIC_LANDING_HOME ?? '/',
  discussProject: process.env.NEXT_PUBLIC_LANDING_DISCUSS_PROJECT ?? '#',
  bookConsultation: process.env.NEXT_PUBLIC_LANDING_BOOK_CONSULTATION ?? '#',
  caseStudies: process.env.NEXT_PUBLIC_LANDING_CASE_STUDIES ?? '#',
  about: process.env.NEXT_PUBLIC_LANDING_ABOUT ?? '#',
  cases: process.env.NEXT_PUBLIC_LANDING_CASES ?? '#',
  services: process.env.NEXT_PUBLIC_LANDING_SERVICES ?? '#',
  price: process.env.NEXT_PUBLIC_LANDING_PRICE ?? '#',
  faq: process.env.NEXT_PUBLIC_LANDING_FAQ ?? '#'
} as const;

export const NAV_ITEMS = [
  { label: 'About us', href: LANDING_LINKS.about },
  { label: 'Cases', href: LANDING_LINKS.cases },
  { label: 'Our Services', href: LANDING_LINKS.services },
  { label: 'Price', href: LANDING_LINKS.price },
  { label: 'FAQ', href: LANDING_LINKS.faq }
] as const;

const COST_REDUCTION = '50%';
const FASTER_LAUNCH = '3x';
const CLEAN_CODE = '100%';

export const FEATURE_CARDS = [
  { value: COST_REDUCTION, label: 'Cost Reduction' },
  { value: FASTER_LAUNCH, label: 'Faster Launch' },
  { value: CLEAN_CODE, label: 'Clean code' }
] as const;
