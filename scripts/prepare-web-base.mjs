import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const basePath = (process.argv[2] ?? '').replace(/\/$/, '');
const distDir = 'dist';
const indexPath = join(distDir, 'index.html');
const notFoundPath = join(distDir, '404.html');
const noJekyllPath = join(distDir, '.nojekyll');

if (!existsSync(indexPath)) {
  throw new Error('dist/index.html was not found. Run the web export before preparing static hosting output.');
}

if (!basePath) {
  console.log('No base path supplied; leaving static output at domain root.');
  process.exit(0);
}

const indexHtml = readFileSync(indexPath, 'utf8')
  .replaceAll('href="/', `href="${basePath}/`)
  .replaceAll('src="/', `src="${basePath}/`);

writeFileSync(indexPath, indexHtml);
copyFileSync(indexPath, notFoundPath);
writeFileSync(noJekyllPath, '');

console.log(`Prepared static output for ${basePath}/`);
