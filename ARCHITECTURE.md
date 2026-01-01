# Kakigōri Landing Page - Architecture Documentation

## Overview

This is a premium single-page landing page for a Japanese Kakigōri (shaved ice) catering business in Israel. The page uses a **layered architecture** with scroll-triggered animations to create an Apple-level premium feel.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Animations**: 
  - Framer Motion (UI transitions, entrance animations)
  - GSAP ScrollTrigger (scroll-based animations, background/flavor changes)
- **Language**: TypeScript

---

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── globals.css               # Global styles, custom animations, Tailwind directives
│   ├── layout.tsx                # Root layout (Navigation + Footer wrapper)
│   └── page.tsx                  # Main page - assembles all sections
│
├── components/
│   ├── layout/                   # Page-level layout components
│   │   ├── Navigation.tsx        # Fixed top nav (logo + Book Now button)
│   │   └── Footer.tsx            # Bottom footer
│   │
│   ├── sections/                 # Content sections (scrollable layer)
│   │   ├── HeroSection.tsx       # First screen - headline, subheadline, CTAs
│   │   ├── BenefitsSection.tsx   # Features/benefits list
│   │   ├── EventsSection.tsx     # Event types showcase
│   │   └── ContactSection.tsx    # Final CTA with contact info
│   │
│   ├── ui/                       # Reusable UI components
│   │   ├── Button.tsx            # Styled button with variants
│   │   ├── PhoneFrame.tsx        # iPhone-style frame for phone grid
│   │   └── SectionWrapper.tsx    # (Legacy - may not be in use)
│   │
│   └── visuals/                  # Visual/animation layer
│       ├── ScrollAnimationController.tsx  # MAIN ANIMATION ENGINE
│       ├── HeroVisual.tsx        # (Legacy - replaced by ScrollAnimationController)
│       └── KakigoriBowl.tsx      # (Legacy - bowl rendering component)
│
├── hooks/
│   └── useScrollProgress.ts      # Custom hook for scroll percentage
│
└── utils/
    └── constants.ts              # All text content, asset paths, brand info
```

---

## The Layered System

The page uses a **3-layer architecture**:

```
┌─────────────────────────────────────────────────────────────┐
│  LAYER 3 (z-50): Navigation                                 │
│  - Fixed position, always on top                            │
│  - Contains: Logo (left) + Book Now button (right)          │
├─────────────────────────────────────────────────────────────┤
│  LAYER 2 (z-10): Scrollable Content                         │
│  - Normal document flow, scrolls with user                  │
│  - Contains: HeroSection, BenefitsSection, EventsSection,   │
│              ContactSection                                 │
├─────────────────────────────────────────────────────────────┤
│  LAYER 1 (z-0): Fixed Visual Background                     │
│  - Fixed position, stays in place                           │
│  - Contains: Background images, Flavor images, Phone grid   │
│  - Controlled by: ScrollAnimationController.tsx             │
└─────────────────────────────────────────────────────────────┘
```

### How It Works

1. `ScrollAnimationController` sits **behind** all content (`z-0`, `position: fixed`)
2. Section components sit **in front** (`z-10`, normal scroll)
3. As user scrolls, `ScrollAnimationController` detects which section is in view
4. It then updates: background image, flavor image, flavor position

---

## File-by-File Breakdown

### `/src/app/page.tsx`
**Purpose**: Main page assembly

```tsx
export default function Home() {
  return (
    <div className="relative">
      {/* Background & Visual Animation Layer (fixed, behind content) */}
      <ScrollAnimationController />
      
      {/* Scrollable Content Sections */}
      <div className="relative z-10">
        <HeroSection />
        <BenefitsSection />
        <EventsSection />
        <ContactSection />
      </div>
    </div>
  );
}
```

**To edit**: Change section order, add/remove sections

---

### `/src/app/layout.tsx`
**Purpose**: Root layout wrapper

Contains:
- `<Navigation />` - top bar
- `{children}` - page content
- `<Footer />` - bottom bar

**To edit**: Change site-wide metadata, add global providers

---

### `/src/app/globals.css`
**Purpose**: Global styles and custom CSS

Key sections:
- Tailwind directives (`@tailwind base/components/utilities`)
- CSS custom properties (`:root` variables)
- Custom animations (`@keyframes float`, `shimmer`, etc.)
- Utility classes (`.phone-glow`, `.shimmer`, `.glass`)

**To edit**: Add new animations, change global colors, add utility classes

---

### `/src/utils/constants.ts`
**Purpose**: Central configuration file - ALL TEXT AND ASSETS

```typescript
// Asset paths
export const ASSETS = {
  flavors: [
    '/assets/flavors/flavor-1.png',  // Index 0 - Hero
    '/assets/flavors/flavor-2.png',  // Index 1 - Benefits
    '/assets/flavors/flavor-3.png',  // Index 2 - Events
    '/assets/flavors/flavor-4.png',  // Index 3 - Contact/Phone
  ],
  backgrounds: {
    hero: '/assets/backgrounds/hero-section-cookies&cream.png',
    benefits: '/assets/backgrounds/section-2-strawberry.png',
    events: '/assets/backgrounds/Section3.jpg',
    contact: '/assets/backgrounds/testimonal-section.png',
  },
  socialPosts: [null, null],  // Placeholders for future images
};

