import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { ChatBot } from "./components/ui/ChatBot";
import { WhatsAppButton } from "./components/ui/WhatsAppButton";
import { ScrollToTop } from "./components/ui/ScrollToTop";
import { ErrorBoundary } from "./components/common/ErrorBoundary";
import { Loading } from "./components/common/Loading";
import { SEO } from "./components/common/SEO";
import { ScrollToTopOnNav } from "./components/common/ScrollToTopOnNav";
import { PageTransition } from "./components/common/PageTransition";
import { useTranslation } from "./hooks/useTranslation";

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/Home").then(m => ({ default: m.Home })));
const Services = lazy(() => import("./pages/Services").then(m => ({ default: m.Services })));
const About = lazy(() => import("./pages/About").then(m => ({ default: m.About })));
const Portfolio = lazy(() => import("./pages/Portfolio").then(m => ({ default: m.Portfolio })));
const Guides = lazy(() => import("./pages/Guides").then(m => ({ default: m.Guides })));
const Contact = lazy(() => import("./pages/Contact").then(m => ({ default: m.Contact })));
const ToolsIndex = lazy(() => import("./pages/ToolsIndex").then(m => ({ default: m.ToolsIndex })));
const EmailLinkGenerator = lazy(() => import("./pages/EmailLinkGenerator").then(m => ({ default: m.EmailLinkGenerator })));
const WhatsAppLinkGenerator = lazy(() => import("./pages/WhatsAppLinkGenerator").then(m => ({ default: m.WhatsAppLinkGenerator })));
const NotFound = lazy(() => import("./pages/NotFound").then(m => ({ default: m.NotFound })));

/**
 * PageSEO - Sets the page title based on current route
 */
function PageSEO() {
  const location = useLocation();
  const t = useTranslation();
  
  const pageTitles: Record<string, string> = {
    "/": "",
    "/services": t.nav.services,
    "/about": t.nav.about,
    "/portfolio": t.nav.portfolio,
    "/guides": t.nav.guides,
    "/contact": t.nav.contact,
    "/tools": "Tools",
    "/tools/email-link": "Email Link Generator",
    "/tools/whatsapp-link": "WhatsApp Link Generator",
  };

  const title = pageTitles[location.pathname];
  
  return <SEO title={title} />;
}

/**
 * AppContent - Main app content with routing
 */
function AppContent() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTopOnNav />
      <PageSEO />
      <Header />
      <div className="flex-grow">
        <ErrorBoundary>
          <Suspense fallback={<Loading fullScreen />}>
            <PageTransition>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/about" element={<About />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/guides" element={<Guides />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/tools" element={<ToolsIndex />} />
                <Route path="/tools/email-link" element={<EmailLinkGenerator />} />
                <Route path="/tools/whatsapp-link" element={<WhatsAppLinkGenerator />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PageTransition>
          </Suspense>
        </ErrorBoundary>
      </div>
      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
      <ChatBot />
    </div>
  );
}

/**
 * App - Root component with providers
 */
function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}

export default App;
