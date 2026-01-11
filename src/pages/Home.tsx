import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';
import { Workflow, Bot, MessageSquare, Code, Clock, Users, Sparkles } from 'lucide-react';

export function Home() {
  const { isRTL } = useLanguage();
  const txt = useTranslation();

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-primary min-h-[75vh] flex items-center overflow-hidden">
        {/* Background pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 border-2 border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-20 h-20 border-2 border-white rounded-full"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="flex flex-col-reverse md:flex-row-reverse items-center gap-8 md:gap-12">
            
            {/* Text Content - appears first on desktop based on language */}
            <div className={`flex-1 text-center ${isRTL ? 'md:text-right' : 'md:text-left'}`}>
              <h1 className="text-white mb-6">
                <span className="block text-4xl md:text-5xl lg:text-6xl">{txt.hero.headline_line1}</span>
                <span className="block text-4xl md:text-5xl lg:text-6xl text-secondary mt-2">{txt.hero.headline_line2}</span>
              </h1>

              <p className="text-white/80 text-lg md:text-xl mb-8 max-w-xl">
                {txt.hero.subheadline}
              </p>

              <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'justify-center md:justify-end' : 'justify-center md:justify-start'}`}>
                <Link to="/contact" className="btn-primary text-lg px-8 py-4">
                  {txt.hero.cta_primary}
                </Link>
                <Link to="/services" className="btn-secondary text-lg px-8 py-4">
                  {txt.hero.cta_secondary}
                </Link>
              </div>
            </div>

            {/* Image - Roy's photo */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 relative">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-white/30 to-white/10 flex items-center justify-center overflow-hidden">
                    {/* Hero image - place roy-hero.png in /public/images/ */}
                    <img 
                      src="/images/roy-hero.png"
                      alt="Roy Ratzon"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                {/* Decorative ring */}
                <div className="absolute inset-0 rounded-full border-4 border-secondary/30 scale-110"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Video placeholder area - for future parrot video */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-secondary/50"></div>
      </section>

      {/* Services Preview Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-primary mb-4">{txt.services.title}</h2>
            <p className="text-text-light text-lg">{txt.services.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service Card 1 - Automation */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-primary/20 transition-all duration-300 group">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <Workflow className="text-primary group-hover:text-white transition-colors" size={28} />
              </div>
              <h3 className="text-xl mb-3 font-heading">{txt.services.automation.title}</h3>
              <p className="text-text-light text-sm leading-relaxed">{txt.services.automation.description}</p>
            </div>

            {/* Service Card 2 - AI */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-primary/20 transition-all duration-300 group">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <Bot className="text-primary group-hover:text-white transition-colors" size={28} />
              </div>
              <h3 className="text-xl mb-3 font-heading">{txt.services.ai.title}</h3>
              <p className="text-text-light text-sm leading-relaxed">{txt.services.ai.description}</p>
            </div>

            {/* Service Card 3 - Consulting */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-primary/20 transition-all duration-300 group">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <MessageSquare className="text-primary group-hover:text-white transition-colors" size={28} />
              </div>
              <h3 className="text-xl mb-3 font-heading">{txt.services.consulting.title}</h3>
              <p className="text-text-light text-sm leading-relaxed">{txt.services.consulting.description}</p>
            </div>

            {/* Service Card 4 - Web Dev */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-primary/20 transition-all duration-300 group">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <Code className="text-primary group-hover:text-white transition-colors" size={28} />
              </div>
              <h3 className="text-xl mb-3 font-heading">{txt.services.webdev.title}</h3>
              <p className="text-text-light text-sm leading-relaxed">{txt.services.webdev.description}</p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link to="/services" className="btn-primary inline-flex items-center gap-2">
              {txt.services.cta}
              <span>{isRTL ? '←' : '→'}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className={`flex flex-col md:flex-row items-center gap-12 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            {/* Image placeholder */}
            <div className="w-full md:w-2/5">
              <div className="relative">
                <div className="w-full aspect-square rounded-2xl bg-primary/10 flex items-center justify-center overflow-hidden">
                  <img 
                    src="/images/roy-about.png"
                    alt="Roy Ratzon"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="text-center hidden">
                    <span className="text-8xl">👨‍💻</span>
                    <p className="text-text-light text-sm mt-2">Roy's Photo</p>
                  </div>
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-secondary/20 rounded-xl -z-10"></div>
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary/20 rounded-xl -z-10"></div>
              </div>
            </div>

            {/* Text Content */}
            <div className="w-full md:w-3/5">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                {txt.about.title}
              </span>
              <h2 className="text-3xl md:text-4xl mt-2 mb-4">{txt.about.subtitle}</h2>
              <p className="text-text-light text-lg mb-6 leading-relaxed">{txt.about.intro}</p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Clock className="text-primary" size={20} />
                  </div>
                  <div className="text-2xl font-heading text-primary">18+</div>
                  <div className="text-sm text-text-light">
                    {txt.about.stats.years_experience}
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Users className="text-primary" size={20} />
                  </div>
                  <div className="text-2xl font-heading text-primary">{txt.about.stats.leadership_title}</div>
                  <div className="text-sm text-text-light">
                    {txt.about.stats.leadership_subtitle}
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Sparkles className="text-primary" size={20} />
                  </div>
                  <div className="text-2xl font-heading text-primary">{txt.about.stats.ai_title}</div>
                  <div className="text-sm text-text-light">
                    {txt.about.stats.ai_subtitle}
                  </div>
                </div>
              </div>

              <Link to="/about" className="btn-primary inline-flex items-center gap-2">
                {txt.about.cta}
                <span>{isRTL ? '←' : '→'}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-primary section-padding relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-0 right-1/4 w-48 h-48 border-2 border-white rounded-full"></div>
        </div>

        <div className="container-custom text-center relative z-10">
          <h2 className="text-white mb-4">
            <span className="block text-3xl md:text-4xl">{txt.hero.headline_line1}</span>
            <span className="block text-3xl md:text-4xl text-secondary mt-2">{txt.hero.headline_line2}</span>
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            {txt.services.ready_subtitle}
          </p>
          <Link to="/contact" className="btn-primary text-lg px-8 py-4 inline-block">
            {txt.hero.cta_primary}
          </Link>
        </div>
      </section>
    </main>
  );
}
