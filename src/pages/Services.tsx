import { Link } from 'react-router-dom';
import { Workflow, Bot, MessageSquare, Code, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';

export function Services() {
  const { isRTL } = useLanguage();
  const t = useTranslation();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const services = [
    {
      icon: Workflow,
      title: t.services.automation.title,
      description: t.services.automation.description,
      features: isRTL 
        ? ['Make.com & n8n', 'חיבור מערכות', 'תהליכי עבודה אוטומטיים', 'חיסכון בזמן']
        : ['Make.com & n8n', 'System integrations', 'Automated workflows', 'Time savings'],
    },
    {
      icon: Bot,
      title: t.services.ai.title,
      description: t.services.ai.description,
      features: isRTL
        ? ['ChatGPT & Claude', 'סוכני AI מותאמים', 'צ\'אטבוטים חכמים', 'עיבוד מסמכים']
        : ['ChatGPT & Claude', 'Custom AI agents', 'Smart chatbots', 'Document processing'],
    },
    {
      icon: MessageSquare,
      title: t.services.consulting.title,
      description: t.services.consulting.description,
      features: isRTL
        ? ['ייעוץ אישי', 'תכנון אסטרטגי', 'הדרכה מעשית', 'תמיכה שוטפת']
        : ['Personal consulting', 'Strategic planning', 'Hands-on training', 'Ongoing support'],
    },
    {
      icon: Code,
      title: t.services.webdev.title,
      description: t.services.webdev.description,
      features: isRTL
        ? ['React & TypeScript', 'אפליקציות ווב', 'כלים פנימיים', 'אינטגרציות API']
        : ['React & TypeScript', 'Web applications', 'Internal tools', 'API integrations'],
    },
  ];

  const processSteps = isRTL
    ? [
        { step: 1, title: 'שיחת היכרות', desc: 'נבין את הצרכים והאתגרים שלך' },
        { step: 2, title: 'אפיון הפתרון', desc: 'נבנה תוכנית עבודה מפורטת' },
        { step: 3, title: 'פיתוח ובניה', desc: 'נבנה את הפתרון בשלבים' },
        { step: 4, title: 'הדרכה ותמיכה', desc: 'נוודא שהכל עובד כמו שצריך' },
      ]
    : [
        { step: 1, title: 'Discovery Call', desc: 'Understanding your needs and challenges' },
        { step: 2, title: 'Solution Design', desc: 'Creating a detailed action plan' },
        { step: 3, title: 'Build & Deliver', desc: 'Building the solution in phases' },
        { step: 4, title: 'Training & Support', desc: 'Making sure everything works perfectly' },
      ];

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container-custom text-center">
          <h1 className="text-white mb-4">{t.services.title}</h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto">{t.services.subtitle}</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <service.icon className="text-primary" size={32} />
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
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-primary mb-4">
              {isRTL ? 'איך זה עובד?' : 'How It Works'}
            </h2>
            <p className="text-text-light text-lg">
              {isRTL
                ? 'תהליך פשוט וברור מההתחלה ועד הסוף'
                : 'A simple and clear process from start to finish'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-heading text-2xl">
                  {item.step}
                </div>
                <h3 className="text-xl mb-2 font-heading">{item.title}</h3>
                <p className="text-text-light text-sm">{item.desc}</p>
                
                {/* Connector line */}
                {index < processSteps.length - 1 && (
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
          <h2 className="text-white mb-4">
            {isRTL ? 'מוכן להתחיל?' : 'Ready to Get Started?'}
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            {isRTL
              ? 'בוא נדבר על איך אוטומציה יכולה לעזור לעסק שלך לצמוח.'
              : 'Let\'s talk about how automation can help your business grow.'}
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
