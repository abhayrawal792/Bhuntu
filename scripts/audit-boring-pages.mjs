import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const app = fs.readFileSync(path.join(root, 'src', 'App.jsx'), 'utf8');
const routes = [...app.matchAll(/<Route\s+path="([^"]+)"\s+element={<([A-Za-z0-9_]+)\s*\/>}/g)].map(([, route, component]) => ({ route, component }));
const pageDir = path.join(root, 'src', 'pages');
const componentDir = path.join(root, 'src', 'components');
const rows = [];
for (const { route, component } of routes) {
  const pagePath = path.join(pageDir, `${component}.jsx`);
  if (!fs.existsSync(pagePath)) continue;
  const pageSource = fs.readFileSync(pagePath, 'utf8');
  const imports = [...pageSource.matchAll(/import\s+[^;]+from ['"]\.\.\/components\/([^'"]+)['"]/g)].map(([, name]) => name.replace(/\.jsx$/, ''));
  const source = imports.map((name) => { const file = path.join(componentDir, `${name}.jsx`); return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : ''; }).join('\n');
  if (!source) continue;
  const images = (source.match(/<img\b|backgroundImage|BHUNTU_PHOTOS|ALL_PHOTOS|photoIdx|selectedPhoto/gi) || []).length;
  const buttons = (source.match(/<button\b|onClick=|setSelected|setPhoto|setIndex/gi) || []).length;
  const narrative = (source.match(/memory|story|letter|compliment|promise|birthday|sanzu|bhuntu|samjhana|abu|bebo|babe/gi) || []).length;
  const mediaCollections = (source.match(/map\(|ALL_PHOTOS|ALL_MEDIA_PHOTOS|BHUNTU_PHOTOS|gallery|photos/gi) || []).length;
  const sourceBytes = Buffer.byteLength(source);
  const boring = sourceBytes < 4200 && images <= 4 && buttons <= 8 && narrative < 20;
  rows.push({ route, component, imports: imports.join('|'), sourceBytes, images, buttons, narrative, mediaCollections, boring });
}
const outDir = path.join(root, 'audit'); fs.mkdirSync(outDir, { recursive: true });
const header = ['route','component','imports','sourceBytes','images','buttons','narrative','mediaCollections','boring'];
const esc = (v) => `"${String(v ?? '').replaceAll('"', '""')}"`;
fs.writeFileSync(path.join(outDir, 'boring_page_audit.csv'), [header.join(','), ...rows.filter((r) => r.boring).map((r) => header.map((k) => esc(r[k])).join(','))].join('\n') + '\n');
const summary = `# Boring Page Audit\n\nScanned ${rows.length} routed page implementations and found **${rows.filter((row) => row.boring).length} candidate pages** with a thin component, few media references, and low narrative density.\n\n${rows.filter((row) => row.boring).map((row) => `- ${row.route} — ${row.component} (${row.sourceBytes} bytes, ${row.images} media signals, ${row.buttons} interaction signals)`).join('\n')}\n`;
fs.writeFileSync(path.join(outDir, 'boring_page_audit.md'), summary);
console.log(JSON.stringify({ scanned: rows.length, boring: rows.filter((row) => row.boring).length, top: rows.filter((row) => row.boring).slice(0, 40) }, null, 2));
