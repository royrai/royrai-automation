import { ReactNode, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Simple page transition using CSS animations.
 * Applies fade-in animation when route changes.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Reset animation
    container.style.animation = 'none';
    // Trigger reflow to restart animation
    container.offsetHeight;
    // Apply animation
    container.style.animation = 'pageEnter 250ms ease-out forwards';
  }, [location.pathname]);

  return (
    <div ref={containerRef} className="page-content">
      {children}
    </div>
  );
}

/**
 * Simple fade wrapper without route detection.
 * Use this to animate individual elements on mount.
 */
export function FadeIn({ 
  children, 
  delay = 0,
  duration = 300,
  className = '' 
}: { 
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  return (
    <div
      className={`animate-fade-in ${className}`}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}
