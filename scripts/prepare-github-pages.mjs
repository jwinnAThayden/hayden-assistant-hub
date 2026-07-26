import { spawnSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const customDomain = process.env.GITHUB_PAGES_CUSTOM_DOMAIN ?? 'assistants.haydenbeverage.com';

const result = spawnSync(process.execPath, ['./scripts/prepare-web-base.mjs'], {
	stdio: 'inherit',
});

if ((result.status ?? 1) !== 0) {
	process.exit(result.status ?? 1);
}

writeFileSync('dist/CNAME', `${customDomain}\n`);
console.log(`Prepared GitHub Pages custom domain ${customDomain}`);
