export function sitePath(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${path}`;
}

export function contentHref(href: string) {
  return href.startsWith('/') ? sitePath(href) : href;
}

export const pageLabels: Record<string, string> = {
  about: 'The Club', membership: 'Membership', history: 'Our History', events: 'Events & Activities',
  'drive-outs': 'Drive-outs', rallys: 'Rallies', 'low-speed': 'Autocross', parades: 'Parades', social: 'Social Gatherings',
  community: 'Community', 'mwc-board': 'Club Leadership', 'hall-of-honor': 'Hall of Honor', 'save-the-wave': 'Save the Wave',
  contact: 'Contact', documents: 'Documents', 'new-member': 'New-member Guide', nccc: 'NCCC', fcoa: 'FCOA',
  'road-america': 'Road America', photos: 'Photos', 'corvettes-for-sale': 'Buy / Sell', resources: 'Resources',
};
