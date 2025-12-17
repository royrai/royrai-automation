import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { Home } from 'lucide-react';

export function NotFound() {
  const t = useTranslation();

  return (
    <main className="min-h-[60vh] flex items-center justify-center">
      <div className="container-custom text-center">
        <h1 className="text-9xl font-heading text-primary mb-4">404</h1>
        <h2 className="text-3xl mb-4">{t.notfound.title}</h2>
        <p className="text-text-light text-lg mb-8">{t.notfound.message}</p>
        <Link to="/" className="btn-primary inline-flex items-center space-x-2 rtl:space-x-reverse">
          <Home size={20} />
          <span>{t.notfound.cta}</span>
        </Link>
      </div>
    </main>
  );
}
