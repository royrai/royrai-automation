import { useTranslation } from '../hooks/useTranslation';

export function Portfolio() {
  const t = useTranslation();

  const portfolioItems = [
    {
      id: '1',
      title_en: 'E-commerce Order Automation',
      title_he: 'אוטומציה של הזמנות בחנות אונליין',
      description_en: 'Automated order processing system that saves 10+ hours per week.',
      description_he: 'מערכת אוטומטית לעיבוד הזמנות שחוסכת 10+ שעות בשבוע.',
      technologies: ['Make.com', 'Shopify', 'Google Sheets'],
    },
    {
      id: '2',
      title_en: 'AI Customer Support Bot',
      title_he: 'בוט תמיכה מבוסס AI',
      description_en: 'Custom AI chatbot handling 80% of customer inquiries automatically.',
      description_he: 'צ\'אטבוט AI מותאם שמטפל ב-80% מפניות הלקוחות באופן אוטומטי.',
      technologies: ['ChatGPT API', 'Node.js', 'WhatsApp Business'],
    },
    {
      id: '3',
      title_en: 'Lead Management System',
      title_he: 'מערכת ניהול לידים',
      description_en: 'Automated lead capture, scoring, and follow-up system.',
      description_he: 'מערכת אוטומטית לקליטת לידים, דירוג ומעקב.',
      technologies: ['n8n', 'Airtable', 'Gmail'],
    },
  ];

  return (
    <main className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-primary mb-4">{t.portfolio.title}</h1>
          <p className="text-text-light text-lg">{t.portfolio.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              {/* Image placeholder */}
              <div className="h-48 bg-primary/10 flex items-center justify-center">
                <span className="text-6xl">📊</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl mb-2">
                  {t === portfolioItems ? item.title_en : item.title_he}
                </h3>
                <p className="text-text-light text-sm mb-4">
                  {t === portfolioItems ? item.description_en : item.description_he}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <span key={tech} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
