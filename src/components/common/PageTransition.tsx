import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Smooth page transition with fade effect.
 * Longer duration for smoother appearance of colored backgrounds.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Fade out, then fade in
    setIsVisible(false);
    
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 250); // Longer delay for smoother transition

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div 
      className={`transition-opacity duration-300 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {children}
    </div>
  );
}

/**
 * Simple fade-in wrapper for individual elements.
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: `opacity ${duration}ms ease-out`,
      }}
    >
      {children}
    </div>
  );
}
