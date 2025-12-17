import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';

export function Home() {
  const { isRTL } = useLanguage();
  const t = useTranslation();

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-primary min-h-[70vh] flex items-center">
        <div className="container-custom">
          <div className={`flex flex-col md:flex-row items-center gap-8 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            {/* Image placeholder */}
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white text-6xl">👤</span>
            </div>

            {/* Text Content */}
            <div className="text-center md:text-left rtl:md:text-right">
              <h1 className="text-white mb-6">
                <span className="block">{t.hero.headline_line1}</span>
                <span className="block text-secondary">{t.hero.headline_line2}</span>
              </h1>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start rtl:md:justify-end">
                <Link to="/contact" className="btn-primary">
                  {t.hero.cta_primary}
                </Link>
                <Link to="/services" className="btn-secondary">
                  {t.hero.cta_secondary}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-primary mb-4">{t.services.title}</h2>
            <p className="text-text-light text-lg">{t.services.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service Card 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary text-2xl">⚙️</span>
              </div>
              <h3 className="text-xl mb-2">{t.services.automation.title}</h3>
              <p className="text-text-light text-sm">{t.services.automation.description}</p>
            </div>

            {/* Service Card 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary text-2xl">🤖</span>
              </div>
              <h3 className="text-xl mb-2">{t.services.ai.title}</h3>
              <p className="text-text-light text-sm">{t.services.ai.description}</p>
            </div>

            {/* Service Card 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary text-2xl">💬</span>
              </div>
              <h3 className="text-xl mb-2">{t.services.consulting.title}</h3>
              <p className="text-text-light text-sm">{t.services.consulting.description}</p>
            </div>

            {/* Service Card 4 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary text-2xl">💻</span>
              </div>
              <h3 className="text-xl mb-2">{t.services.webdev.title}</h3>
              <p className="text-text-light text-sm">{t.services.webdev.description}</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link to="/services" className="btn-primary">
              {t.services.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className={`flex flex-col md:flex-row items-center gap-12 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            {/* Image placeholder */}
            <div className="w-full md:w-1/3">
              <div className="w-full aspect-square rounded-2xl bg-primary/10 flex items-center justify-center">
                <span className="text-8xl">👨‍💻</span>
              </div>
            </div>

            {/* Text Content */}
            <div className="w-full md:w-2/3">
              <h2 className="text-primary mb-2">{t.about.title}</h2>
              <h3 className="text-3xl mb-4">{t.about.subtitle}</h3>
              <p className="text-text-light text-lg mb-6">{t.about.intro}</p>
              <Link to="/about" className="btn-primary">
                {t.about.cta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-primary section-padding">
        <div className="container-custom text-center">
          <h2 className="text-white mb-6">
            <span className="block">{t.hero.headline_line1}</span>
            <span className="block text-secondary">{t.hero.headline_line2}</span>
          </h2>
          <Link to="/contact" className="btn-primary inline-block">
            {t.hero.cta_primary}
          </Link>
        </div>
      </section>
    </main>
  );
}
