import { Link } from 'react-router-dom';
import { Mail, Linkedin, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { useLanguage } from '../../context/LanguageContext';
import { config, getWhatsAppUrl } from '../../config';

export function Footer() {
  const t = useTranslation();
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { to: '/', label: t.nav.home },
    { to: '/services', label: t.nav.services },
    { to: '/about', label: t.nav.about },
    { to: '/portfolio', label: t.nav.portfolio },
    { to: '/blog', label: t.nav.blog },
    { to: '/contact', label: t.nav.contact },
  ];

  const whatsappUrl = getWhatsAppUrl(language);

  const socialLinks = [
    { href: `mailto:${config.social.email}`, icon: Mail, label: 'Email' },
    ...(whatsappUrl ? [{ href: whatsappUrl, icon: MessageCircle, label: 'WhatsApp' }] : []),
    { href: config.social.linkedin, icon: Linkedin, label: 'LinkedIn' },
    { href: config.social.instagram, icon: Instagram, label: 'Instagram' },
    { href: config.social.facebook, icon: Facebook, label: 'Facebook' },
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Column */}
          <div>
            <div className="mb-4">
              <span className="font-heading text-2xl">Royrai</span>
              <span className="font-heading text-2xl text-secondary ml-1">Automation</span>
            </div>
            <p className="text-white/80 mb-4">{t.footer.tagline}</p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-heading text-lg mb-4">{t.footer.quick_links}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/80 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h4 className="font-heading text-lg mb-4">{t.footer.connect}</h4>
            <div className="flex space-x-4 rtl:space-x-reverse">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-secondary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/60">
          <p>© {currentYear} Royrai Automation. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
