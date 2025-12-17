# Royrai Automation Website

A professional business website for Royrai Automation - Smart business automation consulting.

## Tech Stack

- **Framework:** React 18 with TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **Icons:** Lucide React
- **Build:** Vite

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Configure environment (optional):**
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

3. **Start development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:3000`

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# Webhook URLs (Make.com / n8n / Zapier)
VITE_WEBHOOK_CONTACT=your_webhook_url
VITE_WEBHOOK_CHATBOT=your_webhook_url
VITE_WEBHOOK_NEWSLETTER=your_webhook_url

# WhatsApp (number without + or spaces)
VITE_WHATSAPP_NUMBER=5511999999999

# Cal.com Integration
VITE_CALCOM_USERNAME=royrai

# Site URL (for SEO)
VITE_SITE_URL=https://royrai.com
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── common/      # SEO, ErrorBoundary, Loading
│   ├── layout/      # Header, Footer
│   └── ui/          # ChatBot, WhatsApp, ScrollToTop
├── config/          # App configuration, webhooks
├── context/         # React contexts (Language)
├── data/
│   └── translations/  # Separate language files
│       ├── en.ts      # English
│       ├── he.ts      # Hebrew
│       └── index.ts   # Exports
├── hooks/           # Custom hooks
├── pages/           # Page components
└── styles/          # Global styles
```

## Features

- ✅ Multi-language support (English/Hebrew)
- ✅ RTL/LTR automatic switching
- ✅ Responsive design
- ✅ Smooth page transitions (fade in/out)
- ✅ Animated navigation underline
- ✅ Contact form with webhook integration
- ✅ Interactive ChatBot with webhook support
- ✅ WhatsApp floating button
- ✅ Scroll to top button
- ✅ SEO optimization (Open Graph, Twitter Cards)
- ✅ Lazy loading for performance
- ✅ Error boundaries
- ✅ Mobile-friendly navigation

## Required Images

All images should be placed in the `public/images/` folder.

### Required Files

| File Name | Used In | Description | Recommended Size |
|-----------|---------|-------------|------------------|
| `roy-hero.png` | Home page (hero section) | Photo with transparent background, in circle | 600x800px |
| `roy-about.png` | Home page (about preview) + About page | Professional headshot, square | 500x500px |
| `og-image.png` | SEO/Social sharing (meta tags) | Shows when sharing on social media | 1200x630px |
| `favicon.svg` | Browser tab | Site icon | Any size (SVG) |

### Image Specifications

**`roy-hero.png`** (Home Page Hero)
- Format: **PNG with transparent background** (required!)
- Content: Professional photo of Roy - cutout/extracted from background
- Used in: Hero section, displayed inside a circle with gradient border
- Tip: Use a high-quality cutout with no background

**`roy-about.png`** (About Section & About Page)
- Format: **PNG** (or JPG if you rename it in `src/config/site-data.ts`)
- Content: Professional headshot with background
- Used in: 
  - Home page "About" preview section
  - About page sidebar
- Tip: Square crop works best (1:1 ratio)

**`og-image.png`** (Social Media Preview)
- Format: **PNG**
- Content: Branded image with logo + tagline
- Used in: When site is shared on Facebook, LinkedIn, Twitter, WhatsApp
- Tip: Include "Royrai Automation" text and a professional photo
- This image won't appear on the website itself, only when sharing links

### How to Add Images

1. Place your images in `public/images/` folder
2. Use **exact file names** as listed above
3. Run `npm run dev` and check if images appear
4. If images don't appear, check browser console for 404 errors

### Changing Image Names or Formats

If you want to use different file names or formats, edit `src/config/site-data.ts`:

```typescript
images: {
  hero: '/images/roy-hero.png',      // Change file name here
  about: '/images/roy-about.png',    // Change file name here
  ogImage: '/images/og-image.png',   // Change file name here
  favicon: '/favicon.svg',
},
```

### Optional Images

For portfolio and blog posts, add images to:
- `public/images/portfolio/` - Project screenshots
- `public/images/blog/` - Blog post thumbnails

### Image Path Usage in Code

Images are referenced in code as:
```typescript
// In React components
<img src="/images/roy-hero.png" alt="..." />

// In site-data.ts configuration
hero: '/images/roy-hero.png',
about: '/images/roy-about.png',
ogImage: '/images/og-image.png',
```

## Webhook Integration

The website is designed to work with Make.com, n8n, or Zapier:

1. **Contact Form:** Sends form data to `VITE_WEBHOOK_CONTACT`
2. **ChatBot:** Sends conversation data to `VITE_WEBHOOK_CHATBOT`
3. **Newsletter:** Sends email to `VITE_WEBHOOK_NEWSLETTER`

Payload structure:
```json
{
  "source": "contact_form|chatbot|newsletter",
  "timestamp": "2025-12-17T00:00:00.000Z",
  "data": { ... },
  "language": "en|he",
  "page_url": "/contact"
}
```

## Brand Colors

- Primary (Teal): `#0FA4A0`
- Secondary (Gold): `#f7ce46`
- Background: `#FDFBF7`
- Text Dark: `#333333`
- Text Light: `#666666`

## Fonts

- Headings: Secular One
- Body: Rubik

## Deployment

Build for production:
```bash
npm run build
```

The `dist` folder can be deployed to:
- Vercel
- Netlify
- Cloudflare Pages
- Any static hosting

---

Created for Royrai Automation © 2025
