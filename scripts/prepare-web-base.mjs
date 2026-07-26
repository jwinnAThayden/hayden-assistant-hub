import { copyFileSync, existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const basePath = (process.argv[2] ?? '').replace(/\/$/, '');
const distDir = 'dist';
const indexPath = join(distDir, 'index.html');
const notFoundPath = join(distDir, '404.html');
const noJekyllPath = join(distDir, '.nojekyll');
const webIcon192Path = join(distDir, 'web-icon-192.png');
const webIcon512Path = join(distDir, 'web-icon-512.png');
const manifestPath = join(distDir, 'site.webmanifest');

function publicPath(path) {
  return `${basePath}/${path}`;
}

function addInstallIconLinks(html) {
  const installLinks = [
    `<link rel="apple-touch-icon" sizes="192x192" href="${publicPath('web-icon-192.png')}" />`,
    `<link rel="manifest" href="${publicPath('site.webmanifest')}" />`,
  ].join('\n  ');

  return html.replace('</head>', `  ${installLinks}\n</head>`);
}

function writeWebManifest() {
  copyFileSync('assets/web-icon-192.png', webIcon192Path);
  copyFileSync('assets/web-icon-512.png', webIcon512Path);

  const manifest = {
    name: 'Hayden Assistant Hub',
    short_name: 'Hayden Assistants',
    start_url: publicPath(''),
    scope: publicPath(''),
    display: 'standalone',
    background_color: '#f7f4ed',
    theme_color: '#102a5e',
    icons: [
      {
        src: publicPath('web-icon-192.png'),
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: publicPath('web-icon-512.png'),
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  };

  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}

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

const indexHtml = addInstallIconLinks(readFileSync(indexPath, 'utf8')
  .replaceAll('href="/', `href="${basePath}/`)
  .replaceAll('src="/', `src="${basePath}/`));

writeWebManifest();
writeFileSync(indexPath, indexHtml);
rewriteGeneratedFiles(distDir);
writeFileSync(indexPath, versionGeneratedReferences(readFileSync(indexPath, 'utf8')));
copyFileSync(indexPath, notFoundPath);
writeFileSync(noJekyllPath, '');

console.log(`Prepared static output for ${basePath || 'domain root'}`);