// Brand information
export const BRAND = {
  name: 'Kakigōri',
  tagline: 'The Art of Japanese Shaved Ice',
  phone: '+972 50 123 4567',
  email: 'hello@kakigori.co.il',
  whatsapp: 'https://wa.me/972501234567',
  instagram: '@kakigori.il',
};

// Benefits list
export const BENEFITS = [
  { title: 'Artisan Craft', description: 'Hand-shaved on premium Japanese machines' },
  // ... more benefits
];

// Event types
export const EVENTS = [
  { id: 'weddings', label: 'Weddings', labelHe: 'חתונות' },
  // ... more events
];
```

**To edit**: 
- Change ANY text content
- Update phone/email/links
- Add/remove benefits
- Change asset file paths

---

### `/src/components/visuals/ScrollAnimationController.tsx`
**Purpose**: THE MAIN ANIMATION ENGINE

This is the most complex file. It controls:
1. Background image transitions
2. Flavor image transitions
3. Flavor position/size changes
4. Phone grid appearance

#### State Variables
```typescript
const [currentFlavor, setCurrentFlavor] = useState(0);      // Which flavor (0-3)
const [currentBg, setCurrentBg] = useState('hero');          // Which background
const [showPhones, setShowPhones] = useState(false);         // Phone grid visible?
const [phonesConverged, setPhonesConverged] = useState(false); // Phones centered?
const [showFinalPhone, setShowFinalPhone] = useState(false);  // Final contact phone?
```

#### Scroll Triggers
The file uses GSAP ScrollTrigger to watch scroll position:

```typescript
// When #section-benefits enters viewport
ScrollTrigger.create({
  trigger: '#section-benefits',
  start: 'top 80%',           // Trigger when section's top hits 80% down viewport
  onEnter: () => {
    setCurrentFlavor(1);       // Switch to flavor 2
    setCurrentBg('benefits');  // Switch to benefits background
    gsap.to(flavorRef.current, {
      x: '-30vw',              // Move flavor left
      scale: 0.8,              // Shrink slightly
    });
  },
  onLeaveBack: () => {
    // Reverse when scrolling back up
  },
});
```

#### Key Sections to Edit

**Flavor Size & Position (Hero state)**:
```typescript
// Find this className to change initial flavor size/position:
className={`absolute top-[55%] left-1/2 ... w-[500px] h-[500px] md:w-[650px] md:h-[650px] lg:w-[750px] lg:h-[750px]`}
```

**Flavor Movement on Scroll**:
```typescript
// In each ScrollTrigger's onEnter callback:
gsap.to(flavorRef.current, {
  x: '-30vw',    // Horizontal position (negative = left, positive = right)
  y: '20vh',     // Vertical position (negative = up, positive = down)
  scale: 0.8,    // Size multiplier (1 = 100%, 0.5 = 50%)
});
```

**To edit**:
- Change when transitions happen (adjust `trigger` and `start` values)
- Change where flavors move to (adjust `x`, `y`, `scale` in gsap.to)
- Change flavor size (adjust `w-[]` and `h-[]` classes)

---

### `/src/components/sections/HeroSection.tsx`
**Purpose**: First screen content

Key editable areas:
```typescript
// Section positioning
className="relative min-h-screen ... pt-[180px] md:pt-[240px]"
//                                   ↑ padding from top

