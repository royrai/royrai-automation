import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to the top of the page when the route changes.
 * Scroll happens during fade-out when content is mostly transparent.
 */
export function ScrollToTopOnNav() {
  const { pathname, hash } = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip on first render (initial page load)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Scroll happens at 100ms - when content is already mostly faded out
    const scrollTimer = setTimeout(() => {
      if (hash) {
        // Hash link - scroll to element after transition completes
        setTimeout(() => {
          const element = document.getElementById(hash.slice(1));
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 200);
      } else {
        // Instant scroll to top
        window.scrollTo(0, 0);
      }
    }, 100);

    return () => clearTimeout(scrollTimer);
  }, [pathname, hash]);

  return null;
}
