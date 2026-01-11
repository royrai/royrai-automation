import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Mail } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useTranslation } from "../../hooks/useTranslation";
import { Language, languageNames } from "../../data/translations/index";
import { WhatsAppIcon } from "../ui/SocialIcons";

interface SubMenuItem {
  to: string;
  label: string;
  icon: React.ReactNode;
}

interface NavLink {
  to?: string;
  label: string;
  submenu?: SubMenuItem[];
}

/**
 * Header component with navigation, language selector, and contact CTA.
 *
 * Features:
 * - Desktop navigation with animated underline
 * - Mobile hamburger menu
 * - Tools submenu with hover dropdown
 * - Language selector
 * - Contact CTA button
 */
export function Header() {
  const { language, setLanguage, isRTL } = useLanguage();
  const txt = useTranslation();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isToolsHovered, setIsToolsHovered] = useState(false);
  const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(false);

  // Sliding underline state
  const [underlinePos, setUnderlinePos] = useState({ left: 0, width: 0 });
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Tools submenu items - using translations
  const toolsSubmenu: SubMenuItem[] = [
    {
      to: "/tools/email-link",
      label: txt.tools?.emailLink?.menuLabel || "Email Link",
      icon: <Mail size={18} className="text-primary" />,
    },
    {
      to: "/tools/whatsapp-link",
      label: txt.tools?.whatsappLink?.menuLabel || "WhatsApp Link",
      icon: <WhatsAppIcon size={18} />,
    },
  ];

  const navLinks: NavLink[] = [
    { to: "/", label: txt.nav.home },
    { to: "/services", label: txt.nav.services },
    { to: "/about", label: txt.nav.about },
    { to: "/portfolio", label: txt.nav.portfolio },
    { to: "/guides", label: txt.nav.guides },
    {
      to: "/tools",
      label: txt.nav.tools || "Tools",
      submenu: toolsSubmenu,
    },
  ];

  const isActivePath = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const isToolsActive = () => {
    return location.pathname.startsWith("/tools");
  };

  // Find active link index (excluding tools submenu)
  const getActiveIndex = () => {
    for (let i = 0; i < navLinks.length; i++) {
      const link = navLinks[i];
      if (link.to && isActivePath(link.to)) {
        return i;
      }
    }
    return -1;
  };

  const activeIndex = getActiveIndex();

  // Update underline position
  const updateUnderlinePosition = () => {
    if (!navContainerRef.current || activeIndex === -1) return;

    const container = navContainerRef.current;
    const items = container.querySelectorAll("[data-nav-item]");
    const activeItem = items[activeIndex] as HTMLElement;

    if (activeItem) {
      const containerRect = container.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();

      setUnderlinePos({
        left: itemRect.left - containerRect.left,
        width: itemRect.width,
      });
    }
  };

  useLayoutEffect(() => {
    updateUnderlinePosition();
  }, [activeIndex, language]);

  useEffect(() => {
    window.addEventListener("resize", updateUnderlinePosition);
    return () => window.removeEventListener("resize", updateUnderlinePosition);
  }, [activeIndex]);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsLangDropdownOpen(false);
  };

  return (
    <header className="bg-background sticky top-0 z-50 shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1" dir="ltr">
            <span className="font-heading text-2xl text-primary">Royrai</span>
            <span className="font-heading text-2xl text-text-dark">
              Automation
            </span>
          </Link>

          {/* Desktop Navigation with sliding underline */}
          <nav className="hidden md:block">
            <div
              ref={navContainerRef}
              className="relative flex items-center gap-8"
            >
              {navLinks.map((link, index) =>
                link.submenu ? (
                  // Tools with submenu
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => setIsToolsHovered(true)}
                    onMouseLeave={() => setIsToolsHovered(false)}
                  >
                    <Link
                      to={link.to!}
                      data-nav-item
                      className={`font-body transition-colors py-2 flex items-center gap-1 ${
                        isToolsActive()
                          ? "text-primary font-medium"
                          : "text-text-dark hover:text-primary"
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          isToolsHovered ? "rotate-180" : ""
                        }`}
                      />
                    </Link>

                    {/* Submenu dropdown */}
                    <div
                      className={`absolute top-full pt-2 ${
                        isRTL ? "right-0" : "left-0"
                      } transition-all duration-200 ${
                        isToolsHovered
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2"
                      }`}
                    >
                      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden min-w-[200px]">
                        {link.submenu.map((subItem) => (
                          <Link
                            key={subItem.to}
                            to={subItem.to}
                            className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                              isActivePath(subItem.to)
                                ? "bg-primary/5 text-primary"
                                : "text-text-dark"
                            }`}
                          >
                            {subItem.icon}
                            <span>{subItem.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Regular link
                  <Link
                    key={link.to}
                    to={link.to!}
                    data-nav-item
                    className={`font-body transition-colors py-2 ${
                      isActivePath(link.to!)
                        ? "text-primary font-medium"
                        : "text-text-dark hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}

              {/* Sliding underline */}
              <div
                className="absolute bottom-0 h-0.5 bg-primary rounded-full transition-all duration-300 ease-out"
                style={{
                  left: underlinePos.left,
                  width: underlinePos.width,
                  opacity: activeIndex >= 0 ? 1 : 0,
                }}
              />
            </div>
          </nav>

          {/* Right side: Language + Contact CTA */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center space-x-1 rtl:space-x-reverse px-3 py-2 rounded-lg border border-gray-200 hover:border-primary transition-colors"
              >
                <span className="text-sm font-medium">
                  {language.toUpperCase()}
                </span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    isLangDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isLangDropdownOpen && (
                <div
                  className={`absolute top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden min-w-[120px] ${
                    isRTL ? "left-0" : "right-0"
                  }`}
                >
                  {(Object.keys(languageNames) as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors ${
                        language === lang
                          ? "bg-primary/5 text-primary font-medium"
                          : "text-text-dark"
                      }`}
                    >
                      {languageNames[lang]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Contact CTA - Desktop */}
            <Link
              to="/contact"
              className={`hidden md:inline-flex btn-primary ${
                location.pathname === "/contact"
                  ? "ring-2 ring-primary ring-offset-2"
                  : ""
              }`}
            >
              {txt.nav.contact}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-text-dark hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link, index) =>
                link.submenu ? (
                  // Tools with submenu - mobile
                  <div key={index}>
                    <button
                      onClick={() => setIsMobileToolsOpen(!isMobileToolsOpen)}
                      className={`w-full flex items-center justify-between font-body transition-colors py-2 px-3 rounded-lg ${
                        isToolsActive()
                          ? "text-primary bg-primary/10 font-medium"
                          : "text-text-dark hover:text-primary hover:bg-gray-50"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          isMobileToolsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Mobile submenu */}
                    {isMobileToolsOpen && (
                      <div
                        className={`mt-1 ${isRTL ? "mr-4" : "ml-4"} space-y-1`}
                      >
                        <Link
                          to="/tools"
                          className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-colors ${
                            location.pathname === "/tools"
                              ? "text-primary bg-primary/10 font-medium"
                              : "text-text-dark hover:text-primary hover:bg-gray-50"
                          }`}
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setIsMobileToolsOpen(false);
                          }}
                        >
                          <span>{txt.tools?.allTools || "All Tools"}</span>
                        </Link>
                        {link.submenu.map((subItem) => (
                          <Link
                            key={subItem.to}
                            to={subItem.to}
                            className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-colors ${
                              isActivePath(subItem.to)
                                ? "text-primary bg-primary/10 font-medium"
                                : "text-text-dark hover:text-primary hover:bg-gray-50"
                            }`}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setIsMobileToolsOpen(false);
                            }}
                          >
                            {subItem.icon}
                            <span>{subItem.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  // Regular link - mobile
                  <Link
                    key={link.to}
                    to={link.to!}
                    className={`font-body transition-colors py-2 px-3 rounded-lg ${
                      isActivePath(link.to!)
                        ? "text-primary bg-primary/10 font-medium"
                        : "text-text-dark hover:text-primary hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <Link
                to="/contact"
                className={`btn-primary text-center ${
                  location.pathname === "/contact"
                    ? "ring-2 ring-primary ring-offset-2"
                    : ""
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {txt.nav.contact}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
