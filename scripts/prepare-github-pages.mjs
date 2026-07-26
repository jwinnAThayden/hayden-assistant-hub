import { spawnSync } from 'node:child_process';

const result = spawnSync(process.execPath, ['./scripts/prepare-web-base.mjs', '/hayden-assistant-hub'], {
	stdio: 'inherit',
});

process.exit(result.status ?? 1);
