import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTranslation } from '../../hooks/useTranslation';
import { Language, languageNames } from '../../data/translations/index';

export function Header() {
  const { language, setLanguage, isRTL } = useLanguage();
  const t = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const navLinks = [
    { to: '/', label: t.nav.home },
    { to: '/services', label: t.nav.services },
    { to: '/about', label: t.nav.about },
    { to: '/portfolio', label: t.nav.portfolio },
    { to: '/blog', label: t.nav.blog },
  ];

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsLangDropdownOpen(false);
  };

  return (
    <header className="bg-background sticky top-0 z-50 shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="font-heading text-2xl text-primary">Royrai</span>
            <span className="font-heading text-2xl text-text-dark ml-1">Automation</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="font-body text-text-dark hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side: Language + Contact CTA */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center space-x-1 rtl:space-x-reverse px-3 py-2 rounded-lg border border-gray-200 hover:border-primary transition-colors"
              >
                <span className="text-sm font-medium">{language.toUpperCase()}</span>
                <ChevronDown size={16} className={`transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangDropdownOpen && (
                <div className={`absolute top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden min-w-[120px] ${isRTL ? 'left-0' : 'right-0'}`}>
                  {(Object.keys(languageNames) as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`w-full px-4 py-2 text-left rtl:text-right hover:bg-gray-50 flex items-center space-x-2 rtl:space-x-reverse ${
                        language === lang ? 'bg-primary/10 text-primary' : 'text-text-dark'
                      }`}
                    >
                      {language === lang && <span>✓</span>}
                      <span>{languageNames[lang]}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Contact CTA - Desktop */}
            <Link
              to="/contact"
              className="hidden md:inline-flex btn-primary"
            >
              {t.nav.contact}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="font-body text-text-dark hover:text-primary transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="btn-primary text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.nav.contact}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
