// Asset paths - update these when adding new images
export const ASSETS = {
  flavors: [
    '/assets/flavors/flavor-1.png',
    '/assets/flavors/flavor-2.png',
    '/assets/flavors/flavor-3.png',
    '/assets/flavors/flavor-4.png',
  ],
  backgrounds: {
    hero: '/assets/backgrounds/hero-section-cookies&cream.png',
    benefits: '/assets/backgrounds/section-2-strawberry.png',
    events: '/assets/backgrounds/Section3.jpg',
    testimonials: '/assets/backgrounds/testimonal-section.png',
    contact: '/assets/backgrounds/Contact-section.png',
  },
  // Placeholder for future social media images
  socialPosts: [
    null, // Will be replaced with actual image path
    null, // Will be replaced with actual image path
  ],
};

// Brand info
export const BRAND = {
  name: 'Kakigōri',
  tagline: 'The Art of Japanese Shaved Ice',
  phone: '+972 50 123 4567',
  email: 'hello@kakigori.co.il',
  whatsapp: 'https://wa.me/972501234567',
  instagram: '@kakigori.il',
};

// Event types for the grid
export const EVENTS = [
  { id: 'weddings', label: 'Weddings', labelHe: 'חתונות' },
  { id: 'barmitzvah', label: 'Bar Mitzvahs', labelHe: 'בר מצווה' },
  { id: 'corporate', label: 'Corporate', labelHe: 'אירועי חברה' },
  { id: 'private', label: 'Private Events', labelHe: 'אירועים פרטיים' },
];

// Navigation
export const NAV_LINKS = [
  { label: 'Experience', href: '#experience' },
  { label: 'Events', href: '#events' },
  { label: 'Contact', href: '#contact' },
];

// Benefits/Features
export const BENEFITS = [
  {
    title: 'Artisan Craft',
    description: 'Hand-shaved on premium Japanese machines',
  },
  {
    title: 'Pure Ingredients',
    description: 'House-made syrups from real fruit',
  },
  {
    title: 'Stunning Presentation',
    description: 'A visual centerpiece for your event',
  },
  {
    title: 'Full Service',
    description: 'Professional setup & service included',
  },
  {
    title: 'Dietary Friendly',
    description: 'Naturally dairy-free & vegan options',
  },
];
