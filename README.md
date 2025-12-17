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

| File Name | Location | Description | Recommended Size |
|-----------|----------|-------------|------------------|
| `roy-hero.png` | Home page hero | Main photo with transparent background | 600x800px |
| `roy-about.jpg` | About page | Professional headshot | 500x500px |
| `og-image.png` | SEO/Social sharing | Shows when sharing on social media | 1200x630px |
| `favicon.ico` | Browser tab | Site favicon | 32x32px |

### Image Specifications

**`roy-hero.png`** (Home Page Hero)
- Format: PNG with transparent background
- Content: Professional photo of Roy
- Used in: Hero section on home page
- Tip: Use a high-quality cutout with no background

**`roy-about.jpg`** (About Page)
- Format: JPG or PNG
- Content: Professional headshot
- Used in: About page sidebar
- Tip: Square crop works best

**`og-image.png`** (Social Media Preview)
- Format: PNG
- Content: Logo + tagline, or professional photo with branding
- Used in: When site is shared on Facebook, LinkedIn, Twitter, WhatsApp
- Tip: Include text "Royrai Automation" and tagline

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
about: '/images/roy-about.jpg',
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
