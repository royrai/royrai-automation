import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { config } from '../../config';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
}

export function SEO({ title, description, image, type = 'website' }: SEOProps) {
  const { language } = useLanguage();
  const location = useLocation();

  const siteTitle = config.seo.siteName;
  const defaultTitle = config.seo.defaultTitle[language];
  const defaultDescription = config.seo.defaultDescription[language];
  const siteUrl = config.seo.siteUrl;
  const ogImage = image || `${siteUrl}${config.seo.ogImage}`;

  const fullTitle = title ? `${title} | ${siteTitle}` : defaultTitle;
  const fullDescription = description || defaultDescription;
  const canonicalUrl = `${siteUrl}${location.pathname}`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Helper to update or create meta tag
    const updateMetaTag = (property: string, content: string, isName = false) => {
      const attribute = isName ? 'name' : 'property';
      let element = document.querySelector(`meta[${attribute}="${property}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', fullDescription, true);
    updateMetaTag('author', 'Roy Ratzon', true);

    // Open Graph tags
    updateMetaTag('og:title', fullTitle);
    updateMetaTag('og:description', fullDescription);
    updateMetaTag('og:image', ogImage);
    updateMetaTag('og:url', canonicalUrl);
    updateMetaTag('og:type', type);
    updateMetaTag('og:site_name', siteTitle);
    updateMetaTag('og:locale', language === 'he' ? 'he_IL' : 'en_US');

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:title', fullTitle, true);
    updateMetaTag('twitter:description', fullDescription, true);
    updateMetaTag('twitter:image', ogImage, true);

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // Update alternate language links
    const updateAlternate = (lang: string, href: string) => {
      let link = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', lang);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    updateAlternate('en', `${siteUrl}${location.pathname}`);
    updateAlternate('he', `${siteUrl}${location.pathname}`);
    updateAlternate('x-default', `${siteUrl}${location.pathname}`);

  }, [fullTitle, fullDescription, ogImage, canonicalUrl, type, siteTitle, language, location.pathname]);

  return null; // This component doesn't render anything
}
