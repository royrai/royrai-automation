/**
 * Social media button components with self-contained functionality
 *
 * Each button handles its own URL generation and styling.
 * Supports three variants:
 * - "circle": Circular buttons with brand colors (for Footer)
 * - "card": Card-style buttons with labels (for Contact page)
 * - "floating": Fixed floating button (for WhatsApp global button)
 */

import { useLanguage } from '../../context/LanguageContext';
import { useTranslation } from '../../hooks/useTranslation';
import { getWhatsAppUrl, siteData } from '../../config';
import { constants } from '../../constants';
import {
  WhatsAppIcon,
  InstagramIcon,
  FacebookIcon,
  LinkedInIcon,
  EmailIcon
} from './SocialIcons';

type ButtonVariant = 'circle' | 'card' | 'floating';

interface ISocialMediaButtonProps {
  variant?: ButtonVariant;
}

// Base styles for each variant
const circleBaseStyles = "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110";
const cardBaseStyles = "flex flex-col items-center gap-1 p-3 rounded-xl border border-gray-200 hover:border-primary/30 hover:bg-gray-50 transition-all";
const cardDisabledStyles = "flex flex-col items-center gap-1 p-3 rounded-xl border border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed";

/**
 * WhatsApp Button - Opens WhatsApp chat with pre-filled message
 * Supports: circle (Footer), card (Contact), floating (global button)
 */
export function WhatsAppButton({ variant = 'circle' }: ISocialMediaButtonProps) {
  const { isRTL } = useLanguage();
  const txt = useTranslation();

  const message = txt.contact?.whatsappMessage || "";
  const url = getWhatsAppUrl(message);
  const finalUrl = url || constants.urls.whatsapp.base;
  const isEnabled = !!siteData.contact.whatsappNumber;

  if (!isEnabled) {
    if (variant === 'card') {
      return (
        <div className={cardDisabledStyles} title={txt.contact?.comingSoon || "Coming soon"}>
          <WhatsAppIcon size={28} />
          <span className="text-xs text-text-light">WhatsApp</span>
        </div>
      );
    }
    return null;
  }

  // Floating variant (global button)
  if (variant === 'floating') {
    return (
      <a
        href={finalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-24 ${isRTL ? "left-6" : "right-6"} z-40 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#128C7E] hover:scale-110 transition-all duration-300 flex items-center justify-center group`}
        aria-label="Contact via WhatsApp"
      >
        <WhatsAppIcon size={28} color="white" />
        {/* Tooltip */}
        <span
          className={`absolute ${isRTL ? "left-16" : "right-16"} whitespace-nowrap bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
        >
          {txt.socialMedia.whatsappTooltip}
        </span>
      </a>
    );
  }

  // Card variant (Contact page)
  if (variant === 'card') {
    return (
      <a
        href={finalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cardBaseStyles}
        title={txt.socialMedia.whatsappTooltip}
      >
        <WhatsAppIcon size={28} />
        <span className="text-xs text-text-light">WhatsApp</span>
      </a>
    );
  }

  // Circle variant (Footer)
  return (
    <a
      href={finalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${circleBaseStyles} bg-[#25D366] hover:bg-[#128C7E]`}
      aria-label={txt.socialMedia.whatsappTooltip}
      title={txt.socialMedia.whatsappTooltip}
    >
      <WhatsAppIcon size={20} color="white" />
    </a>
  );
}

/**
 * Facebook Button - Opens Facebook page
 */
export function FacebookButton({ variant = 'circle' }: ISocialMediaButtonProps) {
  const txt = useTranslation();

  const url = siteData.social.facebook;
  const isEnabled = !!url;

  if (!isEnabled) {
    if (variant === 'card') {
      return (
        <div className={cardDisabledStyles} title={txt.contact?.comingSoon || "Coming soon"}>
          <FacebookIcon size={28} />
          <span className="text-xs text-text-light">Facebook</span>
        </div>
      );
    }
    return null;
  }

  if (variant === 'card') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cardBaseStyles}
        title={txt.socialMedia.facebookTooltip}
      >
        <FacebookIcon size={28} />
        <span className="text-xs text-text-light">Facebook</span>
      </a>
    );
  }

  // Circle variant (Footer)
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${circleBaseStyles} bg-[#1877F2] hover:bg-[#0d65d9]`}
      aria-label={txt.socialMedia.facebookTooltip}
      title={txt.socialMedia.facebookTooltip}
    >
      <FacebookIcon size={20} color="white" />
    </a>
  );
}

