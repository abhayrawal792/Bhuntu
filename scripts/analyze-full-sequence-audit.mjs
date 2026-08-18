import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd();
const text = fs.readFileSync(path.join(root, 'audit/full_sequence_page_audit.csv'), 'utf8');
const parseCsv = (input) => {
  const rows = [];
  let row = [], value = '', quoted = false;
  for (let i = 0; i < input.length; i += 1) {
    const ch = input[i];
    if (ch === '"' && input[i + 1] === '"' && quoted) { value += '"'; i += 1; continue; }
    if (ch === '"') { quoted = !quoted; continue; }
    if (ch === ',' && !quoted) { row.push(value); value = ''; continue; }
    if ((ch === '\n' || ch === '\r') && !quoted) { if (ch === '\r' && input[i + 1] === '\n') i += 1; row.push(value); value = ''; if (row.some(Boolean)) rows.push(row); row = []; continue; }
    value += ch;
  }
  if (value || row.length) { row.push(value); rows.push(row); }
  const header = rows.shift();
  return rows.map((values) => Object.fromEntries(header.map((key, index) => [key, values[index] || ''])));
};
const rows = parseCsv(text);
const groupBy = (key) => Object.entries(rows.reduce((map, row) => { (map[row[key]] ||= []).push(row); return map; }, {})).filter(([, group]) => group.length > 1).sort((a, b) => b[1].length - a[1].length);
const dupes = groupBy('source_fingerprint');
const shared = groupBy('shared_template');
const lowMedia = rows.filter((row) => Number(row.image_signals) < 2);
const lowInteraction = rows.filter((row) => Number(row.interaction_signals) <= 1);
const thin = rows.filter((row) => row.thin_candidate === 'YES');
const md = [];
md.push('# Full Sequence Comparison Findings');
md.push('');
md.push('This comparison reads the complete sequential audit after all 262 pages were recorded. It separates true duplicate implementations from pages that merely share global infrastructure such as the audio controller, store, or shell.');
md.push('');
md.push('| Finding | Count |');
md.push('|---|---:|');
md.push(`| Exact source-fingerprint groups | ${dupes.length} |`);
md.push(`| Pages involved in exact duplicate groups | ${dupes.reduce((sum, [, group]) => sum + group.length, 0)} |`);
md.push(`| Shared-template groups with more than one page | ${shared.length} |`);
md.push(`| Pages with fewer than two local image signals | ${lowMedia.length} |`);
md.push(`| Pages with one or fewer interaction signals | ${lowInteraction.length} |`);
md.push(`| Thin candidates after recursive source inspection | ${thin.length} |`);
md.push('');
md.push('## True duplicate implementation groups');
md.push('');
for (const [fingerprint, group] of dupes) md.push(`- **${fingerprint}**: ${group.map((row) => `page ${row.page} ${row.route} (“${row.title}”)`).join('; ')}.`);
if (!dupes.length) md.push('No exact duplicate implementation groups were found.');
md.push('');
md.push('## Shared-template groups');
md.push('');
for (const [template, group] of shared.slice(0, 80)) md.push(`- **${template}**: ${group.length} pages; ${group.slice(0, 8).map((row) => `${row.page} ${row.route}`).join(', ')}${group.length > 8 ? ', and more' : ''}.`);
md.push('');
md.push('## Low-media pages to review');
md.push('');
for (const row of lowMedia) md.push(`- Page ${row.page}, ${row.route}, “${row.title}”: ${row.image_signals} image signals, ${row.media_signals} total media signals, ${row.interaction_signals} interaction signals; implementation ${row.component}.`);
md.push('');
md.push('## Thin or boring candidates requiring redesign');
md.push('');
for (const row of thin) md.push(`- Page ${row.page}, ${row.route}, “${row.title}”: ${row.source_bytes} aggregated bytes, ${row.image_signals} image signals, ${row.interaction_signals} interaction signals, ${row.narrative_signals} narrative signals.`);
md.push('');
md.push('## Recommended action order');
md.push('');
md.push('The first priority is to redesign the seven exact duplicate groups because they directly violate the requirement that page ideas must not be reused. The second priority is the four thin candidates. The third priority is the low-media list: pages with strong video, canvas, or typographic experiences are not automatically broken, but pages with both low media and low interaction should receive photo-led replacements. Generic global shell imports should not be counted as page duplication by themselves.');
md.push('');
fs.writeFileSync(path.join(root, 'audit/full_sequence_comparison_findings.md'), md.join('\n') + '\n');
console.log(JSON.stringify({ exactDuplicateGroups: dupes.length, duplicatePages: dupes.reduce((sum, [, group]) => sum + group.length, 0), lowMedia: lowMedia.length, thin: thin.length, output: 'audit/full_sequence_comparison_findings.md' }, null, 2));
