// Site data - all text content, links, and static information
// Edit this file to change contact info, social links, etc.

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
    // Will be loaded from environment variable if set
    whatsappNumber: '972555081977',
    whatsappMessages: {
      en: "Hi Roy, I'm interested in learning more about automation for my business.",
      he: 'היי רועי, אני מעוניין ללמוד עוד על אוטומציה לעסק שלי.',
    },
  },

  // Social media links
  social: {
    linkedin: 'https://linkedin.com/in/royratzon',
    instagram: 'https://instagram.com/royrai.dev',
    facebook: 'https://facebook.com/royrai.automation',
    // Add more as needed:
    // twitter: 'https://twitter.com/...',
    // youtube: 'https://youtube.com/...',
    // tiktok: 'https://tiktok.com/@...',
  },

  // Social media display names (for contact page)
  socialLabels: {
    linkedin: {
      en: 'Connect with me',
      he: 'התחבר איתי',
    },
    instagram: {
      en: '@royrai.dev',
      he: '@royrai.dev',
    },
    facebook: {
      en: 'Follow on Facebook',
      he: 'עקוב בפייסבוק',
    },
    whatsapp: {
      en: 'Send a message',
      he: 'שלח הודעה',
    },
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
    titles: {
      en: 'Royrai Automation - Smart Business Automation',
      he: 'Royrai Automation - אוטומציה עסקית חכמה',
    },
    descriptions: {
      en: 'I build the systems. You enjoy the freedom. Smart business automation that saves you time and lets you focus on what really matters.',
      he: 'אני בונה את המערכות. אתה נהנה מהחופש. אוטומציה עסקית חכמה שחוסכת לך זמן ומאפשרת לך להתמקד במה שבאמת חשוב.',
    },
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

// Helper to get localized text
export function getLocalizedText(
  obj: { en: string; he: string },
  language: Language
): string {
  return obj[language] || obj.en;
}
