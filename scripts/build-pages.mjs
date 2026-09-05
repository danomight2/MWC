import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, cpSync, mkdirSync } from 'node:fs';

const basePath = process.env.PAGES_BASE_PATH ?? '/MWC';
if (basePath && !/^\/[a-zA-Z0-9_-]+$/.test(basePath)) throw new Error('PAGES_BASE_PATH must be empty or one repository path, such as /MWC.');
const result = spawnSync(process.execPath, ['node_modules/vinext/dist/cli.js', 'build'], {
  stdio: 'inherit',
  env: { ...process.env, GITHUB_PAGES: 'true', NEXT_PUBLIC_BASE_PATH: basePath },
});
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
// Vinext emits prefixed assets into a matching folder. GitHub Pages already
// mounts the uploaded artifact at /MWC, so its _next folder belongs at the root.
const nestedAssets = `dist/client${basePath}/_next`;
if (basePath && existsSync(nestedAssets)) cpSync(nestedAssets, 'dist/client/_next', { recursive: true });
// Export without trailingSlash to avoid Vinext redirecting its own prerender
// requests. Provide directory indexes for GitHub Pages' canonical page URLs.
const pages = JSON.parse(readFileSync('lib/content-pages.json', 'utf8'));
for (const { slug } of pages) {
  mkdirSync(`dist/client/${slug}`, { recursive: true });
  cpSync(`dist/client/${slug}.html`, `dist/client/${slug}/index.html`);
}
const routes = ['/', ...pages.map(({slug}) => `/${slug}/`)];
const htmlByRoute = new Map(routes.map(route => [route, readFileSync(`dist/client${route}index.html`, 'utf8')]));
const html = htmlByRoute.get('/');
for (const image of ['club-aerial.jpg', 'club-anniversary.jpg', 'mwc-logo.png']) {
  if (!html.includes(`${basePath}/images/${image}`)) throw new Error(`Missing repository-prefixed image: ${image}`);
}
for (const [route, pageHtml] of htmlByRoute) {
  if (!pageHtml.includes('<h1')) throw new Error(`Page content missing: ${route}`);
  if (basePath && /(?:src|href)="\/(?:assets|_next|images)\//.test(pageHtml)) throw new Error(`Asset URL missing repository prefix on ${route}`);
  for (const [, rawUrl] of pageHtml.matchAll(/(?:src|href)="([^"]+)"/g)) {
    if (!rawUrl.startsWith('/') && !rawUrl.startsWith('#')) continue;
    const url = new URL(rawUrl, `https://example.test${basePath}${route}`);
    if (!url.pathname.startsWith(`${basePath}/`)) throw new Error(`Link missing repository prefix on ${route}: ${rawUrl}`);
    const relative = url.pathname.slice(basePath.length);
    if (relative.startsWith('/_next/') || relative.startsWith('/images/')) {
      if (!existsSync(`dist/client${relative}`)) throw new Error(`Published asset would be missing: ${rawUrl}`);
      continue;
    }
    const target = htmlByRoute.get(relative);
    if (!target) throw new Error(`Missing internal destination on ${route}: ${rawUrl}`);
    if (url.hash && !target.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`)) throw new Error(`Missing anchor on ${route}: ${rawUrl}`);
  }
}
writeFileSync('dist/client/.nojekyll', '');
console.log(`Verified ${routes.length} pages, internal links, anchors, and assets (base path: ${basePath || '/'}).`);
