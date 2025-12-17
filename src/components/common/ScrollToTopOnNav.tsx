import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to the top of the page when the route changes.
 * Place this component inside the Router but outside the Routes.
 */
export function ScrollToTopOnNav() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when pathname changes
    window.scrollTo({
      top: 0,
      behavior: 'instant', // Use 'instant' for immediate scroll, 'smooth' for animation
    });
  }, [pathname]);

  return null;
}
