import { ArrowUpRight } from 'lucide-react';
import { sitePath, pageLabels } from '@/lib/site-links';

const groups = [
  { title: 'THE CLUB', slugs: ['about','history','mwc-board','hall-of-honor','community','save-the-wave'] },
  { title: 'GET TOGETHER', slugs: ['events','drive-outs','rallys','low-speed','parades','social'] },
  { title: 'MAKE YOURSELF AT HOME', slugs: ['membership','new-member','documents','resources','photos','contact'] },
];

export function SiteFooter() {
  return <footer>
    <div className="shell footer-main"><a href={sitePath('/')} className="footer-brand">MID-WEST CORVETTES<span>Corvettes, friends, community. Since 1960.</span></a><div className="footer-links"><a href={sitePath('/corvettes-for-sale/')}>Buy / Sell <ArrowUpRight size={15}/></a><a href="https://www.facebook.com/groups/203644606324869/" target="_blank" rel="noreferrer">Facebook <ArrowUpRight size={15}/></a><a href="https://mwcorvettes.com/">Member site <ArrowUpRight size={15}/></a></div></div>
    <div className="shell footer-directory">{groups.map(g=><nav key={g.title} aria-label={g.title}><p className="eyebrow muted">{g.title}</p>{g.slugs.map(slug=><a href={sitePath(`/${slug}/`)} key={slug}>{pageLabels[slug]}</a>)}</nav>)}</div>
    <div className="shell footer-bottom"><span>© {new Date().getFullYear()} Mid-West Corvettes, Inc. · Quad Cities, IA & IL</span><a className="wave" href={sitePath('/save-the-wave/')}>SAVE THE WAVE. <span aria-hidden="true">✌</span></a></div>
  </footer>;
}
