'use client';

import { useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { sitePath } from '@/lib/site-links';

export function MobileNavigation() {
  const menu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (menu.current && !menu.current.contains(event.target as Node)) menu.current.open = false;
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menu.current?.open) {
        menu.current.open = false;
        menu.current.querySelector('summary')?.focus();
      }
    };
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  return <details className="mobile-nav" ref={menu}>
    <summary aria-label="Menu"><Menu className="menu-open-icon" size={18}/><X className="menu-close-icon" size={18}/><span>Menu</span></summary>
    <nav aria-label="Mobile navigation" onClick={event => {
      if ((event.target as HTMLElement).closest('a') && menu.current) menu.current.open = false;
    }}>
      <a href={sitePath('/')}>Home</a><a href={sitePath('/about/')}>The Club</a><a href={sitePath('/events/')}>Events</a><a href={sitePath('/photos/')}>Photos</a><a href={sitePath('/membership/')}>Membership</a>
      <a href={sitePath('/resources/')}>Resources</a><a href={sitePath('/contact/')}>Contact</a><a href="https://mwcorvettes.com/">Visit member site</a>
    </nav>
  </details>;
}
