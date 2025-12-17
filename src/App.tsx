import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ChatBot } from './components/ui/ChatBot';
import { WhatsAppButton } from './components/ui/WhatsAppButton';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { Loading } from './components/common/Loading';
import { SEO } from './components/common/SEO';
import { useTranslation } from './hooks/useTranslation';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Services = lazy(() => import('./pages/Services').then(m => ({ default: m.Services })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Portfolio = lazy(() => import('./pages/Portfolio').then(m => ({ default: m.Portfolio })));
const Blog = lazy(() => import('./pages/Blog').then(m => ({ default: m.Blog })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));

// SEO wrapper that updates meta tags based on route
function PageSEO() {
  const location = useLocation();
  const t = useTranslation();
  
  const pageTitles: Record<string, string> = {
    '/': '',
    '/services': t.nav.services,
    '/about': t.nav.about,
    '/portfolio': t.nav.portfolio,
    '/blog': t.nav.blog,
    '/contact': t.nav.contact,
  };

  const title = pageTitles[location.pathname];
  
  return <SEO title={title} />;
}

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageSEO />
      <Header />
      <div className="flex-grow">
        <ErrorBoundary>
          <Suspense fallback={<Loading fullScreen />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
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
