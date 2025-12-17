import { Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { useLanguage } from '../../context/LanguageContext';
import { config, getWhatsAppUrl } from '../../config';
import { 
  WhatsAppIcon, 
  InstagramIcon, 
  FacebookIcon, 
  LinkedInIcon, 
  EmailIcon 
} from '../ui/SocialIcons';

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

  return (
    <footer className="bg-primary text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Column */}
          <div>
            {/* Logo - always LTR to keep brand name in correct order */}
            <div className="mb-4 flex items-center gap-1" dir="ltr">
              <span className="font-heading text-2xl">Royrai</span>
              <span className="font-heading text-2xl text-secondary">Automation</span>
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
            <div className="flex items-center gap-3">
              {/* Email */}
              <a
                href={`mailto:${config.social.email}`}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 text-white hover:scale-110"
                aria-label="Email"
              >
                <EmailIcon size={20} />
              </a>

              {/* WhatsApp */}
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#25D366] hover:bg-[#128C7E] flex items-center justify-center transition-all duration-300 text-white hover:scale-110"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon size={20} />
                </a>
              )}

              {/* LinkedIn */}
              <a
                href={config.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#0A66C2] hover:bg-[#004182] flex items-center justify-center transition-all duration-300 text-white hover:scale-110"
                aria-label="LinkedIn"
              >
                <LinkedInIcon size={20} />
              </a>

              {/* Instagram */}
              <a
                href={config.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] hover:from-[#E4405F] hover:via-[#C13584] hover:to-[#5851DB] flex items-center justify-center transition-all duration-300 text-white hover:scale-110"
                aria-label="Instagram"
              >
                <InstagramIcon size={20} />
              </a>

              {/* Facebook */}
              <a
                href={config.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#1877F2] hover:bg-[#0d65d9] flex items-center justify-center transition-all duration-300 text-white hover:scale-110"
                aria-label="Facebook"
              >
                <FacebookIcon size={20} />
              </a>
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
