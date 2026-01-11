// Application configuration - functionality and environment variables
// For text content and links, see site-data.ts
// For constants and URL templates, see constants.ts

import { siteData } from './site-data';

// Re-export for convenience
export { siteData } from './site-data';
export type { Language } from './site-data';

// Environment-based configuration
export const config = {
  // Webhook URLs (Make.com / n8n / Zapier)
  webhooks: {
    contactForm: import.meta.env.VITE_WEBHOOK_CONTACT || '',
    chatBot: import.meta.env.VITE_WEBHOOK_CHATBOT || '',
    newsletter: import.meta.env.VITE_WEBHOOK_NEWSLETTER || '',
  },

  // External services - merged with site data
  services: {
    calcom: {
      username: import.meta.env.VITE_CALCOM_USERNAME || siteData.calcom.username,
      embedUrl: import.meta.env.VITE_CALCOM_EMBED || siteData.calcom.embedUrl,
    },
    whatsapp: {
      number: import.meta.env.VITE_WHATSAPP_NUMBER || siteData.contact.whatsappNumber,
    },
  },

  // Social links from site data
  social: {
    ...siteData.social,
    email: siteData.contact.email,
    phoneDisplay: siteData.contact.phoneDisplay,
  },

  // SEO - merged with environment variables
  seo: {
    ...siteData.seo,
    siteUrl: import.meta.env.VITE_SITE_URL || siteData.seo.siteUrl,
  },

  // Analytics (for future use)
  analytics: {
    googleAnalyticsId: import.meta.env.VITE_GA_ID || '',
    facebookPixelId: import.meta.env.VITE_FB_PIXEL_ID || '',
  },
};

// Helper function to get WhatsApp URL
// Uses URL templates from constants
export function getWhatsAppUrl(message?: string): string {
  const { number } = config.services.whatsapp;
  if (!number) return '';
  
  if (message) {
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  }
  return `https://wa.me/${number}`;
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
