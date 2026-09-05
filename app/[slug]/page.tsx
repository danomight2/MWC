import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight, ArrowUpRight, CalendarDays, MapPin } from 'lucide-react';
import { contentPages } from '@/lib/content';
import { contentHref, pageLabels, sitePath } from '@/lib/site-links';

export const dynamicParams = false;
export function generateStaticParams() { return contentPages.map(({slug}) => ({slug})); }

export async function generateMetadata({ params }: { params: Promise<{slug: string}> }): Promise<Metadata> {
  const {slug} = await params;
  const page = contentPages.find(p=>p.slug===slug);
  return page ? {title: `${pageLabels[slug]} | Mid-West Corvettes`, description: page.lead} : {};
}

export default async function ContentPage({ params }: { params: Promise<{slug: string}> }) {
  const {slug} = await params;
  const page = contentPages.find(p=>p.slug===slug);
  if (!page) notFound();
  const related = contentPages.filter(p=>p.group===page.group && p.slug!==slug);
  return <main id="main" tabIndex={-1}>
    <section className="interior-heading"><div className="shell">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><a href={sitePath('/')}>Home</a><span aria-hidden="true">/</span><span aria-current="page">{pageLabels[slug]}</span></nav>
      <p className="eyebrow">{page.kicker}</p><h1>{page.title}</h1><p className="interior-lead">{page.lead}</p>
      {page.primary && <a className="button button-yellow" href={contentHref(page.primary.href)}>{page.primary.label}<ArrowUpRight size={18}/></a>}
    </div></section>
    <div className="shell interior-content">
      {page.cards && <div className={`content-cards ${slug==='photos'?'photo-cards':''}`}>{page.cards.map(card=><a className="content-card" href={contentHref(card.href)} key={card.title}>
        {card.image && <img src={sitePath(`/images/${card.image}`)} alt={card.description} loading="lazy" width="980" height="650"/>}
        <div className="content-card-copy"><h2>{card.title}<ArrowUpRight size={20}/></h2><p>{card.description}</p></div>
      </a>)}</div>}
      <div className="reading-grid">
        <article className="content-article">
          {page.sections.length > 1 && <nav className="page-contents mobile-page-contents" aria-label="On this page"><p className="eyebrow muted">ON THIS PAGE</p>{page.sections.map((section,index)=><a href={`#section-${index+1}`} key={section.title}>{section.title}<ArrowRight size={14}/></a>)}</nav>}
          {page.image && <figure className={`article-photo ${page.image.compact?'compact-photo':''}`}><img src={sitePath(`/images/${page.image.file}`)} alt={page.image.alt} width={page.image.width} height={page.image.height}/><figcaption>{page.image.caption}</figcaption></figure>}
          {page.sections.map((section,index)=><section className="article-section" id={`section-${index+1}`} key={section.title}>
            <h2>{section.title}</h2>{section.paragraphs.map(text=><p key={text}>{text}</p>)}
            {section.bullets && <ul className="content-bullets">{section.bullets.map(text=><li key={text}>{text}</li>)}</ul>}
            {section.links && <div className="content-links">{section.links.map(link=><a href={contentHref(link.href)} key={link.label}><span>{link.label}{link.description&&<small>{link.description}</small>}</span><ArrowUpRight size={19}/></a>)}</div>}
            {section.timeline && <ol className="club-timeline">{section.timeline.map(entry=><li key={entry.year}><span className="timeline-year">{entry.year}</span><div><h3>{entry.title}</h3><p>{entry.body}</p></div></li>)}</ol>}
            {section.people && <div className={`people-grid ${slug==='hall-of-honor'?'honor-grid':''}`}>{section.people.map(person=><div className="person" key={`${person.name}-${person.role}`}>
              {person.image&&<img src={sitePath(`/images/${person.image}`)} alt={person.name} loading="lazy" width="400" height="300"/>}<div className="person-copy"><span className="person-role">{person.role}</span><h3>{person.name}</h3>{person.description&&<p>{person.description}</p>}</div>
            </div>)}</div>}
          </section>)}
        </article>
        <aside className="content-aside">
          <nav className="page-contents" aria-label="On this page"><p className="eyebrow muted">ON THIS PAGE</p>{page.sections.map((section,index)=><a href={`#section-${index+1}`} key={section.title}>{section.title}<ArrowRight size={14}/></a>)}</nav>
          <div className="visit-card"><CalendarDays size={25}/><h2>Come say hello.</h2><p>First Tuesday of the month<br/><strong>6:30 pm</strong></p><p><MapPin size={16}/>Eriksen Chevrolet<br/>Milan, Illinois</p><a className="text-link" href={sitePath('/membership/')}>Plan your first visit<ArrowUpRight size={17}/></a></div>
          <nav className="related-pages" aria-label="Explore more"><p className="eyebrow muted">EXPLORE MORE</p>{related.map(p=><a key={p.slug} href={sitePath(`/${p.slug}/`)}>{pageLabels[p.slug]}<ArrowUpRight size={15}/></a>)}</nav>
        </aside>
      </div>
    </div>
  </main>;
}
