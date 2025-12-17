// Application configuration
// Replace placeholder values with your actual URLs

export const config = {
  // Webhook URLs (Make.com / n8n / Zapier)
  webhooks: {
    contactForm: import.meta.env.VITE_WEBHOOK_CONTACT || '',
    chatBot: import.meta.env.VITE_WEBHOOK_CHATBOT || '',
    newsletter: import.meta.env.VITE_WEBHOOK_NEWSLETTER || '',
  },

  // External services
  services: {
    calcom: {
      // Your Cal.com username or embed URL
      username: import.meta.env.VITE_CALCOM_USERNAME || 'royrai',
      embedUrl: import.meta.env.VITE_CALCOM_EMBED || '',
    },
    whatsapp: {
      // Your WhatsApp number with country code (no + or spaces)
      number: import.meta.env.VITE_WHATSAPP_NUMBER || '',
      // Default message when clicking WhatsApp button
      defaultMessage: {
        en: "Hi Roy, I'm interested in learning more about automation for my business.",
        he: 'היי רועי, אני מעוניין ללמוד עוד על אוטומציה לעסק שלי.',
      },
    },
  },

  // Social media links
  social: {
    linkedin: 'https://linkedin.com/in/royratzon',
    instagram: 'https://instagram.com/royrai.automation',
    facebook: 'https://facebook.com/royrai.automation',
    email: 'roy@royrai.com',
  },

  // SEO defaults
  seo: {
    siteName: 'Royrai Automation',
    defaultTitle: {
      en: 'Royrai Automation - Smart Business Automation',
      he: 'Royrai Automation - אוטומציה עסקית חכמה',
    },
    defaultDescription: {
      en: 'I build the systems. You enjoy the freedom. Smart business automation that saves you time and lets you focus on what really matters.',
      he: 'אני בונה את המערכות. אתה נהנה מהחופש. אוטומציה עסקית חכמה שחוסכת לך זמן ומאפשרת לך להתמקד במה שבאמת חשוב.',
    },
    siteUrl: import.meta.env.VITE_SITE_URL || 'https://royrai.com',
    ogImage: '/images/og-image.png',
  },

  // Analytics (for future use)
  analytics: {
    googleAnalyticsId: import.meta.env.VITE_GA_ID || '',
    facebookPixelId: import.meta.env.VITE_FB_PIXEL_ID || '',
  },
};

// Helper function to get WhatsApp URL
export function getWhatsAppUrl(language: 'en' | 'he'): string {
  const { number, defaultMessage } = config.services.whatsapp;
  if (!number) return '';
  
  const message = encodeURIComponent(defaultMessage[language]);
  return `https://wa.me/${number}?text=${message}`;
}

// Helper function to send webhook
export async function sendWebhook(
  webhookUrl: string,
  data: Record<string, unknown>
): Promise<{ success: boolean; error?: string }> {
  if (!webhookUrl) {
    console.log('Webhook URL not configured. Data:', data);
    return { success: true }; // Return success for development
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
        source: 'royrai-automation-website',
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Webhook error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
