# DESIGN SYSTEM - PanDao Logistics (Light Industrial Tech)

## Visual Philosophy
Sleek, industrial, and highly structured. This design uses strict grids, thin slate borders, and sharp typographic contrast to evoke a sense of global shipping containers, organized warehousing, and administrative precision.
- **Atmosphere:** Clean, bright, and clinical with sharp scarlet red highlights.
- **Grid Layout:** Prominent borders (`1px solid #E2E8F0`) that act as dividers and frame cards like warehouse storage cells.
- **Interactions:** Elevation shifts via soft, clean drop shadows (`box-shadow`) and smooth border color transformations.
- **Typography:** Bold, technical `Space Grotesk` for headlines and `Inter` for highly readable body text.

## Color Palette
```css
:root {
  /* Brand Colors */
  --color-brand-red: #E31E24;        /* Scarlet Red from logo */
  --color-brand-blue: #1F2245;       /* Navy Blue from logo */
  
  /* Backgrounds */
  --bg-primary: #FFFFFF;             /* Pure white */
  --bg-secondary: #F8FAFC;           /* Off-white Slate */
  --bg-card: #FFFFFF;
  --bg-card-hover: #FFFFFF;
  --bg-input: #FFFFFF;
  
  /* Borders & Grids */
  --border-grid: #E2E8F0;            /* Light slate grey border */
  --border-grid-active: #E31E24;      /* Scarlet highlight border */
  
  /* Text */
  --text-primary: #0F172A;           /* Charcoal black */
  --text-secondary: #475569;         /* Slate grey */
  --text-muted: #94A3B8;
  --text-accent: #E31E24;
  
  /* Shadows */
  --shadow-sm: 0 2px 8px rgba(15, 23, 42, 0.04);
  --shadow-md: 0 10px 30px rgba(15, 23, 42, 0.06);
  --shadow-hover: 0 20px 40px rgba(15, 23, 42, 0.1);
}
```

## Typography
- **Headings Font:** `Space Grotesk`, sans-serif (Google Fonts)
- **Body Font:** `Inter`, sans-serif (Google Fonts)
- **Font Sizes:**
  - Display 1: `56px` (Hero Title)
  - Heading 2: `36px` (Section Titles)
  - Heading 3: `22px` (Card Titles)
  - Body Large: `18px`
  - Body Regular: `15px`
  - Caption: `13px`

## Motion & Transitions
- **Easing Function:** `cubic-bezier(0.25, 1, 0.5, 1)` (Out-quart easing for clean modern feedback)
- **Hover Transitions:** `all 0.3s cubic-bezier(0.25, 1, 0.5, 1)`
- **Entrance Effects:** Slide-in and reveal animations based on Scroll Intersection Observer.
