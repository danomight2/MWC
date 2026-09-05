import data from './content-pages.json';

export type ContentLink = { label: string; href: string; description?: string };
export type ContentSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  links?: ContentLink[];
  people?: {name: string; role: string; description?: string; image?: string}[];
  timeline?: {year: string; title: string; body: string}[];
};
export type ContentPage = {
  slug: string; title: string; kicker: string; lead: string; group: string;
  sections: ContentSection[]; sources: string[];
  image?: {file: string; alt: string; caption: string; width: number; height: number; compact?: boolean};
  cards?: {title: string; description: string; href: string; image?: string}[];
  primary?: ContentLink;
};

export const contentPages = data as ContentPage[];
