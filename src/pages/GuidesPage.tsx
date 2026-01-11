import { ArrowRight, ArrowLeft, Calendar, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';

/**
 * GuidesPage - Displays guides/blog posts with newsletter signup
 * 
 * Note: The route remains /guides and nav label remains "Guides".
 * The component is named GuidesPage to avoid confusion with
 * potential "guides" data or utility functions.
 */
export function GuidesPage() {
  const { isRTL } = useLanguage();
  const txt = useTranslation();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

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
          <h1 className="text-white mb-4">{txt.guides.title}</h1>
          <p className="text-white/80 text-xl">{txt.guides.subtitle}</p>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {txt.guides.posts.map((post) => (
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
                    {post.category}
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
                    {post.title}
                  </h3>
                  <p className="text-text-light text-sm mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Read more link */}
                  <button className="flex items-center gap-2 text-primary font-medium hover:underline">
                    {txt.guides.read_more}
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
          <h2 className="text-primary mb-4">{txt.guides.stay_updated}</h2>
          <p className="text-text-light text-lg mb-8 max-w-2xl mx-auto">
            {txt.guides.stay_updated_subtitle}
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex gap-3">
              <input
                type="email"
                placeholder={txt.guides.email_placeholder}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                dir={isRTL ? 'rtl' : 'ltr'}
              />
              <button className="btn-primary whitespace-nowrap">
                {txt.guides.subscribe}
              </button>
            </div>
            <p className="text-xs text-text-light mt-3">
              {txt.guides.no_spam}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
