import { useTranslation } from '../hooks/useTranslation';

export function Blog() {
  const t = useTranslation();

  const blogPosts = [
    {
      id: '1',
      title_en: '5 Signs Your Business Needs Automation',
      title_he: '5 סימנים שהעסק שלך צריך אוטומציה',
      excerpt_en: 'Discover the key indicators that suggest your business could benefit from automation.',
      excerpt_he: 'גלה את המדדים המרכזיים שמצביעים על כך שהעסק שלך יכול להרוויח מאוטומציה.',
      date: '2025-12-01',
    },
    {
      id: '2',
      title_en: 'Getting Started with Make.com',
      title_he: 'מתחילים עם Make.com',
      excerpt_en: 'A beginner-friendly guide to creating your first automation workflow.',
      excerpt_he: 'מדריך למתחילים ליצירת תהליך האוטומציה הראשון שלך.',
      date: '2025-11-15',
    },
    {
      id: '3',
      title_en: 'AI Tools for Small Business',
      title_he: 'כלי AI לעסקים קטנים',
      excerpt_en: 'Practical AI tools that can help your small business compete with the big players.',
      excerpt_he: 'כלי AI מעשיים שיכולים לעזור לעסק הקטן שלך להתחרות בשחקנים הגדולים.',
      date: '2025-11-01',
    },
  ];

  return (
    <main className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-primary mb-4">{t.blog.title}</h1>
          <p className="text-text-light text-lg">{t.blog.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              {/* Image placeholder */}
              <div className="h-48 bg-primary/10 flex items-center justify-center">
                <span className="text-6xl">📝</span>
              </div>
              <div className="p-6">
                <time className="text-sm text-text-light">{post.date}</time>
                <h3 className="text-xl mt-2 mb-3">
                  {t === blogPosts ? post.title_en : post.title_he}
                </h3>
                <p className="text-text-light text-sm mb-4">
                  {t === blogPosts ? post.excerpt_en : post.excerpt_he}
                </p>
                <button className="text-primary font-medium hover:underline">
                  {t.blog.read_more} →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
