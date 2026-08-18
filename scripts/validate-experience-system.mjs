import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const { pageGiftData } = await import(pathToFileURL(path.join(root, 'src', 'data', 'pageGiftData.js')).href);
const sourceRoot = path.join(root, 'src');
const sourceFiles = [];
const walk = (dir) => { for (const entry of fs.readdirSync(dir, { withFileTypes: true })) { const full = path.join(dir, entry.name); if (entry.isDirectory()) walk(full); else if (/\.(js|jsx|ts|tsx)$/.test(entry.name)) sourceFiles.push(full); } };
walk(sourceRoot);
const source = sourceFiles.map((file) => fs.readFileSync(file, 'utf8')).join('\n');
const errors = [];
const required = ['gift', 'compliment', 'memory', 'message', 'surprise'];
const routes = new Set();
for (const record of pageGiftData) {
  if (routes.has(record.route)) errors.push(`Duplicate route record: ${record.route}`);
  routes.add(record.route);
  for (const key of required) if (!record[key] || String(record[key]).trim().length < 12) errors.push(`${record.route} missing useful ${key} content`);
}
const singleGames = pageGiftData.filter((record) => record.kind === 'single-quiz');
if (singleGames.length !== 1 || singleGames[0].route !== '/quiz') errors.push(`Expected exactly one retained game record at /quiz; found ${singleGames.length}`);
for (const forbidden of ['Mero Buda', 'Forever Wifey', 'Future Wifey', 'budi,', 'wifeyy']) if (source.includes(forbidden)) errors.push(`Unsupported relationship label remains: ${forbidden}`);
const uniqueMessages = new Set(pageGiftData.map((record) => record.message));
if (uniqueMessages.size !== pageGiftData.length) errors.push(`Page gift messages are not unique: ${pageGiftData.length - uniqueMessages.size} duplicates detected`);
const report = `# Experience System Validation\n\n| Check | Result |\n|---|---:|\n| Page gift records | ${pageGiftData.length} |\n| Unique routes | ${routes.size} |\n| Complete gift/message/compliment/memory/surprise records | ${pageGiftData.filter((record) => required.every((key) => record[key])).length} |\n| Retained game records | ${singleGames.length} |\n| Unique page messages | ${uniqueMessages.size} |\n| Errors | ${errors.length} |\n\n${errors.length ? errors.map((error) => `- ${error}`).join('\n') : 'All experience-system checks passed.'}\n`;
fs.mkdirSync(path.join(root, 'audit'), { recursive: true });
fs.writeFileSync(path.join(root, 'audit', 'experience_system_validation.md'), report);
if (errors.length) { console.error(report); process.exit(1); }
console.log(report);
