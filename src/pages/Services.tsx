import { useTranslation } from '../hooks/useTranslation';

export function Services() {
  const t = useTranslation();

  return (
    <main className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-primary mb-4">{t.services.title}</h1>
          <p className="text-text-light text-lg">{t.services.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Service Card 1 */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
              <span className="text-primary text-3xl">⚙️</span>
            </div>
            <h2 className="text-2xl mb-4">{t.services.automation.title}</h2>
            <p className="text-text-light">{t.services.automation.description}</p>
          </div>

          {/* Service Card 2 */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
              <span className="text-primary text-3xl">🤖</span>
            </div>
            <h2 className="text-2xl mb-4">{t.services.ai.title}</h2>
            <p className="text-text-light">{t.services.ai.description}</p>
          </div>

          {/* Service Card 3 */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
              <span className="text-primary text-3xl">💬</span>
            </div>
            <h2 className="text-2xl mb-4">{t.services.consulting.title}</h2>
            <p className="text-text-light">{t.services.consulting.description}</p>
          </div>

          {/* Service Card 4 */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
              <span className="text-primary text-3xl">💻</span>
            </div>
            <h2 className="text-2xl mb-4">{t.services.webdev.title}</h2>
            <p className="text-text-light">{t.services.webdev.description}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
