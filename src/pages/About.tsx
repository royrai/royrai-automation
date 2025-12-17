import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';

export function About() {
  const { isRTL } = useLanguage();
  const t = useTranslation();

  return (
    <main className="section-padding">
      <div className="container-custom">
        <div className={`flex flex-col md:flex-row items-center gap-12 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
          {/* Image placeholder */}
          <div className="w-full md:w-1/3">
            <div className="w-full aspect-square rounded-2xl bg-primary/10 flex items-center justify-center">
              <span className="text-8xl">👨‍💻</span>
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full md:w-2/3">
            <h1 className="text-primary mb-2">{t.about.title}</h1>
            <h2 className="text-3xl mb-6">{t.about.subtitle}</h2>
            <p className="text-text-light text-lg mb-6">{t.about.intro}</p>
            
            <div className="space-y-4 text-text-light">
              <p>
                {isRTL 
                  ? 'אני עוזר לבעלי עסקים קטנים ובינוניים להפוך תהליכים ידניים לאוטומטיים, לחסוך זמן ולהתמקד במה שבאמת חשוב - הלקוחות שלהם.'
                  : 'I help small and medium business owners turn manual processes into automated ones, save time, and focus on what really matters - their customers.'
                }
              </p>
              <p>
                {isRTL
                  ? 'עם רקע של 18 שנים בפיתוח תוכנה, אני מביא גישה טכנית מעמיקה יחד עם הבנה עסקית שמאפשרת לי לזהות את ההזדמנויות הנכונות לאוטומציה.'
                  : 'With 18 years of software development background, I bring deep technical expertise combined with business understanding that allows me to identify the right automation opportunities.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
