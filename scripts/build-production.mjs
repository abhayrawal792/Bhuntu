import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const sourceIndex = path.join(root, 'index.source.html');
const rootIndex = path.join(root, 'index.html');
const dist = path.join(root, 'dist');

if (!fs.existsSync(sourceIndex)) throw new Error('Missing index.source.html');
fs.copyFileSync(sourceIndex, rootIndex);

const checks = [
  ['audit:uniqueness', 'scripts/validate-uniqueness.mjs'],
  ['audit:experiences', 'scripts/audit-page-experiences.mjs'],
  ['audit:gift-system', 'scripts/validate-experience-system.mjs'],
  ['audit:game-policy', 'scripts/validate-game-policy.mjs'],
];
for (const [label, script] of checks) {
  const result = spawnSync(process.execPath, [script], { cwd: root, stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

const vite = spawnSync(process.platform === 'win32' ? 'npx.cmd' : 'npx', ['vite', 'build'], { cwd: root, stdio: 'inherit' });
if (vite.status !== 0) process.exit(vite.status ?? 1);

fs.copyFileSync(path.join(dist, 'index.html'), rootIndex);
fs.rmSync(path.join(root, 'assets'), { recursive: true, force: true });
fs.cpSync(path.join(dist, 'assets'), path.join(root, 'assets'), { recursive: true });
if (fs.existsSync(path.join(dist, 'all_media'))) {
  fs.rmSync(path.join(root, 'all_media'), { recursive: true, force: true });
  fs.cpSync(path.join(dist, 'all_media'), path.join(root, 'all_media'), { recursive: true });
}
console.log('Production artifacts refreshed at repository root for legacy GitHub Pages.');
