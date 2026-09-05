import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, cpSync } from 'node:fs';

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
const htmlPath = 'dist/client/index.html';
if (!existsSync(htmlPath)) throw new Error('Static export did not generate an index.html.');
const html = readFileSync(htmlPath, 'utf8');
for (const image of ['club-aerial.jpg', 'club-anniversary.jpg', 'mwc-logo.png']) {
  if (!html.includes(`${basePath}/images/${image}`)) throw new Error(`Missing repository-prefixed image: ${image}`);
}
if (basePath && /(?:src|href)="\/(?:assets|_next|images)\//.test(html)) throw new Error('An asset URL is missing the GitHub Pages repository prefix.');
for (const [, url] of html.matchAll(/(?:src|href)="([^"?#]+)"/g)) {
  if (!url.startsWith(`${basePath}/_next/`) && !url.startsWith(`${basePath}/images/`)) continue;
  const file = `dist/client${url.slice(basePath.length)}`;
  if (!existsSync(file)) throw new Error(`Published asset would be missing: ${url}`);
}
writeFileSync('dist/client/.nojekyll', '');
console.log(`GitHub Pages export verified at ${htmlPath} (base path: ${basePath || '/'}).`);