// Headline
<h1 className="text-3xl md:text-4xl lg:text-5xl ...">
  {BRAND.tagline}  // Text comes from constants.ts
</h1>

// Subheadline
<p className="text-lg md:text-xl ...">
  Elevate your event...
</p>
```

**To edit**:
- Move content up/down: Change `pt-[]` value
- Change text size: Change `text-[]` classes
- Change text content: Edit directly or change in `constants.ts`

---

### `/src/components/sections/BenefitsSection.tsx`
**Purpose**: Features/benefits list

Key editable areas:
```typescript
// Section height (affects scroll duration)
className="relative min-h-[180vh] ..."  // 180vh = 1.8x viewport height

// Content alignment
className="... flex items-start ..."    // items-start = top, items-center = middle

// Text colors
className="text-red-500"    // "The Experience" label
className="text-black"      // Headings
className="text-black/70"   // Descriptions (70% opacity)
```

**To edit**:
- Change section height: Adjust `min-h-[]`
- Change text position: Adjust `items-start/center/end`
- Change colors: Adjust `text-[]` classes

---

### `/src/components/sections/EventsSection.tsx`
**Purpose**: Event types showcase (where phone grid appears)

```typescript
className="relative min-h-[200vh] ..."  // Extra tall for phone animation
```

**To edit**:
- Change height for more/less scroll time during phone animation

---

### `/src/components/sections/ContactSection.tsx`
**Purpose**: Final CTA with contact info

Contains:
- Main headline
- CTA buttons (WhatsApp, Email)
- Contact details grid

**To edit**:
- Change button text/links
- Modify contact info (or change in `constants.ts`)

---

### `/src/components/layout/Navigation.tsx`
**Purpose**: Fixed top navigation bar

Current structure:
- Left: Brand name (links to `/`)
- Right: "Book Now" button (links to `#section-contact`)

```typescript
// Brand name
<Link href="/">{BRAND.name}</Link>

// Book Now button
<Link href="#section-contact">Book Now</Link>
```

**To edit**:
- Change button destination: Modify `href`
- Add nav links: Add more `<Link>` elements

---

### `/src/components/ui/Button.tsx`
**Purpose**: Reusable button component

Variants:
- `primary`: Black background, white text
- `secondary`: White background, black text
- `outline`: Transparent with border
- `ghost`: Transparent, no border

Sizes:
- `sm`: Small padding
- `md`: Medium (default)
- `lg`: Large padding

Usage:
```tsx
<Button variant="primary" size="lg" href="/link">
  Button Text
</Button>
```

---

### `/src/components/ui/PhoneFrame.tsx`
**Purpose**: iPhone-style frame wrapper

Used in the phone grid animation. Wraps content in a realistic phone bezel.

---

## Styling System (Tailwind)

### Custom Colors (defined in `tailwind.config.js`)
```
cream: '#FFF8F0'      - Light background
charcoal: '#1a1a1a'   - Dark text/backgrounds
gold: '#C9A959'       - Accent color
```

### Common Tailwind Patterns Used

**Positioning**:
- `pt-[180px]` - Arbitrary padding top
- `top-[55%]` - Arbitrary top position
- `-translate-x-1/2` - Center horizontally
- `left-1/2` - Position at horizontal center

**Responsive**:
- `md:` prefix - Applies at 768px+
- `lg:` prefix - Applies at 1024px+

Example: `text-3xl md:text-4xl lg:text-5xl`
- Mobile: 3xl
- Tablet: 4xl  
- Desktop: 5xl

**Opacity**:
- `text-white/80` - White at 80% opacity
- `bg-black/20` - Black at 20% opacity

---

## Scroll Animation Timeline

