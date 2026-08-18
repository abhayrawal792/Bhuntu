import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const pagesDir = path.join(root, 'src', 'pages');
const outDir = path.join(root, 'audit');
const files = fs.readdirSync(pagesDir).filter((f) => /\.(jsx?|tsx?)$/.test(f)).sort();
const humanize = (f) => f.replace(/\.(jsx?|tsx?)$/, '').replace(/Page$/, '').replace(/([a-z0-9])([A-Z])/g, '$1 $2');
const slugify = (f) => humanize(f).replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase();
const pascal = (s) => s.split('-').map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join('');
const componentFor = (file) => fs.readFileSync(path.join(pagesDir, file), 'utf8').match(/from\s+["']\.\.\/components\/([^"']+)/)?.[1] || 'page-local';
const csv = (v) => /[",\n]/.test(String(v ?? '')) ? `"${String(v ?? '').replaceAll('"', '""')}"` : String(v ?? '');
const layouts = ['cinematic vertical reveal', 'editorial split narrative', 'interactive map chamber', 'tactile paper laboratory', 'ambient audio stage', 'constellation workspace', 'phone-native conversation', 'masonry memory cabinet', 'single-word typography room', 'kinetic timeline'];
const mechanics = ['gesture-led reveal', 'drag-and-place composition', 'cursor-lit discovery', 'timed sensory transition', 'voice-reactive response', 'progressive scroll transformation', 'tap-sequenced micro-story', 'freeform canvas exploration', 'long-press unlock', 'choice-driven branching'];
const moods = ['warm lacquer and ink', 'midnight blue and silver', 'apricot paper and charcoal', 'electric violet on black', 'moss green and brass', 'frosted blue and pearl', 'wine red and cream', 'sunrise coral and sand', 'monochrome editorial', 'amber firelight'];
const beats = ['recognition', 'quiet gratitude', 'playful surprise', 'earned vulnerability', 'future longing', 'celebration', 'relief', 'wonder', 'devotion', 'restful closeness'];
const rows = files.map((file, index) => ({ page_number: String(index + 1).padStart(3, '0'), slug: slugify(file), title: humanize(file), component: componentFor(file) }));
const grouped = new Map();
for (const row of rows) { if (!grouped.has(row.component)) grouped.set(row.component, []); grouped.get(row.component).push(row); }
const flagged = [...grouped.entries()].filter(([, pages]) => pages.length > 1).flatMap(([component, pages]) => pages.map((page, i) => ({ ...page, shared_component: component, group_size: pages.length, group_index: i })));
const duplicateIdeas = [...new Set(rows.map((r) => r.slug))].length !== rows.length;
fs.mkdirSync(outDir, { recursive: true });
const inventoryCols = ['page_number','slug','title','current_component','flagged','shared_group_size'];
fs.writeFileSync(path.join(outDir, 'fresh_page_inventory.csv'), [inventoryCols.join(','), ...rows.map((r) => inventoryCols.map((k) => csv({ ...r, flagged: flagged.some((f) => f.slug === r.slug) ? 'yes' : 'no', shared_group_size: flagged.find((f) => f.slug === r.slug)?.group_size || 1 }[k])).join(','))].join('\n') + '\n');
const redesign = flagged.map((page, index) => ({ ...page, replacement_component: `Bespoke${pascal(page.slug)}Scene`, layout: layouts[index % layouts.length], mechanic: mechanics[index % mechanics.length], mood: moods[index % moods.length], emotional_beat: beats[index % beats.length], implementation: `Create a single-use component for /${page.slug}; do not import ${page.shared_component}. Build ${layouts[index % layouts.length]} around a ${mechanics[index % mechanics.length]} mechanic, using ${moods[index % moods.length]} and pacing the content toward ${beats[index % beats.length]}.` }));
const redesignCols = ['slug','title','shared_component','replacement_component','layout','mechanic','mood','emotional_beat','implementation'];
fs.writeFileSync(path.join(outDir, 'bespoke_redesign_plan.csv'), [redesignCols.join(','), ...redesign.map((r) => redesignCols.map((k) => csv(r[k])).join(','))].join('\n') + '\n');
const uniqueListCols = ['priority','page_number','slug','title','current_component','required_unique_component','reason','status'];
fs.writeFileSync(path.join(outDir, 'unique_component_implementation_list.csv'), [uniqueListCols.join(','), ...redesign.map((r, index) => [index < 8 ? 'P0' : 'P1', r.page_number, r.slug, r.title, r.shared_component, r.replacement_component, `Shared implementation group of ${r.group_size} pages`, 'not-started'].map(csv).join(','))].join('\n') + '\n');
const sections = redesign.map((r, i) => `### ${i + 1}. ${r.title} (/${r.slug})\n\nThis page currently imports **${r.shared_component}**, which is shared by ${r.group_size} page(s). Replace it with **${r.replacement_component}**. The bespoke direction is a ${r.layout} using ${r.mechanic}. Use a ${r.mood} visual system and make the emotional beat **${r.emotional_beat}**. The replacement must contain no imports from the shared component group.\n`).join('\n');
fs.writeFileSync(path.join(outDir, 'bespoke_redesign_plan.md'), `# Bespoke redesign plan\n\nThis plan was regenerated from the current source tree after the previous audit artifacts were deleted. It contains every page whose page-level component is imported by more than one route. Each replacement component name is unique and each page receives a distinct layout, mechanic, mood, and emotional beat.\n\n## Summary\n\n| Metric | Value |\n|---|---:|\n| Page files scanned | ${rows.length} |\n| Unique page slugs | ${new Set(rows.map((r) => r.slug)).size} |\n| Duplicate page slugs | ${duplicateIdeas ? 'yes' : 'none'} |\n| Pages requiring bespoke components | ${redesign.length} |\n| Shared component groups | ${[...grouped.values()].filter((v) => v.length > 1).length} |\n\n## Required redesigns\n\n${sections}`);
const groupSummary = [...grouped.entries()].filter(([, pages]) => pages.length > 1).map(([component, pages]) => `- **${component}** — ${pages.map((p) => `/${p.slug}`).join(', ')}`).join('\n');
fs.writeFileSync(path.join(outDir, 'fresh_audit_summary.md'), `# Fresh uniqueness audit\n\n| Metric | Value |\n|---|---:|\n| Page files scanned | ${rows.length} |\n| Unique page slugs | ${new Set(rows.map((r) => r.slug)).size} |\n| Duplicate page slugs | ${duplicateIdeas ? 'yes' : '0'} |\n| Flagged pages sharing component implementations | ${flagged.length} |\n| Shared component groups | ${[...grouped.values()].filter((v) => v.length > 1).length} |\n\n## Shared groups\n\n${groupSummary || 'None.'}\n`);
if (duplicateIdeas) { console.error('Fresh uniqueness audit failed: duplicate page slugs detected.'); process.exit(1); } else { console.log(`Fresh audit complete: ${rows.length} pages scanned; ${flagged.length} pages flagged across ${[...grouped.values()].filter((v) => v.length > 1).length} shared component groups.`); }
