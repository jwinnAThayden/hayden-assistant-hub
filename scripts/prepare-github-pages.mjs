import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const repoName = 'hayden-assistant-hub';
const distDir = 'dist';
const basePath = `/${repoName}`;
const indexPath = join(distDir, 'index.html');
const notFoundPath = join(distDir, '404.html');
const noJekyllPath = join(distDir, '.nojekyll');

if (!existsSync(indexPath)) {
  throw new Error('dist/index.html was not found. Run the web export before preparing GitHub Pages.');
}

const indexHtml = readFileSync(indexPath, 'utf8')
  .replaceAll('href="/', `href="${basePath}/`)
  .replaceAll('src="/', `src="${basePath}/`);

writeFileSync(indexPath, indexHtml);
copyFileSync(indexPath, notFoundPath);
writeFileSync(noJekyllPath, '');

console.log(`Prepared GitHub Pages output for ${basePath}/`);
