import { ArrowRight, ArrowLeft, Calendar, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';

export function Blog() {
  const { isRTL } = useLanguage();
  const t = useTranslation();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const blogPosts = [
    {
      id: '1',
      title_en: '5 Signs Your Business Needs Automation',
      title_he: '5 סימנים שהעסק שלך צריך אוטומציה',
      excerpt_en: 'Discover the key indicators that suggest your business could benefit from automation. From repetitive tasks to scaling challenges, learn when it\'s time to automate.',
      excerpt_he: 'גלה את המדדים המרכזיים שמצביעים על כך שהעסק שלך יכול להרוויח מאוטומציה. ממשימות חוזרות ועד אתגרי צמיחה.',
      date: '2025-12-01',
      readTime: isRTL ? '5 דקות קריאה' : '5 min read',
      category_en: 'Automation',
      category_he: 'אוטומציה',
      emoji: '⚙️',
    },
    {
      id: '2',
      title_en: 'Getting Started with Make.com',
      title_he: 'מתחילים עם Make.com',
      excerpt_en: 'A beginner-friendly guide to creating your first automation workflow. Step-by-step instructions to connect your apps and save time.',
      excerpt_he: 'מדריך למתחילים ליצירת תהליך האוטומציה הראשון שלך. הנחיות צעד אחר צעד לחיבור האפליקציות שלך וחיסכון בזמן.',
      date: '2025-11-15',
      readTime: isRTL ? '8 דקות קריאה' : '8 min read',
      category_en: 'Tutorial',
      category_he: 'מדריך',
      emoji: '📚',
    },
    {
      id: '3',
      title_en: 'AI Tools for Small Business',
      title_he: 'כלי AI לעסקים קטנים',
      excerpt_en: 'Practical AI tools that can help your small business compete with the big players. From chatbots to content generation.',
      excerpt_he: 'כלי AI מעשיים שיכולים לעזור לעסק הקטן שלך להתחרות בשחקנים הגדולים. מצ\'אטבוטים ועד יצירת תוכן.',
      date: '2025-11-01',
      readTime: isRTL ? '6 דקות קריאה' : '6 min read',
      category_en: 'AI',
      category_he: 'בינה מלאכותית',
      emoji: '🤖',
    },
    {
      id: '4',
      title_en: 'Automating Your Email Workflow',
      title_he: 'אוטומציה של תהליך המיילים שלך',
      excerpt_en: 'Learn how to automate email responses, follow-ups, and notifications. Save hours every week with smart email automation.',
      excerpt_he: 'למד איך לבצע אוטומציה של תגובות למיילים, מעקבים והתראות. חסוך שעות כל שבוע עם אוטומציה חכמה של מיילים.',
      date: '2025-10-20',
      readTime: isRTL ? '7 דקות קריאה' : '7 min read',
      category_en: 'Automation',
      category_he: 'אוטומציה',
      emoji: '📧',
    },
    {
      id: '5',
      title_en: 'Why Every Business Needs a Chatbot',
      title_he: 'למה כל עסק צריך צ\'אטבוט',
      excerpt_en: 'Chatbots aren\'t just for big companies anymore. Discover how a simple chatbot can transform your customer service.',
      excerpt_he: 'צ\'אטבוטים כבר לא רק לחברות גדולות. גלה איך צ\'אטבוט פשוט יכול לשנות את שירות הלקוחות שלך.',
      date: '2025-10-05',
      readTime: isRTL ? '4 דקות קריאה' : '4 min read',
      category_en: 'AI',
      category_he: 'בינה מלאכותית',
      emoji: '💬',
    },
    {
      id: '6',
      title_en: 'The ROI of Business Automation',
      title_he: 'ה-ROI של אוטומציה עסקית',
      excerpt_en: 'How to calculate the return on investment for automation projects. Real numbers and case studies from small businesses.',
      excerpt_he: 'איך לחשב את ההחזר על ההשקעה בפרויקטים של אוטומציה. מספרים אמיתיים וסיפורי הצלחה מעסקים קטנים.',
      date: '2025-09-20',
      readTime: isRTL ? '6 דקות קריאה' : '6 min read',
      category_en: 'Business',
      category_he: 'עסקים',
      emoji: '📈',
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return isRTL
      ? date.toLocaleDateString('he-IL', { day: 'numeric', month: 'long', year: 'numeric' })
      : date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container-custom text-center">
          <h1 className="text-white mb-4">{t.blog.title}</h1>
          <p className="text-white/80 text-xl">{t.blog.subtitle}</p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                {/* Image placeholder */}
                <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative overflow-hidden">
                  <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                    {post.emoji}
                  </span>
                  {/* Category badge */}
                  <div className="absolute top-4 left-4 bg-white/90 text-primary px-3 py-1 rounded-full text-xs font-medium">
                    {isRTL ? post.category_he : post.category_en}
                  </div>
                </div>

                <div className="p-6">
                  {/* Meta info */}
                  <div className="flex items-center gap-4 text-sm text-text-light mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {formatDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-heading mb-3 group-hover:text-primary transition-colors">
                    {isRTL ? post.title_he : post.title_en}
                  </h3>
                  <p className="text-text-light text-sm mb-4 leading-relaxed">
                    {isRTL ? post.excerpt_he : post.excerpt_en}
                  </p>

                  {/* Read more link */}
                  <button className="flex items-center gap-2 text-primary font-medium hover:underline">
                    {t.blog.read_more}
                    <Arrow size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-50 section-padding">
        <div className="container-custom text-center">
          <h2 className="text-primary mb-4">
            {isRTL ? 'הישאר מעודכן' : 'Stay Updated'}
          </h2>
          <p className="text-text-light text-lg mb-8 max-w-2xl mx-auto">
            {isRTL
              ? 'קבל טיפים ותובנות על אוטומציה ו-AI ישירות למייל שלך.'
              : 'Get tips and insights about automation and AI directly to your inbox.'}
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex gap-3">
              <input
                type="email"
                placeholder={isRTL ? 'הכנס את האימייל שלך' : 'Enter your email'}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                dir={isRTL ? 'rtl' : 'ltr'}
              />
              <button className="btn-primary whitespace-nowrap">
                {isRTL ? 'הרשמה' : 'Subscribe'}
              </button>
            </div>
            <p className="text-xs text-text-light mt-3">
              {isRTL
                ? 'לא ספאם. רק תוכן איכותי.'
                : 'No spam. Quality content only.'}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
