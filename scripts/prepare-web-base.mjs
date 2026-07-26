import { copyFileSync, existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const basePath = (process.argv[2] ?? '').replace(/\/$/, '');
const distDir = 'dist';
const indexPath = join(distDir, 'index.html');
const notFoundPath = join(distDir, '404.html');
const noJekyllPath = join(distDir, '.nojekyll');

function rewriteAbsoluteAssetUrls(filePath) {
  const source = readFileSync(filePath, 'utf8');
  const updated = source
    .replaceAll('"/assets/', `"${basePath}/assets/`)
    .replaceAll("'/assets/", `'${basePath}/assets/`)
    .replaceAll('`/assets/', `\`${basePath}/assets/`)
    .replaceAll('url(/assets/', `url(${basePath}/assets/`);

  if (updated !== source) {
    writeFileSync(filePath, updated);
  }
}

function rewriteGeneratedFiles(directory) {
  for (const entry of readdirSync(directory)) {
    const entryPath = join(directory, entry);
    const stats = statSync(entryPath);

    if (stats.isDirectory()) {
      rewriteGeneratedFiles(entryPath);
      continue;
    }

    if (/\.(?:js|css|html)$/.test(entry)) {
      rewriteAbsoluteAssetUrls(entryPath);
    }
  }
}

function versionGeneratedReferences(html) {
  return html.replace(/(\b(?:src|href)=")([^"?]+\.(?:js|css))"/g, (match, prefix, url) => {
    const relativePath = url.startsWith(`${basePath}/`) ? url.slice(basePath.length + 1) : url.replace(/^\//, '');
    const filePath = join(distDir, relativePath);

    if (!existsSync(filePath)) {
      return match;
    }

    const version = createHash('sha256').update(readFileSync(filePath)).digest('hex').slice(0, 12);
    return `${prefix}${url}?v=${version}"`;
  });
}

if (!existsSync(indexPath)) {
  throw new Error('dist/index.html was not found. Run the web export before preparing static hosting output.');
}

const indexHtml = readFileSync(indexPath, 'utf8')
  .replaceAll('href="/', `href="${basePath}/`)
  .replaceAll('src="/', `src="${basePath}/`);

writeFileSync(indexPath, indexHtml);
rewriteGeneratedFiles(distDir);
writeFileSync(indexPath, versionGeneratedReferences(readFileSync(indexPath, 'utf8')));
copyFileSync(indexPath, notFoundPath);
writeFileSync(noJekyllPath, '');

console.log(`Prepared static output for ${basePath || 'domain root'}`);
