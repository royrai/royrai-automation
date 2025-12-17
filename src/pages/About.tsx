import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, CheckCircle, Award, Clock, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';

export function About() {
  const { isRTL } = useLanguage();
  const t = useTranslation();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const stats = [
    {
      icon: Clock,
      value: '18+',
      label: isRTL ? 'שנות ניסיון בפיתוח' : 'Years in Development',
    },
    {
      icon: Award,
      value: '2+',
      label: isRTL ? 'שנים עם כלי AI' : 'Years with AI Tools',
    },
    {
      icon: Users,
      value: '50+',
      label: isRTL ? 'פרויקטים מוצלחים' : 'Successful Projects',
    },
  ];

  const skills = isRTL
    ? [
        'React & TypeScript',
        'Node.js & Express',
        'Make.com & n8n',
        'ChatGPT & Claude API',
        'PostgreSQL',
        'עיצוב מערכות',
      ]
    : [
        'React & TypeScript',
        'Node.js & Express',
        'Make.com & n8n',
        'ChatGPT & Claude API',
        'PostgreSQL',
        'System Design',
      ];

  const values = isRTL
    ? [
        {
          title: 'פשטות',
          desc: 'הפתרונות הטובים ביותר הם הפשוטים ביותר. אני מאמין בבניית מערכות שקל להבין ולתחזק.',
        },
        {
          title: 'שקיפות',
          desc: 'תקשורת ברורה ופתוחה בכל שלב. בלי הפתעות, בלי עלויות נסתרות.',
        },
        {
          title: 'תוצאות',
          desc: 'ההצלחה נמדדת בתוצאות. כל פרויקט מתמקד בערך אמיתי לעסק שלך.',
        },
      ]
    : [
        {
          title: 'Simplicity',
          desc: 'The best solutions are the simplest ones. I believe in building systems that are easy to understand and maintain.',
        },
        {
          title: 'Transparency',
          desc: 'Clear and open communication at every step. No surprises, no hidden costs.',
        },
        {
          title: 'Results',
          desc: 'Success is measured by results. Every project focuses on real value for your business.',
        },
      ];

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container-custom text-center">
          <h1 className="text-white mb-4">{t.about.title}</h1>
          <p className="text-white/80 text-xl">{t.about.subtitle}</p>
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
                    {/* Replace with actual image */}
                    <div className="text-center">
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
                  {t.about.intro}
                </p>

                <h2 className="text-2xl font-heading text-primary mt-8 mb-4">
                  {isRTL ? 'הסיפור שלי' : 'My Story'}
                </h2>
                <p className="text-text-light leading-relaxed mb-4">
                  {isRTL
                    ? 'אני עובד בפיתוח תוכנה כבר 18 שנה, רובן כמנהל פיתוח בסטארטאפים. בשנתיים האחרונות התמקדתי בכלי AI ואוטומציה, והבנתי שיש הזדמנות ענקית לעזור לבעלי עסקים קטנים ובינוניים ליהנות מהטכנולוגיות האלה.'
                    : 'I\'ve been working in software development for 18 years, most of them as a development lead in startups. In the last two years, I\'ve focused on AI tools and automation, and realized there\'s a huge opportunity to help small and medium business owners benefit from these technologies.'}
                </p>
                <p className="text-text-light leading-relaxed mb-6">
                  {isRTL
                    ? 'היום אני עוזר לבעלי עסקים לחסוך זמן ולעבוד חכם יותר באמצעות אוטומציה ושילוב כלי AI. אני מאמין שכל עסק, גדול או קטן, יכול ליהנות מטכנולוגיה חכמה.'
                    : 'Today I help business owners save time and work smarter through automation and AI tool integration. I believe every business, large or small, can benefit from smart technology.'}
                </p>

                {/* Skills */}
                <h2 className="text-2xl font-heading text-primary mt-8 mb-4">
                  {isRTL ? 'טכנולוגיות' : 'Technologies'}
                </h2>
                <div className="flex flex-wrap gap-3 mb-8">
                  {skills.map((skill, index) => (
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
                  {isRTL ? 'הערכים שלי' : 'My Values'}
                </h2>
                <div className="space-y-4">
                  {values.map((value, index) => (
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
                  {isRTL ? 'בוא נדבר' : 'Let\'s Talk'}
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