/**
 * Instagram Button - Opens Instagram profile
 */
export function InstagramButton({ variant = 'circle' }: ISocialMediaButtonProps) {
  const txt = useTranslation();

  const url = siteData.social.instagram;
  const isEnabled = !!url;

  if (!isEnabled) {
    if (variant === 'card') {
      return (
        <div className={cardDisabledStyles} title={txt.contact?.comingSoon || "Coming soon"}>
          <InstagramIcon size={28} />
          <span className="text-xs text-text-light">Instagram</span>
        </div>
      );
    }
    return null;
  }

  if (variant === 'card') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cardBaseStyles}
        title={txt.socialMedia.instagramTooltip}
      >
        <InstagramIcon size={28} />
        <span className="text-xs text-text-light">Instagram</span>
      </a>
    );
  }

  // Circle variant (Footer)
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${circleBaseStyles} bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] hover:from-[#E4405F] hover:via-[#C13584] hover:to-[#5851DB]`}
      aria-label={txt.socialMedia.instagramTooltip}
      title={txt.socialMedia.instagramTooltip}
    >
      <InstagramIcon size={20} color="white" />
    </a>
  );
}

/**
 * LinkedIn Button - Opens LinkedIn profile
 */
export function LinkedInButton({ variant = 'circle' }: ISocialMediaButtonProps) {
  const txt = useTranslation();

  const url = siteData.social.linkedin;
  const isEnabled = !!url;

  if (!isEnabled) {
    if (variant === 'card') {
      return (
        <div className={cardDisabledStyles} title={txt.contact?.comingSoon || "Coming soon"}>
          <LinkedInIcon size={28} />
          <span className="text-xs text-text-light">LinkedIn</span>
        </div>
      );
    }
    return null;
  }

  if (variant === 'card') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cardBaseStyles}
        title={txt.socialMedia.linkedinTooltip}
      >
        <LinkedInIcon size={28} />
        <span className="text-xs text-text-light">LinkedIn</span>
      </a>
    );
  }

  // Circle variant (Footer)
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${circleBaseStyles} bg-[#0A66C2] hover:bg-[#004182]`}
      aria-label={txt.socialMedia.linkedinTooltip}
      title={txt.socialMedia.linkedinTooltip}
    >
      <LinkedInIcon size={20} color="white" />
    </a>
  );
}

/**
 * Email Button - Opens default email client
 */
export function EmailButton({ variant = 'circle' }: ISocialMediaButtonProps) {
  const txt = useTranslation();

  const email = siteData.contact.email;
  const url = email ? constants.urls.email.mailto(email) : '';
  const isEnabled = !!email;

  if (!isEnabled) {
    if (variant === 'card') {
      return (
        <div className={cardDisabledStyles} title={txt.contact?.comingSoon || "Coming soon"}>
          <EmailIcon size={28} />
          <span className="text-xs text-text-light">Email</span>
        </div>
      );
    }
    return null;
  }

  if (variant === 'card') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cardBaseStyles}
        title={txt.socialMedia.emailTooltip}
      >
        <EmailIcon size={28} />
        <span className="text-xs text-text-light">Email</span>
      </a>
    );
  }

  // Circle variant (Footer)
  return (
    <a
      href={url}
      className={`${circleBaseStyles} bg-white/10 hover:bg-white/20`}
      aria-label={txt.socialMedia.emailTooltip}
      title={txt.socialMedia.emailTooltip}
    >
      <EmailIcon size={20} color="white" />
    </a>
  );
}

/**
 * Container component that renders all social media buttons
 * Useful when you want to render all buttons at once
 */
export function SocialMediaButtonsGroup({ variant = 'circle' }: ISocialMediaButtonProps) {
  return (
    <>
      <WhatsAppButton variant={variant} />
      <FacebookButton variant={variant} />
      <InstagramButton variant={variant} />
      <LinkedInButton variant={variant} />
      <EmailButton variant={variant} />
    </>
  );
}
