'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 760px)');
    function updateVisibility() {
      setVisible(mobile.matches && window.scrollY > Math.max(900, window.innerHeight * 1.5));
    }
    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);
    mobile.addEventListener('change', updateVisibility);
    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
      mobile.removeEventListener('change', updateVisibility);
    };
  }, []);

  if (!visible) return null;

  return <Button type="button" className="back-to-top" aria-label="Back to top" onClick={() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
    document.getElementById('main')?.focus({ preventScroll: true });
  }}><ArrowUp aria-hidden="true" size={18}/><span>Top</span></Button>;
}
