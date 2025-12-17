import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';

export function Portfolio() {
  const { isRTL } = useLanguage();
  const t = useTranslation();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container-custom text-center">
          <h1 className="text-white mb-4">{t.portfolio.title}</h1>
          <p className="text-white/80 text-xl">{t.portfolio.subtitle}</p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.portfolio.items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                {/* Image placeholder */}
                <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative overflow-hidden">
                  <span className="text-7xl group-hover:scale-110 transition-transform duration-300">
                    {item.emoji}
                  </span>
                  {/* Result badge */}
                  <div className="absolute top-4 right-4 bg-secondary text-text-dark px-3 py-1 rounded-full text-sm font-medium">
                    {item.result}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-heading mb-3">{item.title}</h3>
                  <p className="text-text-light text-sm mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* View Project link - placeholder for now */}
                  <button className="flex items-center gap-2 text-primary font-medium hover:underline">
                    {t.portfolio.view_project}
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 section-padding">
        <div className="container-custom text-center">
          <h2 className="text-primary mb-4">{t.portfolio.want_similar}</h2>
          <p className="text-text-light text-lg mb-8 max-w-2xl mx-auto">
            {t.portfolio.want_similar_subtitle}
          </p>
          <Link to="/contact" className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2">
            {t.hero.cta_primary}
            <Arrow size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}
