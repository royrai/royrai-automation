import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Wraps page content with a fade animation on route change.
 * Creates a smooth transition effect when navigating between pages.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState<'fadeIn' | 'fadeOut'>('fadeIn');

  useEffect(() => {
    // When location changes, start fade out
    setTransitionStage('fadeOut');
    
    // After fade out animation, update content and fade in
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setTransitionStage('fadeIn');
    }, 150); // Match this with CSS animation duration

    return () => clearTimeout(timer);
  }, [location.pathname]); // Only trigger on pathname change, not on children change

  // Update children when they change (but not during transition)
  useEffect(() => {
    if (transitionStage === 'fadeIn') {
      setDisplayChildren(children);
    }
  }, [children, transitionStage]);

  return (
    <div
      className={`transition-all duration-200 ease-out ${
        transitionStage === 'fadeIn' 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-2'
      }`}
    >
      {displayChildren}
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-all ease-out ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
      }}
    >
      {children}
    </div>
  );
}
