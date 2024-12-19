import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTopOnRoute = () => {
  const { pathname } = useLocation();

  const scrollToTop = useCallback(() => {
    try {
      // First try with smooth behavior
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } catch (error) {
      // Fallback for older browsers or if smooth scroll fails
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    // Use requestAnimationFrame to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(() => {
        scrollToTop();
      });
    }, 0);

    // Cleanup timeout to prevent memory leaks
    return () => clearTimeout(timeoutId);
  }, [pathname, scrollToTop]);

  return null;
};

export default ScrollToTopOnRoute;