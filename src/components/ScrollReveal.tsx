'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const selector = '.reveal, .reveal-left, .reveal-right, .reveal-scale';

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            intersectionObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const observe = () => {
      document.querySelectorAll(selector).forEach((el) => {
        // Only observe elements that haven't been revealed yet
        if (!el.classList.contains('revealed')) {
          intersectionObserver.observe(el);
        }
      });
    };

    // Initial observation
    observe();

    // Watch for new elements added by client-side navigation / hydration
    const mutationObserver = new MutationObserver(() => {
      observe();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]); // Re-run on every route change so new page elements are picked up

  return null;
}
