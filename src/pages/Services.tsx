import { Link } from 'react-router-dom';
import { Workflow, Bot, MessageSquare, Code, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';

export function Services() {
  const { isRTL } = useLanguage();
  const txt = useTranslation();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const serviceIcons = [Workflow, Bot, MessageSquare, Code];
  const serviceKeys = ['automation', 'ai', 'consulting', 'webdev'] as const;

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container-custom text-center">
          <h1 className="text-white mb-4">{txt.services.title}</h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto">{txt.services.subtitle}</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceKeys.map((key, index) => {
              const Icon = serviceIcons[index];
              const service = txt.services[key];
              return (
                <div
                  key={key}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="text-primary" size={32} />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl mb-3 font-heading">{service.title}</h2>
                      <p className="text-text-light mb-4 leading-relaxed">{service.description}</p>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-text-light">
                            <CheckCircle className="text-primary flex-shrink-0" size={16} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-primary mb-4">{txt.services.process.title}</h2>
            <p className="text-text-light text-lg">{txt.services.process.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {txt.services.process.steps.map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-heading text-2xl">
                  {item.step}
                </div>
                <h3 className="text-xl mb-2 font-heading">{item.title}</h3>
                <p className="text-text-light text-sm">{item.desc}</p>
                
                {/* Connector line */}
                {index < txt.services.process.steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-primary/20">
                    <Arrow className="absolute -right-2 -top-2 text-primary" size={16} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary section-padding">
        <div className="container-custom text-center">
          <h2 className="text-white mb-4">{txt.services.ready}</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">{txt.services.ready_subtitle}</p>
          <Link to="/contact" className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2">
            {txt.hero.cta_primary}
            <Arrow size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}
