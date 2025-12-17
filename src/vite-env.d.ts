/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEBHOOK_CONTACT: string;
  readonly VITE_WEBHOOK_CHATBOT: string;
  readonly VITE_WEBHOOK_NEWSLETTER: string;
  readonly VITE_CALCOM_USERNAME: string;
  readonly VITE_CALCOM_EMBED: string;
  readonly VITE_WHATSAPP_NUMBER: string;
  readonly VITE_SITE_URL: string;
  readonly VITE_GA_ID: string;
  readonly VITE_FB_PIXEL_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
