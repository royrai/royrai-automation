import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, CheckCircle, Award, Clock, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';

export function About() {
  const { isRTL } = useLanguage();
  const txt = useTranslation();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const stats = [
    { icon: Clock, value: '18+', label: txt.about.stats.years_experience },
    { icon: Award, value: '2+', label: txt.about.stats.years_ai },
    { icon: Users, value: '50+', label: txt.about.stats.projects },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container-custom text-center">
          <h1 className="text-white mb-4">{txt.about.title}</h1>
          <p className="text-white/80 text-xl">{txt.about.subtitle}</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className={`flex flex-col lg:flex-row items-start gap-12 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
            {/* Image Side */}
            <div className="w-full lg:w-2/5">
              <div className="sticky top-24">
                <div className="relative">
                  <div className="w-full aspect-square rounded-2xl bg-primary/10 flex items-center justify-center overflow-hidden">
                    {/* About page image */}
                    <img 
                      src="/images/roy-about.png"
                      alt="Roy Ratzon"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to emoji if image not found
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="text-center hidden">
                      <span className="text-9xl">👨‍💻</span>
                      <p className="text-text-light text-sm mt-4">Roy Ratzon</p>
                    </div>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary/20 rounded-xl -z-10"></div>
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-xl -z-10"></div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-4 rounded-xl shadow-sm text-center">
                      <stat.icon className="text-primary mx-auto mb-2" size={24} />
                      <div className="text-2xl font-heading text-primary">{stat.value}</div>
                      <div className="text-xs text-text-light">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Text Side */}
            <div className="w-full lg:w-3/5">
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-text-dark leading-relaxed mb-6">
                  {txt.about.intro}
                </p>

                <h2 className="text-2xl font-heading text-primary mt-8 mb-4">
                  {txt.about.story.title}
                </h2>
                <p className="text-text-light leading-relaxed mb-4">
                  {txt.about.story.p1}
                </p>
                <p className="text-text-light leading-relaxed mb-6">
                  {txt.about.story.p2}
                </p>

                {/* Skills */}
                <h2 className="text-2xl font-heading text-primary mt-8 mb-4">
                  {txt.about.technologies}
                </h2>
                <div className="flex flex-wrap gap-3 mb-8">
                  {txt.about.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Values */}
                <h2 className="text-2xl font-heading text-primary mt-8 mb-4">
                  {txt.about.values.title}
                </h2>
                <div className="space-y-4">
                  {txt.about.values.items.map((value, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="text-primary flex-shrink-0 mt-1" size={20} />
                      <div>
                        <h3 className="font-heading text-lg">{value.title}</h3>
                        <p className="text-text-light text-sm">{value.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-12">
                <Link
                  to="/contact"
                  className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4"
                >
                  {txt.about.lets_talk}
                  <Arrow size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
