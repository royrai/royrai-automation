import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';

export function Portfolio() {
  const { isRTL } = useLanguage();
  const t = useTranslation();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const portfolioItems = [
    {
      id: '1',
      title_en: 'E-commerce Order Automation',
      title_he: 'אוטומציה של הזמנות בחנות אונליין',
      description_en: 'Automated order processing system that saves 10+ hours per week. Orders flow automatically from Shopify to fulfillment, with real-time inventory updates and customer notifications.',
      description_he: 'מערכת אוטומטית לעיבוד הזמנות שחוסכת 10+ שעות בשבוע. הזמנות זורמות אוטומטית מ-Shopify למשלוח, עם עדכוני מלאי בזמן אמת והתראות ללקוחות.',
      technologies: ['Make.com', 'Shopify', 'Google Sheets', 'Gmail'],
      result_en: '10+ hours saved weekly',
      result_he: '10+ שעות נחסכות בשבוע',
      emoji: '🛒',
    },
    {
      id: '2',
      title_en: 'AI Customer Support Bot',
      title_he: 'בוט תמיכה מבוסס AI',
      description_en: 'Custom AI chatbot handling 80% of customer inquiries automatically. Integrated with WhatsApp Business for seamless customer communication.',
      description_he: 'צ\'אטבוט AI מותאם שמטפל ב-80% מפניות הלקוחות באופן אוטומטי. משולב עם WhatsApp Business לתקשורת חלקה עם לקוחות.',
      technologies: ['ChatGPT API', 'Node.js', 'WhatsApp Business', 'MongoDB'],
      result_en: '80% automated responses',
      result_he: '80% מענה אוטומטי',
      emoji: '🤖',
    },
    {
      id: '3',
      title_en: 'Lead Management System',
      title_he: 'מערכת ניהול לידים',
      description_en: 'Automated lead capture, scoring, and follow-up system. Leads from multiple sources are collected, scored, and assigned to sales team members automatically.',
      description_he: 'מערכת אוטומטית לקליטת לידים, דירוג ומעקב. לידים ממקורות מרובים נאספים, מדורגים ומוקצים לאנשי מכירות באופן אוטומטי.',
      technologies: ['n8n', 'Airtable', 'Gmail', 'Slack'],
      result_en: '3x faster lead response',
      result_he: 'תגובה מהירה פי 3',
      emoji: '📊',
    },
    {
      id: '4',
      title_en: 'Document Processing Pipeline',
      title_he: 'מערכת עיבוד מסמכים',
      description_en: 'AI-powered document extraction and processing. Invoices, contracts, and forms are automatically parsed, categorized, and stored in the right places.',
      description_he: 'עיבוד מסמכים מבוסס AI. חשבוניות, חוזים וטפסים נקראים אוטומטית, מקוטלגים ונשמרים במקומות הנכונים.',
      technologies: ['Claude API', 'Make.com', 'Google Drive', 'Notion'],
      result_en: '95% accuracy rate',
      result_he: '95% דיוק',
      emoji: '📄',
    },
  ];

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
            {portfolioItems.map((item) => (
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
                    {isRTL ? item.result_he : item.result_en}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-heading mb-3">
                    {isRTL ? item.title_he : item.title_en}
                  </h3>
                  <p className="text-text-light text-sm mb-4 leading-relaxed">
                    {isRTL ? item.description_he : item.description_en}
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
          <h2 className="text-primary mb-4">
            {isRTL ? 'רוצה פרויקט דומה?' : 'Want a Similar Project?'}
          </h2>
          <p className="text-text-light text-lg mb-8 max-w-2xl mx-auto">
            {isRTL
              ? 'כל פרויקט מותאם אישית לצרכים הספציפיים של העסק שלך. בוא נדבר על מה שאתה צריך.'
              : 'Every project is customized to your specific business needs. Let\'s talk about what you need.'}
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
