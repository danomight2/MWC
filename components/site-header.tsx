import { ArrowUpRight } from 'lucide-react';
import { MobileNavigation } from './mobile-navigation';
import { sitePath } from '@/lib/site-links';

export function SiteHeader() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="utility"><div className="shell utility-inner"><span>QUAD CITIES, IOWA & ILLINOIS <span className="utility-dot">/</span> EST. 1960</span><a href="https://mwcorvettes.com/">Already a member? <span>Visit member site <ArrowUpRight size={13}/></span></a></div></div>
    <header className="header"><div className="shell header-inner">
      <a href={sitePath('/')} className="brand" aria-label="Mid-West Corvettes home"><img src={sitePath('/images/mwc-logo-large.png')} alt="Mid-West Corvettes" width="400" height="239"/><span>MID-WEST<br/><strong>CORVETTES</strong></span></a>
      <nav className="desktop-nav" aria-label="Main navigation"><a href={sitePath('/about/')}>The Club</a><a href={sitePath('/events/')}>Events</a><a href={sitePath('/photos/')}>Photos</a><a href={sitePath('/contact/')}>Contact</a></nav>
      <a className="button button-dark header-join" href={sitePath('/membership/')}>Join the club <ArrowUpRight size={17}/></a><MobileNavigation/>
    </div></header>
  </>;
}
