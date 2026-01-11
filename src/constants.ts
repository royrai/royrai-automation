/**
 * Application Constants
 * 
 * Centralized location for all constant values used throughout the application.
 * This includes default values, URL templates, and configuration settings.
 * 
 * Structure:
 * - defaults: Default text values and fallbacks
 * - urls: URL templates and patterns
 * - settings: Application configuration values
 */

import { siteData } from "./config/site-data";

export const constants = {
  /**
   * Default values (non-translatable)
   */
  defaults: {
    // Phone validation minimum digits
    phoneMinDigits: 7,
    // Default country code for phone input
    defaultCountryCode: "IL",
  },

  /**
   * URL templates and patterns
   */
  urls: {
    // WhatsApp
    whatsapp: {
      base: "https://wa.me",
      withNumber: (number: string) => `https://wa.me/${number}`,
      withMessage: (number: string, message: string) => 
        `https://wa.me/${number}?text=${encodeURIComponent(message)}`,
    },
    // Email providers
    email: {
      gmail: "https://mail.google.com/mail/?view=cm&fs=1",
      outlook: "https://outlook.live.com/mail/0/deeplink/compose",
      mailto: (email: string) => `mailto:${encodeURIComponent(email)}`,
    },
    // Social media (from site data)
    social: {
      linkedin: siteData.social.linkedin,
      instagram: siteData.social.instagram,
      facebook: siteData.social.facebook,
    },
  },

  /**
   * Application settings and configuration
   */
  settings: {
    // Animation durations (in ms)
    animations: {
      copyFeedback: 2000,
      tooltipDelay: 300,
      pageTransition: 300,
    },
    // Form validation
    validation: {
      emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      phoneMinLength: 7,
    },
    // Webhook URL (Make.com)
    webhooks: {
      contact: "https://hook.eu1.make.com/lshj73hpn4d93q1phj3xqq1dwy6ujqt6",
    },
  },
};

// Type exports for TypeScript support
export type Constants = typeof constants;
