# DESIGN SYSTEM - PanDao Logistics

## Visual Philosophy
Premium, technological, and highly reliable. The design must communicate "Control, Responsibility, and Infrastructure" rather than just "moving boxes". 
We achieve this through:
- **Atmosphere:** Dark Slate/Obsidian palette with bright technological accents.
- **Glassmorphism:** Frosted glass cards with thin border gradients, representing transparent and modern operations.
- **Micro-interactions:** Custom hover states, smooth scroll-driven entries, and sleek transitions using cubic-bezier.
- **Typography:** Large, bold geometric headings paired with clean, readable body text.

## Color Palette
```css
:root {
  /* Brand Colors */
  --color-brand-red: #E31E24;        /* Scarlet Red from logo */
  --color-brand-blue: #1F2245;       /* Navy Blue from logo */
  
  /* Backgrounds */
  --bg-obsidian: #08090E;            /* Main dark background */
  --bg-card: rgba(20, 24, 38, 0.6);  /* Semi-transparent glass card */
  --bg-card-hover: rgba(30, 36, 56, 0.85);
  --bg-input: rgba(10, 12, 22, 0.8);
  
  /* Borders & Highlights */
  --border-glow: rgba(227, 30, 36, 0.15);
  --border-card: rgba(255, 255, 255, 0.08);
  --border-card-hover: rgba(227, 30, 36, 0.3);
  
  /* Text */
  --text-primary: #FFFFFF;
  --text-secondary: #94A3B8;         /* Muted slate blue-gray */
  --text-muted: #64748B;
  --text-accent: #E31E24;
}
```

## Typography
- **Headings Font:** `Outfit`, sans-serif (Google Fonts)
- **Body Font:** `Inter`, sans-serif (Google Fonts)
- **Font Sizes:**
  - Display 1: `64px` (Main Hero Title)
  - Heading 2: `40px` (Section Titles)
  - Heading 3: `24px` (Card Titles)
  - Body Large: `18px`
  - Body Regular: `16px`
  - Caption: `14px`

## Motion & Transitions
- **Easing Function:** `cubic-bezier(0.16, 1, 0.3, 1)` (Ultra smooth iOS-like motion)
- **Hover Transitions:** `all 0.3s cubic-bezier(0.16, 1, 0.3, 1)`
- **Entrance Effects:** Intersection Observer will trigger `.fade-in-up` animations when elements scroll into view.
