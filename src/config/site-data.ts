// Site data - all text content, links, and static information
// Edit this file to change contact info, social links, etc.
// NOTE: Translations belong in src/data/translations/, not here.

export const siteData = {
  // Brand information
  brand: {
    name: 'Royrai Automation',
    nameParts: {
      first: 'Royrai',
      second: 'Automation',
    },
    owner: 'Roy Ratzon',
  },

  // Contact information
  contact: {
    email: 'roy@royrai.com',
    // Phone number for display (formatted)
    phoneDisplay: '+972-55-508-1977',
    // WhatsApp number with country code (no + or spaces or dashes)
    whatsappNumber: '972555081977',
  },

  // Social media links (URLs only - labels are in translation files)
  social: {
    linkedin: 'https://linkedin.com/in/royratzon',
    instagram: 'https://instagram.com/royrai.dev',
    facebook: 'https://facebook.com/royrai.automation',
    // Add more as needed:
    // twitter: 'https://twitter.com/...',
    // youtube: 'https://youtube.com/...',
    // tiktok: 'https://tiktok.com/@...',
  },

  // Cal.com integration
  calcom: {
    username: 'royrai',
    // Will be loaded from environment variable if set
    embedUrl: '', // Set in .env as VITE_CALCOM_EMBED
  },

  // SEO defaults
  seo: {
    siteName: 'Royrai Automation',
    siteUrl: 'https://royrai.com', // Will be overridden by VITE_SITE_URL if set
    ogImage: '/images/og-image.png',
  },

  // Images paths
  images: {
    hero: '/images/roy-hero.png',
    about: '/images/roy-about.png',
    ogImage: '/images/og-image.png',
    favicon: '/favicon.svg',
  },
};

// Type for language keys
export type Language = 'en' | 'he';

// Helper to get localized text from translation object
export function getLocalizedText(
  obj: { en: string; he: string },
  language: Language
): string {
  return obj[language] || obj.en;
}