| Scroll Position | Background | Flavor | Flavor Position |
|-----------------|------------|--------|-----------------|
| Hero (0-20%) | `hero` | 1 | Center, large |
| Benefits (20-50%) | `benefits` | 2 | Left side, medium |
| Events entry (50-60%) | `events` | 3 | Bottom-right, smaller |
| Phone grid (60-80%) | `events` | 3→4 | Hidden, phones appear |
| Contact (80-100%) | `contact` | 4 | In final phone frame |

---

## How to Make Common Edits

### Change Hero Text Position
File: `src/components/sections/HeroSection.tsx`
```typescript
// Find the section className and adjust pt-[]
className="... pt-[180px] md:pt-[240px]"
// Lower number = higher up, higher number = lower down
```

### Change Flavor Size
File: `src/components/visuals/ScrollAnimationController.tsx`
```typescript
// Find the flavor container className
className={`... w-[500px] h-[500px] md:w-[650px] md:h-[650px] lg:w-[750px] lg:h-[750px] ...`}
// Increase numbers for bigger, decrease for smaller
```

### Change Flavor Position
File: `src/components/visuals/ScrollAnimationController.tsx`
```typescript
// Find the flavor container className
className={`absolute top-[55%] left-1/2 ...`}
// top-[55%] = 55% from top (increase to move down)
// left-1/2 = centered (change to left-[30%] to move left)
```

### Change When Animations Trigger
File: `src/components/visuals/ScrollAnimationController.tsx`
```typescript
ScrollTrigger.create({
  trigger: '#section-benefits',
  start: 'top 80%',  // Change 80% to adjust when it triggers
                     // 'top 100%' = triggers when section enters viewport
                     // 'top 50%' = triggers when section is halfway up
});
```

### Change Background Images
File: `src/utils/constants.ts`
```typescript
backgrounds: {
  hero: '/assets/backgrounds/your-new-image.png',
  // ...
}
```
Then add the image file to: `public/assets/backgrounds/`

### Change Brand/Contact Info
File: `src/utils/constants.ts`
```typescript
export const BRAND = {
  name: 'Your Brand',
  phone: '+972 XX XXX XXXX',
  // ...
}
```

### Add a New Section
1. Create file: `src/components/sections/NewSection.tsx`
2. Import in `src/app/page.tsx`
3. Add to the sections list
4. (Optional) Add a ScrollTrigger in `ScrollAnimationController.tsx` if you want visual changes

---

## Asset Locations

```
public/
└── assets/
    ├── flavors/           # Transparent PNG images of kakigori
    │   ├── flavor-1.png   # Used in Hero
    │   ├── flavor-2.png   # Used in Benefits
    │   ├── flavor-3.png   # Used in Events
    │   └── flavor-4.png   # Used in Contact/Phone
    │
    ├── backgrounds/       # Full-screen background images
    │   ├── hero-section-cookies&cream.png
    │   ├── section-2-strawberry.png
    │   ├── Section3.jpg
    │   └── testimonal-section.png
    │
    └── icons/             # SVG icons (currently empty)
```

---

## Debugging Tips

1. **Text not showing?** Check `z-index` - content needs `z-10` or higher to appear above backgrounds

2. **Animation not triggering?** Check the `trigger` selector matches the section's `id`

3. **Tailwind class not working?** Might be an invalid class - check Tailwind docs or use arbitrary values `[180px]`

4. **Flavor in wrong position?** Check both:
   - Initial position in className (`top-[]`, `left-[]`)
   - Animation position in `gsap.to()` calls (`x`, `y` values)

5. **Background not changing?** Check:
   - Image path in `constants.ts`
   - File exists in `public/assets/backgrounds/`
   - `currentBg` state is updating (add console.log)

---

## Quick Reference: Z-Index Layers

| Layer | Z-Index | Contents |
|-------|---------|----------|
| Navigation | `z-50` | Logo, Book Now button |
| Mobile Menu | `z-40` | (if implemented) |
| Content | `z-10` | All section text/buttons |
| Visuals | `z-0` | Backgrounds, flavors, phones |

---

*Last updated: January 1, 2026*
