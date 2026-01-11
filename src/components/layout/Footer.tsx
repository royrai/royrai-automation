import { Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { SocialMediaButtonsGroup } from '../ui/SocialMediaButtons';

export function Footer() {
  const txt = useTranslation();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { to: '/', label: txt.nav.home },
    { to: '/services', label: txt.nav.services },
    { to: '/about', label: txt.nav.about },
    { to: '/portfolio', label: txt.nav.portfolio },
    { to: '/guides', label: txt.nav.guides },
    { to: '/contact', label: txt.nav.contact },
  ];

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
            <p className="text-white/80 mb-4">{txt.footer.tagline}</p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-heading text-lg mb-4">{txt.footer.quick_links}</h4>
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
            <h4 className="font-heading text-lg mb-4">{txt.footer.connect}</h4>
            <div className="flex items-center gap-3">
              <SocialMediaButtonsGroup variant="circle" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/60">
          <p>© {currentYear} Royrai Automation. {txt.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
